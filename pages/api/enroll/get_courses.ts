import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

interface NextApiRequestWithId extends NextApiRequest {
    query : {
        id: string
    }   
};

export default async function handle(req: NextApiRequestWithId, res: NextApiResponse) {
    const studentId = parseInt(req.query.id);
    const enrolls = await prisma.enroll.findMany({
        where: {
            studentId: studentId,
        },
    });

    const courseIdArray = enrolls.map((e) => e.courseId);

    const courses = await prisma.course.findMany({
        where: {
            id: {
                $in: courseIdArray
            }
        }
    });

    res.json(courses);
}