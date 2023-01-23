import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function artistRequests(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        if (req.query.all !== undefined) {
          const artists = await prisma.artist.findMany();
          res.status(200).json(artists);
        } else if (req.query.name !== undefined) {
          let artistName = req.query.name.toString().replace("-", " ");
          const artist = await prisma.artist.findUnique({
            where: {
              name: artistName as string,
            },
            include: { albums: true },
          });
          console.log(`queried for ${req.query.name}`);
          res.status(200).json(artist);
        }
      } catch (e) {
        console.log("Error occured in artist call [GET REQ ERROR]: ", e);
        res.status(500).json({ error: "Error fetching artists" });
      }
      break;
    case "POST":
      console.log("CREATE ARTIST REQ BODY", req.body);
      try {
        // const artist = await prisma.artist.create({
        //   data: {},
        //   // `name` varchar(255) NOT NULL,
        //   // `dob` datetime(3) NOT NULL,
        //   // `description` json,
        // });
        // res.status(200).json(artist);
      } catch (e) {
        console.log("Error occured in artist call [POST REQ ERROR]: ", e);
        res.status(500).json({ error: "Error creating artist" });
      }

      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
