import { Routes, Route } from "react-router-dom";

import Users from "../pages/users";
import Dashboard from "../pages/dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
};

export default AppRoutes;