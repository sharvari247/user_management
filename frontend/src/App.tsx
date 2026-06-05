import { Link } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <nav
        style={{
          display: "flex",
          gap: "20px",
          padding: "20px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
      </nav>

      <AppRoutes />
    </>
  );
}

export default App;