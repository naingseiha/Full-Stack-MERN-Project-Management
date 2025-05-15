import { Link } from "react-router-dom";
import { FaEye, FaCalendarAlt, FaUser } from "react-icons/fa";

export default function ProjectCard({ project }) {
  const getStatusClass = (status) => {
    switch (status) {
      case "In Progress":
        return "badge-in-progress";
      case "Completed":
        return "badge-completed";
      default:
        return "badge-not-started";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date";

    try {
      const date = new Date(parseInt(dateString));
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <div className="card project-card">
      <div className="project-card-header">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="project-card-title">{project.name}</h5>
          <span className={`badge ${getStatusClass(project.status)}`}>
            {project.status}
          </span>
        </div>
      </div>

      <div className="project-card-body">
        <p className="project-card-description">
          {project.description.length > 100
            ? `${project.description.substring(0, 100)}...`
            : project.description}
        </p>

        <div className="project-meta">
          <div className="project-meta-item">
            <FaCalendarAlt className="project-meta-icon" />
            {formatDate(project.createdAt)}
          </div>

          {project.client && (
            <div className="project-meta-item">
              <FaUser className="project-meta-icon" />
              {project.client.name}
            </div>
          )}
        </div>
      </div>

      <div className="project-card-footer">
        <Link to={`/projects/${project.id}`} className="btn btn-primary btn-sm">
          <FaEye className="me-1" /> View Details
        </Link>
      </div>
    </div>
  );
}
