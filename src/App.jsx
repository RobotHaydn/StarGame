import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Welcome } from "./views/Welcome";
import { Base } from "./views/Base";
import { Gig } from "./views/Gig";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/base" element={<Base />} />
        <Route path="/gig" element={<Gig />} />
      </Routes>
    </Router>
  );
}

export default App;
