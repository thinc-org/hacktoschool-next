import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { Prisma, PrismaClient } from "@prisma/client";
import { isConstructorDeclaration } from 'typescript';
import { NotificationStatus, NotificationType } from '../../shared/notificationCodes';
import Discord from 'discord.js';

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

        console.log("in enrollhandler");
        console.log(courseId);

        // create notification for the instructor
        const notiMsg = `เห้ยยยย! นักเรียนชื่อ ${student.name} เขาลงทะเบียนคอร์ส ${course?.title} แล้วนะ`;

        const notification = await prisma.notification.create({
            data: {
                instructorId: course.instructorId,
                message: notiMsg,
                type: NotificationType.STUDENT_ENROLL,
                status: NotificationStatus.UNREAD,
                courseId: course.id,
            }
        })

        sendDiscordNotification(notiMsg);

        res.status(200).json({
            body: "Enroll success!",
        });

    } catch (e) {
        // handle some error
        console.log(e);
    }
}

const sendDiscordNotification = (msg) => {
    console.log("sending notification to discord")
    
    const { Webhook } = require('discord-webhook-node');
    const hook = new Webhook("https://discord.com/api/webhooks/1062738812016545823/Wi-okhQGasFSCTu8B-CDHNWhOLXzWknZR7HWjJE0PueIE06aM8XAhDCVBRuAdCuHpBhn");

    const IMAGE_URL = 'https://i.pinimg.com/564x/1d/83/a6/1d83a6d88d8be5b041a9a98fd5048311.jpg';
    hook.setUsername('Next ไหมนะ-Enroll-BOT');
    hook.setAvatar(IMAGE_URL);

    hook.send(msg);

    console.log("send notification to discord")
}