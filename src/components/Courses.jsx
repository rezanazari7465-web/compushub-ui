function Courses() {
  const courses = [
    {
      id: 1,
      code: "CS301",
      title: "Web Information Systems",
      credits: 3,
    },
    {
      id: 2,
      code: "CS302",
      title: "Enterprise Web Applications",
      credits: 3,
    },
  ];

  return (
    <div>
      <h2>Course Management</h2>

      {/* Add New Course */}
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Add New Course</h5>

          <form>
            <div className="mb-3">
              <label className="form-label">Course Code</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter course code"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Course Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter course title"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Credits</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter credits"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Add Course
            </button>
          </form>
        </div>
      </div>

      {/* Course List */}
      <div className="mt-4">
        <h5>Course List</h5>

        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Title</th>
              <th>Credits</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.code}</td>
                <td>{course.title}</td>
                <td>{course.credits}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2">
                    Edit
                  </button>

                  <button className="btn btn-sm btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Courses;