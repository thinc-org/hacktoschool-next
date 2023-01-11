import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

interface NextApiRequestWithId extends NextApiRequest {
    query : {
        id: string
    }   
};

export default async function handle(req: NextApiRequestWithId, res: NextApiResponse) {
    const notificationId = parseInt(req.query.id);
    if (req.method === 'GET') {
        handleGET(notificationId, res);
    } else if (req.method === 'PUT') {
        handlePUT(req, res);
    } else if (req.method === 'DELETE') {
        handleDELETE(notificationId, res);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}


// DELETE /api/course/:id
// delete a course by their id
async function handleDELETE(id: number, res: NextApiResponse) {
    const notification = await prisma.notification.delete({
        where: {
            id: id,
        },
    })
    res.json({
        data: "delete success"
    })
}

// GET /api/notification/:id
// get the notification by their id
async function handleGET(id: number, res: NextApiResponse) {
    const notification = await prisma.notification.findUnique({
        where: {
            id: id,
        },
    })
    res.json(notification)
}

// PUT /api/notification/:id
// update the notification by their id
async function handlePUT(req: NextApiRequestWithId, res: NextApiResponse) {
    const notificationId = parseInt(req.query.id);
    const { notificationStatus } = req.body;
    const notification = await prisma.notification.update({
        where: { id: notificationId },
        data: {
            status: notificationStatus,
        },
    })
    res.status(200).json({
        msg: "update notification status complete",
    })
}