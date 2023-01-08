import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

interface NextApiRequestWithId extends NextApiRequest {
    query : {
        id: string
    }   
};

export default async function handle(req: NextApiRequestWithId, res: NextApiResponse) {
    const studentId = parseInt(req.query.id);

    if (req.method === 'GET') {
        handleGET(studentId, res);
    } else if (req.method === 'PUT') {
        handlePUT(req, res);
    } else if (req.method === 'DELETE') {
        handleDELETE(studentId, res);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}


// GET /api/student/:id
// get the student by their id
async function handleGET(id: number, res: NextApiResponse) {
    const student = await prisma.student.findUnique({
        where: {
            id: id,
        },
    })
    res.json(student)
}

// PUT /api/student/:id
// update the student by their id
async function handlePUT(req: NextApiRequestWithId, res: NextApiResponse) {
    const studentId = req.query.id;
    const { email, name } = req.body;
    const student = await prisma.post.update({
        where: { id: studentId },
        data: {
            email: email,
            name: name
        },
    })
    res.json(student)
}

// DELETE /api/student/:id
// delete a student by their id
async function handleDELETE(id: number, res: NextApiResponse) {
    const student = await prisma.student.delete({
        where: {
            id: id,
        },
    })
    res.json(student)
}