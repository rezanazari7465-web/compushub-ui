import { useEffect, useState } from "react";
import { getCourses } from "../services/courseApi";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCourses()
      .then((response) => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(
          "Unable to load courses. Check the backend and try again."
        );
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Course Management</h2>

      {loading && <p>Loading courses...</p>}

      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <p>
          Total Courses: <strong>{courses.length}</strong>
        </p>
      )}

      {!loading && !error && courses.length === 0 && (
        <p>No courses available.</p>
      )}

      {!loading && !error && courses.length > 0 && (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Title</th>
              <th>Credits</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.code}</td>
                <td>{course.title}</td>
                <td>{course.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Courses;