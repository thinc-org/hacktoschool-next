import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

interface NextApiRequestWithId extends NextApiRequest {
    query : {
        id: string
    }   
};

export default async function handle(req: NextApiRequestWithId, res: NextApiResponse) {
    const courseId = parseInt(req.query.id);
    console.log(courseId);
    if (req.method === 'GET') {
        handleGET(courseId, res);
    } else if (req.method === 'PUT') {
        handlePUT(req, res);
    } else if (req.method === 'DELETE') {
        handleDELETE(courseId, res);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}


// GET /api/course/:id
// get the course by their id
async function handleGET(id: number, res: NextApiResponse) {
    const course = await prisma.course.findUnique({
        where: {
            id: id,
        },
    })
    res.json(course)
}

// PUT /api/course/:id
// update the course by their id
async function handlePUT(req: NextApiRequestWithId, res: NextApiResponse) {
    const courseId = req.query.id;
    const { title, description } = req.body;
    const course = await prisma.course.update({
        where: { id: courseId },
        data: {
            title: title,
            description: description
        },
    })
    res.json(course)
}

// DELETE /api/course/:id
// delete a course by their id
async function handleDELETE(id: number, res: NextApiResponse) {
    const course = await prisma.course.delete({
        where: {
            id: id,
        },
    })
    res.json({
        data: "delete course success"
    })
}