import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProblemsPage from "../pages/ProblemsPage";
import ProblemDetail from "../pages/ProblemDetail";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/problems" element={<ProblemsPage />} /> {/* Fixed route */}
      <Route path="/problems/:id" element={<ProblemDetail />} />
    </Routes>
  );
};

export default AllRoutes;
