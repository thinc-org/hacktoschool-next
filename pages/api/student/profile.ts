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
  const studentidna = parseInt(data1.studentid);
  const agena = parseInt(data1.age)
  const alreadyprofile = await prisma.StudentProfile.findUnique({
    where:{
        studentid:studentidna
    }
  })
  if(alreadyprofile){
    const updateprofile = await prisma.StudentProfile.update({
        where:{
            studentid:studentidna
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
    const newprofile = await prisma.StudentProfile.create({
        data:{
            studentid: studentidna,
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

