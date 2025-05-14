import { useNavigate, Link } from "react-router-dom";
import { FaProjectDiagram, FaPlus, FaUsers, FaThList } from "react-icons/fa";
import logo from "../assets/logo.png"; // You'll need to create/add this logo

const Header = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="ProjectManage" className="logo" />
          <span>ProjectManage</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <FaThList className="me-1" />
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/projects">
                <FaProjectDiagram className="me-1" />
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/clients">
                <FaUsers className="me-1" />
                Clients
              </Link>
            </li>
          </ul>
          <button
            className="btn btn-secondary ms-3 d-flex align-items-center"
            onClick={() => document.getElementById("addProjectModal").click()}
          >
            <FaPlus className="me-2" /> New Project
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
