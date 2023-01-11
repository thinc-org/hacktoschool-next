import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { Prisma, PrismaClient } from "@prisma/client";
import { isConstructorDeclaration } from 'typescript';
import { NotificationStatus, NotificationType } from '../../shared/notificationCodes';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        handlePOST(req, res);
    } else if (req.method === 'DELETE') {
        handleDELETE(req, res);
    }

    else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}

// POST /api/enroll
// student leave the course
// req.body must have valid studentId and courseId
async function handleDELETE(req: NextApiRequest, res: NextApiResponse) {
    const { studentId, courseId } = req.body;
    try {
        const enroll = await prisma.enroll.delete({
            where: {
                studentId_courseId: {
                    studentId: studentId,
                    courseId: courseId
                }
            },
        });
        // res.json(student);
        res.status(200).json({
            body: "leave course success",
        });
    } catch (e) {
        console.log(e);
        // handle some error
    }
}

// POST /api/enroll
// enroll a student to a course
// req.body must have valid studentId and courseId
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
    const { studentId, courseId } = req.body;
    try {
        const student = await prisma.student.update({
            where: { id: studentId },
            data: {
                Enroll: {
                    create: { course: { connect: { id: courseId } } }
                }
            },
        });

        const course = await prisma.course.findUnique({
            where: {
                id: courseId
            }
        });
        
        // create notification for the instructor
        const notification = await prisma.notification.create({
            data: {
                instructorId: course.instructorId,
                message: `เห้ยยยย! นักเรียนชื่อ ${student.name} เขาลงทะเบียนคอร์ส ${course?.title} แล้วนะ`,
                type: NotificationType.STUDENT_ENROLL,
                status: NotificationStatus.UNREAD,
            }
        })

        res.status(200).json({
            body: "Enroll success!",
        });
    } catch (e) {
        // handle some error
    }
}