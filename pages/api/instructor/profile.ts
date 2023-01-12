import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Prisma, PrismaClient } from "@prisma/client";
import { sendDiscordNotification } from "../enroll";

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

// POST /api/instructor/profile
// stores a new instructor profile or update
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {

  console.log("in profile for ins api");
  const data1 = JSON.parse(req.body);
  const instructoridna = parseInt(data1.instructorid);
  let agena
  if(data1.age === ''){agena = 0}
  else{
   agena = parseInt(data1.age)}
  const alreadyprofile = await prisma.InstructorProfile.findUnique({
    where: {
      instructorid: instructoridna
    }
  })
  if (alreadyprofile) {
    const updateprofile = await prisma.InstructorProfile.update({
      where: {
        instructorid: instructoridna
      }, data: {
        age: agena,
        firstname: data1.firstname,
        lastname: data1.lastname,
        tel: data1.tel,
        preferredsub: data1.psub,
        description: data1.des,
        discord: data1.discord,
        link: data1.link
      }
    })
    console.log(data1.discord);
    // if the discord is valid, send a message to the provided bot, otherwise notify error
    if (data1.discord !== ''){
      sendDiscordNotification("discord bot connected", data1.discord);
    }

    res.status(200).json({
      body: updateprofile
    });


  }
  else {
    const newprofile = await prisma.InstructorProfile.create({
      data: {
        instructorid: instructoridna,
        age: agena,
        firstname: data1.firstname,
        lastname: data1.lastname,
        tel: data1.tel,
        preferredsub: data1.psub,
        description: data1.des,
        discord: data1.discord,
        link: data1.link
      }
    })

    console.log("------------------")
    console.log(newprofile);
    console.log("------------------")

    res.status(200).json({
      body: newprofile
    });
  }
}

// GET /api/course
// get all courses

