import React from "react";
import { Route, Routes } from "react-router-dom";

import Bids from "./bids/Bids";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";



const Dashboard = () => {
  return (
    <div className="dashboard-container">
        <WatchList />
        <div className="content">
        <Routes>
          <Route index element={<Summary />} />
          <Route path="orders" element={<Orders />} />
          <Route path="holdings" element={<Holdings />} />
          <Route path="positions" element={<Positions />} />
          <Route path="funds" element={<Funds />} />
          <Route path="bids" element={<Bids />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;