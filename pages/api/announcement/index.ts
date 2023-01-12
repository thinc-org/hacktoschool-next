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

// POST /api/announcement
// stores a new announcement
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
    const { message, courseId } = req.body;
    const announcement = await prisma.announcement.create({
        data: {
            message: message,
            course: {
                connect: { id: parseInt(courseId) },
            }
        },
    });

    // send Notifications to all students
    const enrolls = await prisma.enroll.findMany({
        where: {
            courseId: parseInt(courseId),
        },
    });
    const studentIdArray = enrolls.map((e) => e.studentId);

    for (let studentId of studentIdArray) {
        let notification = await prisma.notification.create({
            data: {
                message: message,
                type: NotificationType.COURSE_ANNOUNCEMENTS,
                status: NotificationStatus.UNREAD,
                student: {
                    connect: { id: studentId },
                }
            },
        });
    }

    res.json(announcement);
}

// GET /api/announcement?courseId=[id]
// get all announcements with the courseId = [id]
async function handleGET(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.query);
    const announcements = await prisma.announcement.findMany({
        where: {
            courseId: parseInt(req.query.courseId)
        }
    });
    res.json(announcements);
}