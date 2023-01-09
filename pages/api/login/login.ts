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
        const resdata = {
          id: finduser.id,
          role: "student",
          email: finduser.email
        };
        res.status(200).json({
          body: resdata,
        });
      } else {
        res.status(500).json({
          body: "Wrong Password",
        });
      }
    } else {
      const finduser2 = await prisma.Instructor.findUnique({
        where: { email: data.email },
      });
      if (finduser2) {
        if (finduser2.password === data.password) {
          const resdata2 = {
            id: finduser2.id,
            role: "instructor",
            email: finduser2.email
          };
          res.status(200).json({
            body: resdata2,
          });
        } else {
          res.status(500).json({
            body: "Wrong Password",
          });
        }
      } else {
        res.status(500).json({
          body: "Cantfind",
        });
        return;
      }
    }
  }
}
