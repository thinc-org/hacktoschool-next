import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Prisma, PrismaClient } from "@prisma/client";
import { json } from "stream/consumers";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const data1 = JSON.parse(req.body);
    //console.log(data1)
    const Pdate = new Date(data1.pdate)
    const Ddate = new Date(data1.ddate)
    const full = parseInt(data1.full)
    const newUp = await prisma.Assignment.update({
      where:{
        assignmentid:data1.assignmentid
      },data:{
        topic:data1.title,
        description:data1.des,
        fullscore: full,
        publishtime: Pdate,
        duedate: Ddate
      }
    })

    res.status(200).json({
      body: 'updated!'
  })

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
  //console.log(data1)
  const Did = parseInt(data1.id)
  const Nid = parseInt(data1.sid)
  let Name = ''
 if(data1.role === 'student'){
    const stu = await prisma.Student.findUnique({
        where:{
            id:Nid
        }
    })
    Name = stu.name
 }
 else{
    const ins = await prisma.instructor.findUnique({
        where:{
            id:Nid
        }
    })
    Name = ins.name
 }

 const newa = await prisma.Comment.create({
    data:{
        did: Did,
        name:Name,
        detail:data1.comment,
        like:0,
    }
 })

 
 res.status(200).json({
    body: 'done'})



 
}
