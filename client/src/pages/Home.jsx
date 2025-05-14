import AddClientModal from "../components/AddClientModal";
import AddProjecttModal from "../components/AddProjectModal";
import Client from "../components/Client";
import Projects from "../components/Projects";

function Home() {
  return (
    <>
      <div className="d-flex gap-3">
        <AddClientModal />
        <AddProjecttModal />
      </div>

      <Projects />
      <Client />
    </>
  );
}
export default Home;
