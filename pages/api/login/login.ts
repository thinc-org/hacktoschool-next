import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    const finduser = await prisma.Student.findUnique({
      where: { email: data.email },
    });
    if (finduser) {
      if (finduser.password === data.password) {
        res.status(200).json({
          body: "Log In",
        });
      } else {
        res.status(500).json({
          body: "Wrong Password",
        });
      }
    } else {
      res.status(500).json({
        body: "Cant find",
      });
      return;
    }
  }
}
