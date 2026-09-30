import { useNavigate, useParams } from "react-router-dom";
import courses from "../data/courses.js";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = courses.find(
    (course) => course.id === Number(id)
  );

  if (!course) {
    return (
      <div>
        <h2>Course Not Found</h2>

        <button
          onClick={() => navigate(-1)}
          className="btn btn-primary"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>{course.name}</h2>

      <p>
        <strong>Course ID:</strong> {course.id}
      </p>

      <p>
        <strong>Instructor:</strong> {course.instructor}
      </p>

      <p>
        <strong>Description:</strong> {course.description}
      </p>

      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary"
      >
        Back
      </button>
    </div>
  );
}

export default CourseDetails;