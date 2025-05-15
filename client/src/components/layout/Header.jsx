import { Link, useLocation } from "react-router-dom";
import { FaProjectDiagram, FaUsers, FaTachometerAlt } from "react-icons/fa";
import logo from "../assets/logo.png"; // Add your logo file

export default function Header() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="ProjectManage" />
          <span>Project Manage</span>
        </Link>
      </div>
    </header>
  );
}
