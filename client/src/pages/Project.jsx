import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectForm from "../components/EditProjectForm";
import {
  FaArrowLeft,
  FaPencilAlt,
  FaCalendarCheck,
  FaClipboardCheck,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <FaCalendarCheck className="text-success me-2" />;
      case "In Progress":
        return <FaClipboardCheck className="text-warning me-2" />;
      default:
        return <FaClipboardCheck className="text-danger me-2" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">{data.project.name}</h4>
          <Link to="/" className="btn btn-light btn-sm">
            <FaArrowLeft className="me-2" /> Back
          </Link>
        </div>

        <div className="card-body">
          <div className="row mb-5">
            <div className="col-md-8">
              <div className="mb-4">
                <h5 className="border-bottom pb-2 mb-3">Project Description</h5>
                <p className="lead">{data.project.description}</p>
              </div>

              <div className="mb-4">
                <h5 className="border-bottom pb-2 mb-3">Project Status</h5>
                <div className="d-flex align-items-center">
                  {getStatusIcon(data.project.status)}
                  <span
                    className={`status-badge ${
                      data.project.status === "Completed"
                        ? "status-completed"
                        : data.project.status === "In Progress"
                        ? "status-in-progress"
                        : "status-not-started"
                    }`}
                  >
                    {data.project.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              {data.project.client && (
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">Client Information</h5>
                  </div>
                  <div className="card-body">
                    <ClientInfo client={data.project.client} />
                  </div>
                </div>
              )}

              <div className="d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#editProjectModal"
                >
                  <FaPencilAlt className="me-2" /> Edit Project
                </button>
                <DeleteProjectButton projectId={data.project.id} />
              </div>
            </div>
          </div>

          {/* Edit Project Modal */}
          <div
            className="modal fade"
            id="editProjectModal"
            tabIndex="-1"
            aria-labelledby="editProjectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editProjectModalLabel">
                    Edit Project
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <EditProjectForm project={data.project} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
