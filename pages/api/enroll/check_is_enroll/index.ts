import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma';


// the route api/enroll/check_is_enroll will check if the student enrolled in thecourse
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { studentId, courseId } = req.body;
    const enrolls = await prisma.enroll.findMany({
        where: {
            AND:[
                {studentId: studentId},
                {courseId: courseId}
            ]
        },
    });


    const data = enrolls.length === 0 ? false : true;

    res.status(200).json({
        data: data,
    });
}