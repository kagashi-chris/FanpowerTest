import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Scoreboard from "./components/Scoreboard";
import FanpowerBowling from "./components/FanpowerBowling";

export const AppRoutes = () => {
  return (
    <div>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<FanpowerBowling />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
