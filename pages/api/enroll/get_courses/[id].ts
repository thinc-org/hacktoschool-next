import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

interface NextApiRequestWithId extends NextApiRequest {
    query: {
        id: string
    }
};

// the route api/enroll/get_courses/:studentId will get all enrolled courses of this student
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

    /*  add imagePath field to these courses*/
    /* note for future debugging, becareful of the prisma await in the call back, the timing is uncontrollable */
    for (const c of courses) {
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

    res.json({
        data: courses
    }
    );
}