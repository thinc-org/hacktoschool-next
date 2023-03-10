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
  let allcourseass = [{}];
    const data1 = req.body;
  const sid = parseInt(data1)
   const allAssign = await prisma.StudentAssignment.findMany({
    where:{
        studentId: sid
    }
   })   
   for(let element of allAssign){
    const assignment = await prisma.Assignment.findUnique({
        where:{
            assignmentid:element.assignmentid
        }
    })
    const coursename = await prisma.Course.findUnique({
      where:{
        id:assignment.courseid
      }
    })
    const newitem = {
      topic: assignment.topic,
      fullscore:assignment.fullscore,
      coursename:coursename.title,
      duedate:assignment.duedate,
      publish:assignment.publishtime,
      courseid:assignment.courseid
    }

   
    allcourseass.push(newitem)
   }

   //console.log(allcourseass, ' hiiiiiiiiiii')
 
    

 

  

  res.status(200).json({
    body: allcourseass
})
}
