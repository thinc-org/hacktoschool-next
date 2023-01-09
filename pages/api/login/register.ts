import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Prisma, PrismaClient } from "@prisma/client";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const info =  JSON.parse(req.body)
        // console.log(info)

    if (info.role === "student") {
      try {
        const newUser = await prisma.Student.create({
          data: {
            email: info.email,
            name: info.name,
            password: info.password,
          },
        });
        const resdata = {
          id: newUser.id,
          role: "student",
        };
        res.status(200).json({
          body: resdata,
        });
        return;
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            console.log("same data inserted");

            res.status(500).json({
              body: "We fucked up",
            });
          }
        }
        throw e;
      }
    } else {
      try {
        const newUser = await prisma.Instructor.create({
          data: {
            email: info.email,
            name: info.name,
            password: info.password,
          },
        });

        const resdata = {
          id: newUser.id,
          role: "instructor",
        };
        res.status(200).json({
          body: resdata,
        });
        return;
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            console.log("same data inserted");

            res.status(500).json({
              body: "We fucked up",
            });
          }
        }
        throw e;
      }
    }

    res.status(200).json({
      body: "DONE",
    });
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
