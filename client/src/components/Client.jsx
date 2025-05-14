import { useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
import { GET_CLIENT } from "../queries/clientQueries";
import Spinner from "./Spinner";

function Client() {
  const { loading, error, data } = useQuery(GET_CLIENT);

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3">
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
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Client;
