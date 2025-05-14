import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main-content">{children}</main>
      <footer className="footer mt-auto py-3 bg-light">
        <div className="container text-center">
          <span className="text-muted">© 2025 Project Management App</span>
        </div>
      </footer>
    </>
  );
};

export default Layout;
