import { FaTrash, FaEnvelope, FaPhone } from "react-icons/fa";
import { DELETE_CLIENT } from "../mutations/clientMutation";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

export default function ClientTable({ clients }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
    onCompleted: () => toast.success("Client deleted successfully"),
    onError: (error) => toast.error(`Error: ${error.message}`),
  });

  const handleDeleteClick = (id, clientName) => {
    if (window.confirm(`Are you sure you want to delete ${clientName}?`)) {
      deleteClient({
        variables: { id },
      });
    }
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="fw-medium">{client.name}</td>
              <td>
                <a
                  href={`mailto:${client.email}`}
                  className="d-flex align-items-center"
                >
                  <FaEnvelope size={14} className="me-2" />
                  {client.email}
                </a>
              </td>
              <td>
                <a
                  href={`tel:${client.phone}`}
                  className="d-flex align-items-center"
                >
                  <FaPhone size={14} className="me-2" />
                  {client.phone}
                </a>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteClick(client.id, client.name)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
