import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";

const Routs = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
  </Routes>
);

export default Routs;
