import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { Prisma, PrismaClient } from "@prisma/client";
import { json } from "stream/consumers";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    
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
//   console.log(data1)
  const Cid = parseInt(data1.courseid)
  const Iid = parseInt(data1.instructorid)
  const allAnnouce = await prisma.Assignment.findMany({
    where:{
        courseid: Cid
    }
  })
  

 

  

  res.status(200).json({
    body: allAnnouce
})
}
