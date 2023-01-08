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

// POST /api/student
// stores a new student
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
    const { email, name } = req.body;
    const student = await prisma.student.create({
        data: {
            name: name,
            email: email,
        },
    });
    res.json(student);
}

// GET /api/student
// get all students
async function handleGET(res: NextApiResponse) {
    const students = await prisma.student.findMany();
    res.json(students);
}