import { Routes as R, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";

const Routes = () => (
  <R>
    <Route path="/" element={<Dashboard />} />
  </R>
);

export default Routes;
