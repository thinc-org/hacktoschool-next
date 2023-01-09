import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Prisma, PrismaClient } from "@prisma/client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    handleGET(res);
  } else if (req.method === "POST") {
    handlePOST(req, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

// POST /api/course
// stores a new course
// requires instructorId field in req.body
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const data1 = JSON.parse(req.body);
  const yahoo = parseInt(data1.Id);
  try {
    const course = await prisma.course.create({
      data: {
        title: data1.title,
        description: data1.description,
        instructorId: yahoo,
      },
    });
    res.status(200).json({
      body: "Created!",
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log("same data inserted");

        res.status(500).json({
          body: "Same",
        });
      }
    }
    throw e;
  }
}

// GET /api/course
// get all courses
async function handleGET(res: NextApiResponse) {
  const courses = await prisma.course.findMany();
  res.json(courses);
}
