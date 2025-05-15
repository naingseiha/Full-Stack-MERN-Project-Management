import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../mutations/projectMutation";
import { GET_PROJECTS } from "../queries/projectQueries";
import { toast } from "react-toastify";

export default function DeleteProjectButton({ projectId }) {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => {
      toast.success("Project deleted successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProject();
    }
  };

  return (
    <Button
      variant="danger"
      className="d-flex align-items-center"
      onClick={handleDeleteClick}
    >
      <FaTrash className="me-2" /> Delete Project
    </Button>
  );
}
