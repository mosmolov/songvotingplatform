import React, { useEffect } from "react";
import AdminPanel from "./components/admin";
import HomePage from "./components/homepage";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from "react-notifications"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  useEffect(() => {
    // document.body.style.overflow = "hidden";
  }, []);
  return (

    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={ <HomePage />} />
          <Route path="/admin/*" element={ <AdminPanel />} />

        </Routes>
        <NotificationContainer />
      </Router>


    </div>
  );
}

export default App;
