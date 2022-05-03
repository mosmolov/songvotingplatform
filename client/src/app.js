import React from "react";
import AdminPanel from "./components/admin";
import VotingCard from "./components/votingcard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
          <Route path="/" element={<VotingCard />} />
          <Route path="/admin/*" element={<AdminPanel />}/>
        </Routes>
      </Router>
        
      
    </div>
  );
}

export default App;
