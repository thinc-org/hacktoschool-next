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
  console.log(data1)
  const Cid = parseInt(data1.courseid)
  const Iid = parseInt(data1.instructorid)
  const Pdate = new Date(data1.pdate)
  const Ddate = new Date(data1.pdate)
  const full = parseInt(data1.full)

  const newAssign = await prisma.Assignment.create({
    data:{
    assignmentnumber:0,
    courseid: Cid,
    topic:data1.title,
    description:data1.des,
    fullscore: full,
    publishtime: Pdate,
    duedate: Ddate}
  }) 

  const enrolls = await prisma.enroll.findMany({
    where:{
      courseId:Cid
        }
    }
  )

  enrolls.forEach(async (element)=>{
    await prisma.StudentAssignment.create({
      data:{
        studentId: element.studentId,
        assignmentid: newAssign.assignmentid,
        score:0,
        comment:'',
        answer:'',
        status:0
      }
    })
  })

  res.status(200).json({
    body: 'done'
})
}
