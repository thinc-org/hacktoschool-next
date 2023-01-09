import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
    
    } else if (req.method === 'POST') {
        const inid = parseInt(req.body)
        const allcourse  =await prisma.Course.findMany({
            where: {instructorId:inid}
        })
     

        res.status(200).json({
            body: allcourse
          });
     
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}