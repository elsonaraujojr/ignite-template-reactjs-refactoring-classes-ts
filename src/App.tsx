import { BrowserRouter as Router } from "react-router-dom";
import "./mirage";
import Routs from "./routes";
import GlobalStyle from "./styles/global";

const App = () => (
  <>
    <GlobalStyle />
    <Router>
      <Routs />
    </Router>
  </>
);

export default App;
