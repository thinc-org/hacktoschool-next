import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {

    } else if (req.method === 'POST') {
        const inid = parseInt(req.body)
        const allcourse = await prisma.Course.findMany({
            where: { instructorId: inid }
        })

        /*  add imagePath field to these courses*/
        /* note for future debugging, becareful of the prisma await in the call back, the timing is uncontrollable */
        for (const c of allcourse) {
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
        };


        res.status(200).json({
            body: allcourse
        });

    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}