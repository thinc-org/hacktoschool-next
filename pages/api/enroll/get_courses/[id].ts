import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

interface NextApiRequestWithId extends NextApiRequest {
    query : {
        id: string
    }   
};

// the route api/enroll/get_courses/:studentIt will get all enrolled courses of this student
export default async function handle(req: NextApiRequestWithId, res: NextApiResponse) {
    const studentId = parseInt(req.query.id);

    console.log(studentId);

    const enrolls = await prisma.enroll.findMany({
        where: {    
            studentId: studentId,
        },
    });

    console.log("enrolls");
    console.log(enrolls);

    const courseIdArray = enrolls.map((e) => e.courseId);

    const courses = await prisma.course.findMany({
        where: {
            id: {
                in: courseIdArray
            }
        }
    });

    console.log("courses");
    console.log(courses);
    res.json({
        data :   courses
    }
    );
}