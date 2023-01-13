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
    const ssid = parseInt(data1.sid)
    const did = parseInt(data1.id)
  console.log(data1)
  
   const already = await prisma.Like.findMany({
    where:{
        AND:[
            {did:did},
            {studentId:ssid}
        ]
    }
   })

   
  if(already.length === 1){ res.status(200).json({
    body: 'no'})
    return
 }
 console.log('sssssssssssssssssssss')
 const already2 = await prisma.Like.create({

        data:{
        did:did,
        studentId:ssid
        }

    })
    
  const alldis = await prisma.DiscussionBoard.update({
    where:{
        id:did
    },
    data:{
        like:{increment:1}
    }
  })
 
 res.status(200).json({
    body: 'done'})



 
}
