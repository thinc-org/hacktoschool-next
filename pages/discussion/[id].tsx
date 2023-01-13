import { GetServerSideProps } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Headerr } from "../../component/headerr";
import prisma from "../../lib/prisma";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const CourseMenu: React.FC = ({
  course: { id: courseId, title, description, instructor_name, imagePath }, announcements,
}) => {
  // for some loading

  useEffect(() => {
    //adding font awesome
    // for some future features
   
  }, []);

 



  return (
    <>
     
      <Headerr />
      <div className="pt-10 px-48">
        <h1>HI DISCUSSION</h1>
    
      </div>
    </>
  );
};

// this function will check for
// course details, instructor_name
export const getServerSideProps: GetServerSideProps = async (context) => {
  const courseId = Number(
    Array.isArray(context.params.id) ? context.params.id[0] : context.params.id
  );
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: { instructor: true },
  });


  /*  add imagePath field to this course*/
  if (course.photoId !== null) {
    const photo = await prisma.photo.findUnique({
      where: {
        id: course.photoId,
      },
    });
    course["imagePath"] = photo.filePath;
  }
  else {
    course["imagePath"] = "/dummypic.png"
  }

  //find all announcements for this class
  const announcements = await prisma.announcement.findMany({
    where: {
      courseId: courseId
    },
  });

  return {
    props: {
      course: {
        ...JSON.parse(JSON.stringify(course)),
        instructor_name: course.instructor.name,
        // imagePath: (course.photoId === null ? "/dummypic.png" : course.photo.filePath),  /* seriously no idea why this doesn't work when instructor does*/
      },
      announcements: announcements
    },
  };
};

export default CourseMenu;
