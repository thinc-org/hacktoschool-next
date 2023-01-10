import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Prisma, PrismaClient } from "@prisma/client";

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
  const instructoridna = parseInt(data1.instructorid);
  const agena = parseInt(data1.age)
  const alreadyprofile = await prisma.InstructorProfile.findUnique({
    where:{
        instructorid:instructoridna
    }
  })
  if(alreadyprofile){
    const updateprofile = await prisma.InstructorProfile.update({
        where:{
            instructorid:instructoridna
        },data:{
            age:agena,
            firstname:data1.firstname,
            lastname:data1.lastname,
            tel:data1.tel,
            preferredsub:data1.psub,
            description:data1.des,
            link:data1.link
        }
    })
    res.status(200).json({
        body: updateprofile
      });


  }
  else{
    const newprofile = await prisma.InstructorProfile.create({
        data:{
            instructorid: instructoridna,
            age:agena,
            firstname:data1.firstname,
            lastname:data1.lastname,
            tel:data1.tel,
            preferredsub:data1.psub,
            description:data1.des,
            link:data1.link
        }
    })
    res.status(200).json({
        body: newprofile
      });
  }
}

// GET /api/course
// get all courses

