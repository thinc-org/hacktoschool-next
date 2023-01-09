const CourseElement: React.FC<Props> = ({ course }) => {

    return (
        <div className="my-2">
            <h2 className="px-5">{course.title}</h2>
            <p className="px-5">Description : {course.description}</p>
        </div>
    )
}

export default CourseElement;