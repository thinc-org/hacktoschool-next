import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Prisma, PrismaClient } from "@prisma/client";
import { json } from "stream/consumers";
import { elements } from "chart.js";

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
  }
  else if(req.method === "DELETE"){
    const data1 = JSON.parse(req.body);
    const id = parseInt(data1.target)
    //console.log(data1)
    if(data1.type === 'comment'){
      await prisma.Comment.delete({
        where:{
          id:id
        }
      })
    }else{
      await prisma.discussionBoard.delete({
        where:{
          id:id
        }
      })
    }

    res.status(200).json({
      body: 'done'})
  

  }
   else {
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
  const cid = parseInt(data1.id)
  const sid = parseInt(data1.sid)
  //console.log(data1)
  let realone = []

  const alldis = await prisma.DiscussionBoard.findMany({
    where:{
        courseid:data1.cid
    }
  })
  for(let element of alldis){
   
    const already = await prisma.Like.findMany({
    
      where:{
          AND:[
              {did:element.id},
              {studentId:sid}
          ]
      }
     })

     const allcom = await prisma.comment.findMany({
      where:{
        did: element.id
      }
     })

     let liked=false
     if(already.length === 1){
        liked = true
     }
     const na = {
      id:element.id,
      topic:element.topic,
      name:element.name,
      detail:element.detail,
      like:element.like,
      already: liked, 
      allcomment: allcom
     }
     realone.push(na)
  }
 
 res.status(200).json({
    body: realone})



 
}
