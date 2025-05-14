import { useQuery } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { DELETE_CLIENT } from "../mutations/clientMutation";
import { GET_CLIENTS } from "../queries/clientQueries";
import { useMutation } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function Client() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong</p>;

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      deleteClient({
        variables: { id },
      });
    }
  };

  return (
    <>
      <table className="client-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteClick(client.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
