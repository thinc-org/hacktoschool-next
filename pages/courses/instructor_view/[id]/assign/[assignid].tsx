import { useEffect, useState } from "react";
import CourseElement from "../../../../../component/CourseElement";
import { Headerr } from "../../../../../component/headerr";
import Router, { useRouter } from "next/router";
import prisma from "../../../../../lib/prisma";
import { GetServerSideProps } from "next";
const Home: React.FC = ({
  course: { id: courseId, title, description, instructor_name, imagePath },
}) => {
  const [allasign, setAllassign] = useState([]);
  const router = useRouter();
  const [mode, setMode] = useState(0); // mode 0 = default 1 = create
 

  return (
    <>
      <Headerr />
      <div className="pt-10 px-48"> 
        <h1>In course</h1>
      </div>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const courseId = Number(
    Array.isArray(context.params.id) ? context.params.id[0] : context.params.id
  );
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: { instructor: true },
  });

  return {
    props: {
      course: {
        ...JSON.parse(JSON.stringify(course)),
        instructor_name: course.instructor.name,
      },
    },
  };
};

export default Home;
