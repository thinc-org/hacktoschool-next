const CourseElement: React.FC<Props> = ({ course }) => {

    return (
        <div>
            <h2>{course.title}</h2>
            <p>Description : {course.description}</p>
        </div>
    )
}

export default CourseElement;