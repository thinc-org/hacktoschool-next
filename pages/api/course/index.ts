import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Prisma, PrismaClient } from "@prisma/client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    handleGET(res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

// GET /api/course
// get all courses
async function handleGET(res: NextApiResponse) {
  const courses = await prisma.course.findMany();
  /*  add imagePath field to these courses*/
  /* note for future debugging, becareful of the prisma await in the call back, the timing is uncontrollable */
  for (const c of courses) {
    console.log("*******************************")
    //console.log(c);
    if (c.photoId !== null) {
      const photo = await prisma.photo.findUnique({
        where: {
          id: c.photoId,
        },
      });
      c["imagePath"] = photo.filePath;
    }
    else {
      c["imagePath"] = "/dummypic.png"
    }
    console.log(c["imagePath"])
  };
  res.json({
    data: courses
  });
}
