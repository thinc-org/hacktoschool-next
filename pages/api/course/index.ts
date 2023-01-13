import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Prisma, PrismaClient } from "@prisma/client";
import { a } from "react-spring";
import { Console } from "console";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    handleGET(res);
  }
  else if (req.method === 'POST'){

    let allresult = []
    const result = await prisma.Course.findMany({
      where:{
        OR:[
        {title:{
          contains: req.body
        }},
        {description:{
          contains: req.body
        }}]
      }
    })
    allresult = allresult.concat(result)
    //console.log(allresult)

    const instruc = await prisma.instructor.findMany({
      where:{
        name:{
          contains:req.body
        }
      }
    })
    for(let element of instruc){
      const allmatch = await prisma.course.findMany({
        where:{
          instructorId: element.id
        }
      })
      
      allresult = allresult.concat(allmatch)
    }
    let dondup = []
    let afterresult=[]
    allresult.forEach((element,i)=>{
      if(dondup.includes(element.id)){}
      else{
        afterresult.push(element)
        dondup.push(element.id)
      }
    })

    for (const c of afterresult) {
    
      //console.log(c);
      if (c.photoId !== null) {
        const photo = await prisma.photo.findUnique({
          where: {
            id: c.photoId,
          },
        });
        c["imagePath"] = photo.filePath;
      }
      else {
        c["imagePath"] = "/dummypic.png"
      }
      //console.log(c["imagePath"])
    };
  
    
    //console.log(afterresult)
    res.json({
      body:Array.from(afterresult)
    })
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

// GET /api/course
// get all courses
async function handleGET(res: NextApiResponse) {
  const courses = await prisma.course.findMany();
  /*  add imagePath field to these courses*/
  /* note for future debugging, becareful of the prisma await in the call back, the timing is uncontrollable */
  for (const c of courses) {
    
    //console.log(c);
    if (c.photoId !== null) {
      const photo = await prisma.photo.findUnique({
        where: {
          id: c.photoId,
        },
      });
      c["imagePath"] = photo.filePath;
    }
    else {
      c["imagePath"] = "/dummypic.png"
    }
    //console.log(c["imagePath"])
  };
  res.json({
    data: courses
  });
}
