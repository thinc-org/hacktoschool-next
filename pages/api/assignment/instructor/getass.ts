import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { Prisma, PrismaClient } from "@prisma/client";
import { json } from "stream/consumers";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {

    const data1 = parseInt(req.body)
    console.log(data1,' goddd')
    console.log('1111111111111111111111111111')
    const nomore = await prisma.Assignment.delete({
      where:{
        assignmentid:data1
      }
    })

    
  res.status(200).json({
    body: 'Success!'})

    
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
  const data1 = parseInt(req.body);
  let man = [{}]
   //console.log(data1)
   const allSubmitstudent = await prisma.studentAssignment.findMany({
    where:{
        assignmentid:data1
    }
   })
   for(let element of allSubmitstudent){
    const student = await prisma.Student.findUnique({
        where:{ 
            id:element.studentId
        }
    })
    const newitem = {
        answer:element.answer,
        score:element.score,
        status:element.status,
        comment:element.comment,
        sname:student.name,
        sid:student.id
    }
    man.push(newitem)}
   

 

  res.status(200).json({
    body: man})
}
