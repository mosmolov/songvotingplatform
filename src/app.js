import React from "react";
import AdminPanel from "./components/admin";
import HomePage from "./components/homepage";
import VotingCard from "./components/votingcard";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/*" element={<AdminPanel />}/>
        </Routes>
      </Router>
        
      
    </div>
  );
}

export default App;
