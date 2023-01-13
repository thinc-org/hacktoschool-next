import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { NotificationStatus, NotificationType } from '../../shared/notificationCodes';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        handleGET(req, res);
    } else if (req.method === 'POST') {
        handlePOST(req, res);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}

// POST /api/anonymousComment
// stores a new anonymousComment
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
    const { message, courseId } = req.body;
    const anonymousComment = await prisma.anonymousComment.create({
        data: {
            message: message,
            course: {
                connect: { id: parseInt(courseId) },
            }
        },
    });

    res.json(anonymousComment);
}

// GET /api/anonymousComment?courseId=[id]
// get all anonymousComments with the courseId = [id]
async function handleGET(req: NextApiRequest, res: NextApiResponse) {
    const anonymousComments = await prisma.anonymousComment.findMany({
        where: {
            courseId: parseInt(req.query.courseId)
        }
    });
    res.json(anonymousComments);
}