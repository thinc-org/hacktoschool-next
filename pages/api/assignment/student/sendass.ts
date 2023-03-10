import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { Prisma, PrismaClient } from "@prisma/client";
import { json } from "stream/consumers";
import StudentDashboard from "../../../student/dashboard";

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
 
 //console.log(data1, '           ggggggggggg')
  const aid = parseInt(data1.assignid)
  const sid = parseInt(data1.sid)
  const allAssign = await prisma.StudentAssignment.updateMany({
    where:{
        AND:[
            {assignmentid:aid},
            {studentId:sid}
        ] 
    },data:{
        answer:data1.answer,
        status:1
    }

   })   

   console.log(allAssign)
 
  res.status(200).json({
    body: 'done'})
}
