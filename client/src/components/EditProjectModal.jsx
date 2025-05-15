import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutation";
import { toast } from "react-toastify";

export default function EditProjectModal({ project }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(project.status);

  // Reset form when project changes
  useEffect(() => {
    setName(project.name);
    setDescription(project.description);
    setStatus(project.status);
  }, [project]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [
      {
        query: GET_PROJECT,
        variables: { id: project.id },
      },
    ],
    onCompleted: () => {
      toast.success("Project updated successfully");
      handleClose();
    },
    onError: (error) => {
      toast.error(`Error updating project: ${error.message}`);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !status) {
      toast.error("Please fill in all required fields");
      return;
    }

    updateProject();
  };

  return (
    <>
      <Button
        variant="primary"
        className="d-flex align-items-center"
        onClick={handleShow}
      >
        <FaPencilAlt className="me-2" /> Edit Project
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project: {project.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Project name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Project description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
