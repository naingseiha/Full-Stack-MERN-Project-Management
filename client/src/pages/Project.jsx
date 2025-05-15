import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectModal from "../components/EditProjectModal"; // Updated import
import {
  FaArrowLeft,
  FaInfoCircle,
  FaUser,
  FaCalendarAlt,
  FaClipboardList,
} from "react-icons/fa";

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

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
    if (!dateString) return "No date available";

    try {
      const date = new Date(parseInt(dateString));
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <div className="container fade-in">
      <div className="project-detail-header">
        <div>
          <div className="d-flex align-items-center mb-2">
            <Link to="/" className="btn btn-outline-primary btn-sm me-3">
              <FaArrowLeft className="me-1" /> Back to Dashboard
            </Link>
            <span className={`badge ${getStatusClass(data.project.status)}`}>
              {data.project.status}
            </span>
          </div>
          <h1 className="project-detail-title">{data.project.name}</h1>
        </div>

        <div className="d-flex">
          {/* Use the new EditProjectModal component directly */}
          <EditProjectModal project={data.project} />
          <div className="ms-2">
            <DeleteProjectButton projectId={data.project.id} />
          </div>
        </div>
      </div>

      <div className="project-info-grid">
        <div className="project-info-card">
          <h3 className="project-info-card-title">
            <FaInfoCircle className="me-2" /> Project Details
          </h3>
          <div className="mb-4 mt-3">
            <h5>Description</h5>
            <p>{data.project.description}</p>
          </div>

          <div>
            <h5>Created on</h5>
            <p className="d-flex align-items-center">
              <FaCalendarAlt className="me-2" />
              {formatDate(data.project.createdAt)}
            </p>
          </div>
        </div>

        <div className="project-info-card">
          <h3 className="project-info-card-title">
            <FaClipboardList className="me-2" /> Project Status
          </h3>

          <div className="progress-wrapper my-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-medium">{data.project.status}</span>
              <span>
                {data.project.status === "Completed"
                  ? "100%"
                  : data.project.status === "In Progress"
                  ? "50%"
                  : "0%"}
              </span>
            </div>
            <div className="progress" style={{ height: "10px" }}>
              <div
                className={`progress-bar bg-${
                  data.project.status === "Completed"
                    ? "success"
                    : data.project.status === "In Progress"
                    ? "warning"
                    : "danger"
                }`}
                style={{
                  width:
                    data.project.status === "Completed"
                      ? "100%"
                      : data.project.status === "In Progress"
                      ? "50%"
                      : "0%",
                }}
              ></div>
            </div>
          </div>

          <div className="status-timeline">
            <div className="timeline-item d-flex">
              <div className="timeline-marker me-3">
                <div
                  className={`badge ${
                    data.project.status === "Not Started" ||
                    data.project.status === "In Progress" ||
                    data.project.status === "Completed"
                      ? "badge-completed"
                      : "badge-not-started"
                  }`}
                >
                  1
                </div>
              </div>
              <div>
                <h5>Project Created</h5>
                <p className="text-muted">
                  Project has been created and requirements gathered
                </p>
              </div>
            </div>

            <div className="timeline-item d-flex">
              <div className="timeline-marker me-3">
                <div
                  className={`badge ${
                    data.project.status === "In Progress" ||
                    data.project.status === "Completed"
                      ? "badge-completed"
                      : "badge-not-started"
                  }`}
                >
                  2
                </div>
              </div>
              <div>
                <h5>In Progress</h5>
                <p className="text-muted">
                  Project is actively being worked on
                </p>
              </div>
            </div>

            <div className="timeline-item d-flex">
              <div className="timeline-marker me-3">
                <div
                  className={`badge ${
                    data.project.status === "Completed"
                      ? "badge-completed"
                      : "badge-not-started"
                  }`}
                >
                  3
                </div>
              </div>
              <div>
                <h5>Completed</h5>
                <p className="text-muted">
                  Project has been completed and delivered
                </p>
              </div>
            </div>
          </div>
        </div>

        {data.project.client && (
          <div className="project-info-card">
            <h3 className="project-info-card-title">
              <FaUser className="me-2" /> Client Information
            </h3>
            <ClientInfo client={data.project.client} />
          </div>
        )}
      </div>
    </div>
  );
}
