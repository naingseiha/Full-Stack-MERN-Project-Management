import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTasks,
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaPlus,
  FaFilter,
  FaSearch,
} from "react-icons/fa";
import ProjectCard from "../components/ProjectCard";
import ClientTable from "../components/ClientTable";
import AddClientModal from "../components/AddClientModal";
import AddProjectModal from "../components/AddProjectModal";
import Spinner from "../components/Spinner";

export default function Home() {
  const [activeTab, setActiveTab] = useState("projects");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery(GET_PROJECTS);
  const {
    loading: clientsLoading,
    error: clientsError,
    data: clientsData,
  } = useQuery(GET_CLIENTS);

  if (projectsLoading || clientsLoading) return <Spinner />;
  if (projectsError || clientsError) return <p>Something Went Wrong</p>;

  // Calculate project metrics
  const totalProjects = projectsData.projects.length;
  const completedProjects = projectsData.projects.filter(
    (project) => project.status === "Completed"
  ).length;
  const inProgressProjects = projectsData.projects.filter(
    (project) => project.status === "In Progress"
  ).length;
  const notStartedProjects =
    totalProjects - completedProjects - inProgressProjects;

  // Filter projects based on search and status
  const filteredProjects = projectsData.projects
    .filter(
      (project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (project) => statusFilter === "all" || project.status === statusFilter
    );

  return (
    <div className="container fade-in">
      <div className="page-header">
        <h1>Project Dashboard</h1>
      </div>

      <div className="dashboard">
        {/* Stats Section */}
        <div className="dashboard-stats">
          <div className="card stat-card stat-total">
            <div className="stat-icon">
              <FaTasks />
            </div>
            <div className="stat-value">{totalProjects}</div>
            <div className="stat-label">Total Projects</div>
          </div>

          <div className="card stat-card stat-completed">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>
            <div className="stat-value">{completedProjects}</div>
            <div className="stat-label">Completed</div>
          </div>

          <div className="card stat-card stat-progress">
            <div className="stat-icon">
              <FaClock />
            </div>
            <div className="stat-value">{inProgressProjects}</div>
            <div className="stat-label">In Progress</div>
          </div>

          <div className="card stat-card stat-clients">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <div className="stat-value">{clientsData.clients.length}</div>
            <div className="stat-label">Clients</div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="card">
          <div className="card-header">
            <div className="tab-navigation">
              <button
                className={`btn ${
                  activeTab === "projects"
                    ? "btn-primary"
                    : "btn-outline-primary"
                } me-2`}
                onClick={() => setActiveTab("projects")}
              >
                Projects
              </button>
              <button
                className={`btn ${
                  activeTab === "clients"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setActiveTab("clients")}
              >
                Clients
              </button>
            </div>
          </div>

          <div className="card-body">
            {activeTab === "projects" ? (
              <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div
                    className="d-flex align-items-center"
                    style={{ width: "60%" }}
                  >
                    <div className="position-relative w-100">
                      <FaSearch
                        style={{
                          position: "absolute",
                          left: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#6c757d",
                        }}
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search projects..."
                        style={{ paddingLeft: "2.5rem" }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="ms-2" style={{ width: "30%" }}>
                      <select
                        className="form-control"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="all">All Status</option>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                  <AddProjectModal />
                </div>

                {filteredProjects.length === 0 ? (
                  <div className="text-center py-5">
                    <p className="text-muted">
                      No projects found. Create your first project!
                    </p>
                    <button
                      className="btn btn-primary mt-3"
                      data-bs-toggle="modal"
                      data-bs-target="#addProjectModal"
                    >
                      <FaPlus className="me-2" /> Add Project
                    </button>
                  </div>
                ) : (
                  <div className="projects-grid">
                    {filteredProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="m-0">Client List</h4>
                  <AddClientModal />
                </div>

                {clientsData.clients.length === 0 ? (
                  <div className="text-center py-5">
                    <p className="text-muted">
                      No clients found. Add your first client!
                    </p>
                    <button
                      className="btn btn-primary mt-3"
                      data-bs-toggle="modal"
                      data-bs-target="#addClientModal"
                    >
                      <FaPlus className="me-2" /> Add Client
                    </button>
                  </div>
                ) : (
                  <ClientTable clients={clientsData.clients} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
