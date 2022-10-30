import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function Album(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const albumdata = await prisma.album.findMany({
          include: {
            artists: true,
            comments: true,
          },
        });
        res.status(200).json(albumdata);
      } catch (e) {
        console.log("Error occured in user call [GET REQ ERROR]: ", e);
        res.status(500).json({ error: "Error fetching user" });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
