import "./App.css";
import { parse_demons } from './demon_utils.js';
import { DemonTable } from './DemonTable.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  let demons = parse_demons();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DemonTable demons={demons} />} />
      </Routes>
    </Router>
  );
}

export default App;