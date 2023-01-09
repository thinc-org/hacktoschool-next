const CourseElement: React.FC<Props> = ({ course }) => {

    return (
        <div>
            <h2>{course.title}</h2>
            <small>Description : {course.description}</small>
        </div>
    )
}

export default CourseElement;