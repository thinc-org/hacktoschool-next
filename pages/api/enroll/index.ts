import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        handlePOST(req, res);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}

// POST /api/enroll
// enroll a student to a course
// req.body must have valid studentId and courseId
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
    const { studentId, courseId } = req.body;
    const student = await prisma.student.update({
        where: {id : studentId},
        data: {
            Enroll: {
               create: { course: { connect: { id : courseId } } }
            }
        },
    });
    res.json(student);
}