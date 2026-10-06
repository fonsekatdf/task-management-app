import { Routes, Route, Navigate } from "react-router-dom";

import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import Register from "./pages/Register";

const ProtectedTasks = () => {
  const token = localStorage.getItem("token");

  return token ? <Tasks /> : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedTasks />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
