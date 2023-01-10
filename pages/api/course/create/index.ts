
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

// set the config for this api
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        );
    }

    // parse the courseData, courseImage and InstructorID from the request
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {

        // parse the fields from the request formData
        const { title, description, instructorId } = fields;
        const intInstructorId = parseInt(instructorId)

        // create a new course on prisma to get the courseID
        const course = await prisma.course.create({
            data: {
                title: title,
                description: description,
                instructorId: intInstructorId,
            },
        });

        // use that courseId to create a new folder to store image for that course
        const courseId = course.id;
        const { filepath: tempFilePath, originalFilename } = files.courseImage;
        const folderPath = process.cwd() + `/public/courses/${courseId}/images`;
        const filePath = folderPath + `/${originalFilename}`;
        const savingPath = `/courses/${courseId}/images/${originalFilename}`;

        try {
            await fs.readdir(path.join(folderPath));
        } catch (error) {
            await fs.mkdir(path.join(folderPath), { recursive: true });
        }

        console.log(savingPath);

        // saving the file by renaming the tempFilePath to the new path
        fs.rename(tempFilePath, filePath, err => {
            if (err) {
                console.error(err.message);
                return;
            }
        });

        // linking the photo model to the course model, so we can retrieve the image
        const photo = await prisma.photo.create({
            data:{
                filePath: savingPath,
                courseId: courseId
            }
        });

        await prisma.course.update({
            where: {
                id: courseId
            },
            data: {
                photoId: photo.id
            }
        })



        res.status(200).json({ done: "ok" });
    })
}