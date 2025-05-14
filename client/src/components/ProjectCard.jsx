import { Link } from "react-router-dom";
import { FaEye, FaCalendarAlt, FaUser } from "react-icons/fa";

export default function ProjectCard({ project }) {
  // Get status class
  const getStatusClass = (status) => {
    switch (status) {
      case "In Progress":
        return "status-in-progress";
      case "Completed":
        return "status-completed";
      default:
        return "status-not-started";
    }
  };

  // Format date or display placeholder if invalid
  const formatDate = (dateString) => {
    if (!dateString) return "No date available";

    try {
      const date = new Date(parseInt(dateString));
      return date.toLocaleDateString();
    } catch (error) {
      return "Invalid Date";
    }
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card project-card">
        <div className="project-header">
          <h5>{project.name}</h5>
          <span className={`status-badge ${getStatusClass(project.status)}`}>
            {project.status}
          </span>
        </div>

        <div className="description">{project.description}</div>

        <div className="date-display">
          <FaCalendarAlt />
          {formatDate(project.createdAt)}
          {project.client && (
            <span className="ms-2">
              <FaUser className="ms-3 me-1" />
              {project.client.name}
            </span>
          )}
        </div>

        <div className="card-footer">
          <Link
            to={`/projects/${project.id}`}
            className="btn btn-primary view-details-btn"
          >
            <FaEye /> View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
