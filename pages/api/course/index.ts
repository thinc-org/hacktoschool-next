import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        handleGET(res);
    } else if (req.method === 'POST') {
        handlePOST(req, res);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}

// POST /api/course
// stores a new course
// requires instructorId field in req.body
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
    const { title, description, instructorId } = req.body;
    const course = await prisma.course.create({
        data: {
            title: title,
            description: description,
            instructor: {
                connect: [{ id: instructorId }]
            }
        },
    });
    res.json(course);
}

// GET /api/course
// get all courses
async function handleGET(res: NextApiResponse) {
    const courses = await prisma.course.findMany();
    res.json(courses);
}