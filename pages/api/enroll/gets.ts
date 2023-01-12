import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { Prisma, PrismaClient } from "@prisma/client";
import { isConstructorDeclaration } from 'typescript';
import { NotificationStatus, NotificationType } from '../../shared/notificationCodes';


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const data = parseInt(req.body)
        let niceone = []
        const allfind = await prisma.Enroll.findMany({
            where:{
                courseId:data
            }
        })
        for(let element of allfind){
            const findS = await prisma.student.findUnique({
                where:{
                    id:element.studentId
                }
            })
            const bb = {
                studentId: element.studentId,
                sname:findS.name
            }
            niceone.push(bb)
        }
        //all student that enrolled that course
        res.status(200).json({
            body: niceone
        })


       
    } else if (req.method === 'DELETE') {
        
    } 
   

    else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}

