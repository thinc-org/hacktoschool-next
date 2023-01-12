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
 let allcourseass = [{}];

  const sid = parseInt(data1.sid)
  const allAssign = await prisma.Assignment.findMany({
    where:{
        courseid : data1.cid
    }
   }) 
   

    for(let element of allAssign){
    const assignment = await prisma.StudentAssignment.findFirst({
        where:{
            AND:[
            {studentId:sid},
            {assignmentid:element.assignmentid}

            ]
        }
    })
    if(assignment){
    // console.log('--------------------')
    // console.log(assignment)
    // console.log('--------------------')
   
    const newitem = {
        topic: element.topic,
        description: element.description,
        fullscore:element.fullscore,
        duedate:element.duedate,
        publish:element.publishtime,
        assignmentid:element.assignmentid,
        courseid:element.courseid,
        answer:assignment.answer,
        score:assignment.score,
        status:assignment.status,
        comment:assignment.comment
      }
    allcourseass.push(newitem)
    }}
    //console.log(allcourseass)

     
 
  res.status(200).json({
    body: allcourseass
})
}
