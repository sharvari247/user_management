import { Link } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

import "./styles/global.css";
import "./styles/navbar.css";

function App() {
  return (
    <>
      <nav className="navbar">
        <Link className="nav-link" to="/">
          Home
        </Link>

        <Link className="nav-link" to="/users">
          Users
        </Link>
      </nav>

      <AppRoutes />
    </>
  );
}

export default App;