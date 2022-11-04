import { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";
import prisma from "../../lib/prisma";
import S3 from "../../lib/s3client";
import nc from "next-connect";
import multer from "multer";
import { GetObjectCommand } from "@aws-sdk/client-s3";
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fieldSize: 2_621_440 } });

interface ExtendRequestType {
  file: Express.Multer.File;
}

const albumApi = nc({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' is not allowed!` });
  },
  onError(err: Error, req: NextApiRequest, res: NextApiResponse, next) {
    console.error("albumApi Error:", err);
    res.status(500).end(err.toString());
    // next();
  },
});

albumApi.use(upload.single("album-image"));

albumApi.get(async (req, res) => {
  try {
    const albumdata = await prisma.album.findMany({
      include: {
        artists: true,
        comments: true,
      },
    });
    // create form on frontend to post albums with covers
    // const getObjectParams = {
    //   Bucket: process.env.S3_BUCKET,
    //   Key: "",
    // };
    // const command = new GetObjectCommand(getObjectParams); // retrieve imagename from primsa backend db field
    // const url = await getSignedUrl(S3, command, { expiresIn: 3600 });
    res.status(200).json(albumdata);
  } catch (e) {
    console.log("Error occured in album call [GET REQ ERROR]: ", e);
    res.status(500).json({ error: "Error fetching albums" });
  }
});

albumApi.post<ExtendRequestType>(async (req, res) => {
  try {
    const imgName = v4();
    const params = {
      Bucket: process.env.S3_BUCKET!,
      Key: imgName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    try {
      await S3.putObject(params, (err, data) => {
        err
          ? console.log("putObject Error:", err)
          : console.log("putObject Data:", data);
      }).promise();
      // todo: create database post request to put the image in each album
      res.send({});
    } catch (e) {
      console.log("Error occured while getting a S3 signed URL: ", e);
      res.status(500).json({ error: "Error getting signed S3 Bucket URL" });
    }
  } catch (e) {
    console.log("Error occured in album call [PUT REQ ERROR]: ", e);
    res.status(500).json({ error: "Error posting album" });
  }
});

export default albumApi;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
