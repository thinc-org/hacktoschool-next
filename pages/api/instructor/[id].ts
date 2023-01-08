import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

interface NextApiRequestWithId extends NextApiRequest {
    query : {
        id: string
    }   
};

export default async function handle(req: NextApiRequestWithId, res: NextApiResponse) {
    const instructorId = parseInt(req.query.id);

    if (req.method === 'GET') {
        handleGET(instructorId, res);
    } else if (req.method === 'PUT') {
        handlePUT(req, res);
    } else if (req.method === 'DELETE') {
        handleDELETE(instructorId, res);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}


// GET /api/instructor/:id
// get the instructor by their id
async function handleGET(id: number, res: NextApiResponse) {
    const instructor = await prisma.instructor.findUnique({
        where: {
            id: id,
        },
    })
    res.json(instructor)
}

// PUT /api/instructor/:id
// update the instructor by their id
async function handlePUT(req: NextApiRequestWithId, res: NextApiResponse) {
    const instructorId = req.query.id;
    const { email, name } = req.body;
    const instructor = await prisma.post.update({
        where: { id: instructorId },
        data: {
            email: email,
            name: name
        },
    })
    res.json(instructor)
}

// DELETE /api/instructor/:id
// delete a instructor by their id
async function handleDELETE(id: number, res: NextApiResponse) {
    const instructor = await prisma.instructor.delete({
        where: {
            id: id,
        },
    })
    res.json(instructor)
}