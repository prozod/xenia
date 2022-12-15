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
          console.log("queried all artists");
          res.status(200).json(artists);
        } else if (req.query.name !== undefined) {
          const artist = await prisma.artist.findUnique({
            where: {
              name: req.query.name as string,
            },
          });
          console.log(`queried for ${req.query.name}`);
          res.status(200).json(artist);
        }
      } catch (e) {
        console.log("Error occured in artist call [GET REQ ERROR]: ", e);
        res.status(500).json({ error: "Error fetching artists" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
