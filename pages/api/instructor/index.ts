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

// POST /api/instructor
// stores a new instructor
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
    const { email, name } = req.body;
    const instructor = await prisma.instructor.create({
        data: {
            name: name,
            email: email,
        },
    });
    res.json(instructor);
}

// GET /api/instructor
// get all instructors
async function handleGET(res: NextApiResponse) {
    const instructors = await prisma.instructor.findMany();
    res.json(instructors);
}