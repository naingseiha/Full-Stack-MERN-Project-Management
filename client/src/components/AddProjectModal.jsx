import { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { FaList, FaPlus } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/projectMutation";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

export default function AddProjectModal() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("Not Started");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Get clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS }) || {
        projects: [],
      };
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
    onCompleted: () => {
      toast.success("Project added successfully");
      resetForm();
      handleClose();
    },
    onError: (error) => {
      toast.error(`Error adding project: ${error.message}`);
    },
  });

  const resetForm = () => {
    setName("");
    setDescription("");
    setStatus("Not Started");
    setClientId("");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !status) {
      toast.error("Please fill in all required fields");
      return;
    }

    addProject();
  };

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong loading clients</p>;

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <FaPlus className="me-2" /> New Project
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
          <Modal.Title>New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaList />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Project name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>
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

            <Form.Group className="mb-3">
              <Form.Label>Client</Form.Label>
              <Form.Select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
              >
                <option value="">Select Client</option>
                {data.clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
