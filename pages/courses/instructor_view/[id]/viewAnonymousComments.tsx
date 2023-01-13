import { faChild, faChildren, faPeopleCarry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import Router from "next/router";
import { Headerr } from "../../../../component/headerr"
import prisma from "../../../../lib/prisma";
import { randomTextColor, randomUserName } from "../../../shared/randomUtil";

const viewAnonymousComments = ({ courseName, comments }) => {
    return (
        <>
        <Headerr />
        <div className="pt-10 px-48">
            <h1 className="text-4xl p-2 bg-neutral-200">Student Comments For Course : {courseName}</h1>
            {
                comments.map((c) => {
                    return (
                        <div className="text-xl p-2 border" style={{ color: randomTextColor() }}>
                            <p><FontAwesomeIcon icon={faChild} className="h-10 pr-3"/>{c.username} : {c.message}</p>
                        </div>
                    )
                })
            }
            </div>
        </>
    );
}

export default viewAnonymousComments;



export const getServerSideProps: GetServerSideProps = async (context) => {
    const courseId = Number(Array.isArray(context.params.id) ? context.params.id[0] : context.params.id)
    const comments = await prisma.anonymousComment.findMany({
        where: { courseId: courseId },
    })

    // add anonymous username to these comments:
    for (const c of comments) {
        c["username"] = randomUserName();
    };

    const course = await prisma.course.findUnique({
        where: {
            id: courseId
        }
    })

    return { props: { courseName: course.title, comments: comments } }
}