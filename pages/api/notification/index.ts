import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// the route api/notification will get all notifications of the user
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { userRole, userId } = req.body;

    if (userRole === 'instructor') {
        const notifications = await prisma.notification.findMany({
            where: {
                instructorId: userId,
            }
        });

        console.log(notifications);

        res.json({
            data: notifications,
        })

    } else if (userRole === 'student') {
        const notifications = await prisma.notification.findMany({
            where: {
                studentId: userId,
            }
        });

        console.log(notifications);

        res.json({
            data: notifications,
        })
    } else {
        res.status(500).json({
            err: "invalid role"
        });
    }
}