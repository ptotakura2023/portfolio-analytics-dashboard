import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EventsPage from "./pages/EventsPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/events">Events Analytics</Link> |{" "}
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h2>Welcome to RTD Portfolio Analytics</h2>} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
