import { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { FaUser, FaEnvelope, FaPhone, FaPlus } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutation";
import { GET_CLIENTS } from "../queries/clientQueries";
import { toast } from "react-toastify";

export default function AddClientModal() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS }) || {
        clients: [],
      };
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
    onCompleted: () => {
      toast.success("Client added successfully");
      resetForm();
      handleClose();
    },
    onError: (error) => {
      toast.error(`Error adding client: ${error.message}`);
    },
  });

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      toast.error("Please fill in all fields");
      return;
    }

    addClient();
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        <FaPlus className="me-2" /> Add Client
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaEnvelope />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaPhone />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </InputGroup>
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
