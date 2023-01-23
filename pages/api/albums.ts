import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import sharp from "sharp";
import { v4 } from "uuid";
import prisma from "../../lib/prisma";
import S3 from "../../lib/s3client";
import { AlbumInfoType } from "../../src/components/album/albumSubmission.utils";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fieldSize: 2_621_440 } });

interface ExtendRequestType {
  file: Express.Multer.File;
  files: { [fieldname: string]: Express.Multer.File[] };
}

const albumApi = nc({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' is not allowed!` });
  },
  onError(err: Error, _req: NextApiRequest, res: NextApiResponse) {
    console.error("albumApi Error:", err);
    res.status(500).end(err.toString());
    // next();
  },
});

// multer formdata fields
albumApi.use(
  upload.fields([
    { name: "album-image", maxCount: 1 },
    { name: "album-data", maxCount: 1 },
  ])
);

albumApi.get(async (req, res) => {
  // get all albums
  try {
    if (req.query.title === undefined) {
      const albums = await prisma.album.findMany({
        include: {
          artists: true,
        },
      });

      // generate presigned urls for AWS S3 images, available 30minutes
      for (let album of albums) {
        const getObjectParams = {
          Bucket: process.env.S3_BUCKET,
          Key: `${albums[0].cover!}`,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(S3, command, { expiresIn: 1800 });
        !album.cover?.startsWith("h") && (album.cover = url);
      }

      res.status(200).json(albums);
    } else {
      const album = await prisma.album.findFirst({
        where: { title: req.query.title as string },
        include: {
          artists: true,
          tracks: true,
        },
      });
      const getObjectParams = {
        Bucket: process.env.S3_BUCKET,
        Key: `${album?.cover!}`,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(S3, command, { expiresIn: 1800 });
      !album?.cover?.startsWith("h") && (album!.cover = url);

      res.status(200).json(album);
    }
  } catch (e) {
    console.log("Error occured in album call [GET REQ ERROR]: ", e);
    res.status(500).json({ error: "Error fetching albums" });
  }
});

albumApi.post<ExtendRequestType>(async (req, res) => {
  console.log(req.files);
  const albumImage = req.files["album-image"][0];
  const albumData: AlbumInfoType = JSON.parse(
    await new Response(req.files["album-data"][0].buffer).text()
  ).data;

  //resizing img
  const resizedImgBuffer = await sharp(albumImage.buffer)
    .resize({ height: 400, width: 400, fit: "cover" })
    .toBuffer();

  try {
    const imgName = v4();
    const params = {
      Bucket: process.env.S3_BUCKET!,
      Key: imgName,
      Body: resizedImgBuffer,
      ContentType: albumImage.mimetype,
    };

    // // store image to S3
    try {
      const command = new PutObjectCommand(params);
      S3.send(command);
    } catch (e) {
      console.log("Error occured while getting a S3 signed URL: ", e);
      res.status(500).json({ error: "Error getting signed S3 Bucket URL" });
    }

    // create db entry with new album data
    try {
      const newAlbum = await prisma.album.create({
        data: {
          title: albumData.title,
          artists: {
            connect: albumData.artists.map((artist: string) => {
              return { name: artist };
            }),
          },
          releaseDate: new Date(),
          genre: { genres: albumData.genres.join(", ") },
          tracks: {
            create: albumData.songs.map((song) => {
              return { title: song.trackName };
            }),
          },
          label: albumData.label,
          cover: imgName,
        },
      });
      res.send(newAlbum);
    } catch (e) {
      console.log(
        "Error occured while creating a new album database entry: ",
        e
      );
      res.status(500).json({
        error: "Error creating database entry for newly submitted album.",
      });
    }
  } catch (e) {
    console.log("Error occured in album call [PUT REQ ERROR]: ", e);
    res.status(500).json({ error: "Error posting album" });
  }
});

albumApi.delete(async (req, res) => {
  console.log("DELETE REQ", req.query);
  try {
    const resp = await prisma.album.delete({
      where: {
        id: req.query.id as string,
      },
    });
    res
      .status(200)
      .json({ message: "The album was deleted successfully.", data: resp });
  } catch (e) {
    console.log("Error occured while deleting the album", e);
    res.status(500).json({
      error: "An error occured while deleting the album from the database.",
    });
  }
});

export default albumApi;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
