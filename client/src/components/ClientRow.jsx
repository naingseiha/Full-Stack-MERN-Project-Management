import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";

import { DELETE_CLIENT } from "../mutations/clientMutation";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENT });
    //   cache.writeQuery({
    //     query: GET_CLIENT,
    //     data: { clients: clients.filter((c) => c.id !== deleteClient.id) },
    //   });
    // },
  });

  return (
    <tr key={client.id}>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}

export default ClientRow;
