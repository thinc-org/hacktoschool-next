import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const info =  JSON.parse(req.body)
        console.log(info)

        if(info.role === 'student'){
            const newuser = await prisma.Student.create({
                data:{
                    email: info.email,
                    name: info.name,
                    password: info.password
                }
            })
        }
        else{
            const newuser = await prisma.Instructor.create({
                data:{
                    email: info.email,
                    name: info.name,
                    password: info.password
                }
            })

        }
        res.status(200).json({
            body: "DONE"
        })


        

    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}