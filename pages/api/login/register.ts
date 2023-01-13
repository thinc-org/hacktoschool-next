import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Prisma, PrismaClient } from "@prisma/client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const info = JSON.parse(req.body);
    console.log(info);

    if (info.role === "student") {
      //in case they already have this id as instructor
      const oldUser = await prisma.Instructor.findUnique({
        where: { email: info.email },
      });
      if (oldUser) {
        if (info.password === oldUser.password) {
          res.status(500).json({
            body: "same password",
          });
          return;
        }
        //not the same password is fine
      } else {
        try {
          const newUser = await prisma.Student.create({
            data: {
              email: info.email,
              name: info.name,
              password: info.password,
            },
          });

          // also create profile for them

        const newprofile = await prisma.studentProfile.create({
          data: {
            studentid: newUser.id,
            age: 0,
            firstname: '',
            lastname: '',
            tel: '',
            preferredsub: '',
            description: '',
            link: ''
          }
        })

          const resdata = {
            id: newUser.id,
            role: "student",
            email: newUser.email,
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
    } else {
      //in case same password for same email
      const oldUser = await prisma.Student.findUnique({
        where: { email: info.email },
      });
      if (oldUser) {
        if (info.password === oldUser.password) {
          res.status(500).json({
            body: "same password",
          });
          return;
        }
      }

      try {
        const newUser = await prisma.Instructor.create({
          data: {
            email: info.email,
            name: info.name,
            password: info.password,
          },
        });

        // also create profile for them

        const newprofile = await prisma.InstructorProfile.create({
          data: {
            instructorid: newUser.id,
            age: 0,
            firstname: '',
            lastname: '',
            tel: '',
            preferredsub: '',
            description: '',
            discord: '',
            link: ''
          }
        })

        console.log("instructor profile created");


        const resdata = {
          id: newUser.id,
          role: "instructor",
          email: info.email,
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
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
