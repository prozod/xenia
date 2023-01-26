import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../lib/prisma"

export default async function userRequests(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req
	switch (method) {
		case "GET":
			try {
				const userdata = await prisma.user.findUnique({
					where: { id: req.query.id as string },
				})
				res.status(200).json(userdata)
			} catch (e) {
				console.log("Error occured in user call [GET REQ ERROR]: ", e)
				res.status(500).json({ error: "Error fetching user" })
			}
			break
		default:
			res.setHeader("Allow", ["GET"])
			res.status(405).end(`Method ${method} Not Allowed`)
			break
	}
}
