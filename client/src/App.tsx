import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import AgentConfiguration from "../src/pages/AgentConfiguration";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agent-configuration" element={<AgentConfiguration />} />
      </Routes>
    </Router>
  );
}
export default App;
