import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import Client from "../components/Client";
import Projects from "../components/Projects";
import AddClientModal from "../components/AddClientModal";
import AddProjectModal from "../components/AddProjectModal";
import Spinner from "../components/Spinner";
import { FaTasks, FaUsers, FaCheckCircle, FaClock } from "react-icons/fa";

export default function Home() {
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

  return (
    <div className="container">
      <div className="dashboard-header mb-4">
        <h1 className="mb-0">Project Dashboard</h1>
      </div>

      <div className="dashboard-section">
        <div className="row">
          {/* Project Statistics Cards */}
          <div className="col-md-3 mb-4">
            <div className="card stats-card">
              <div className="card-icon total">
                <FaTasks />
              </div>
              <h3>{totalProjects}</h3>
              <p>Total Projects</p>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card stats-card">
              <div className="card-icon completed">
                <FaCheckCircle />
              </div>
              <h3>{completedProjects}</h3>
              <p>Completed</p>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card stats-card">
              <div className="card-icon progress">
                <FaClock />
              </div>
              <h3>{inProgressProjects}</h3>
              <p>In Progress</p>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card stats-card">
              <div className="card-icon clients">
                <FaUsers />
              </div>
              <h3>{clientsData.clients.length}</h3>
              <p>Clients</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="section-header">
            <h4>Projects</h4>
            <AddProjectModal />
          </div>
          <Projects />
        </div>

        <div className="col-lg-4">
          <div className="section-header">
            <h4>Clients</h4>
            <AddClientModal />
          </div>
          <div className="table-container">
            <Client />
          </div>
        </div>
      </div>
    </div>
  );
}
