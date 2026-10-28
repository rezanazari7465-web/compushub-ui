
import { useEffect, useState } from "react";
import {
  getCourses,
  updateCourse,
  deleteCourse,
} from "../services/courseApi";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [course, setCourse] = useState({
    code: "",
    title: "",
    credits: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadCourses() {
    const response = await getCourses();
    setCourses(response.data);
  }

  useEffect(() => {
    getCourses()
      .then((response) => {
        setCourses(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load courses. Check the backend.");
      })
      .finally(() => setLoading(false));
  }, []);

  function handleEdit(selectedCourse) {
    setEditingId(selectedCourse.id);
    setCourse({
      code: String(selectedCourse.code ?? ""),
      title: String(selectedCourse.title ?? ""),
      credits: String(selectedCourse.credits ?? ""),
    });
    setMessage("");
    setError("");
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleUpdate(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to save these changes?"
    );

    if (!confirmed) return;

    const updatedCourse = {
      code: String(course.code ?? "").trim(),
      title: String(course.title ?? "").trim(),
      credits: Number(course.credits),
    };

    if (
      !updatedCourse.code ||
      !updatedCourse.title ||
      !Number.isFinite(updatedCourse.credits) ||
      updatedCourse.credits < 1
    ) {
      setError("Please enter valid course details.");
      return;
    }

    try {
      await updateCourse(editingId, updatedCourse);
      await loadCourses();
      setEditingId(null);
      setCourse({ code: "", title: "", credits: "" });
      setError("");
      setMessage("Course updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to update course. Please check the backend.");
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmed) return;

    try {
      await deleteCourse(id);
      await loadCourses();

      if (editingId === id) {
        setEditingId(null);
      }

      setError("");
      setMessage("Course deleted successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to delete course. Please check the backend.");
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Course Management</h2>

      {message && (
        <div className="alert alert-success">{message}</div>
      )}

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      {editingId !== null && (
        <div className="card mb-4">
          <div className="card-header bg-warning">
            <strong>Edit Course</strong>
          </div>

          <div className="card-body">
            <form onSubmit={handleUpdate}>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label">Course Code</label>
                  <input
                    type="text"
                    name="code"
                    className="form-control"
                    value={course.code}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-5">
                  <label className="form-label">Course Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={course.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label">Credits</label>
                  <input
                    type="number"
                    name="credits"
                    min="1"
                    className="form-control"
                    value={course.credits}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-2 d-flex align-items-end">
                  <button
                    type="submit"
                    className="btn btn-success w-100"
                  >
                    Update
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-secondary mt-3"
                onClick={() => setEditingId(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <>
          <p>
            Total Courses: <strong>{courses.length}</strong>
          </p>

          {courses.length === 0 ? (
            <p>No courses available.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped text-center">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Code</th>
                    <th>Title</th>
                    <th>Credits</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {courses.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.code}</td>
                      <td>{item.title}</td>
                      <td>{item.credits}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Courses;
