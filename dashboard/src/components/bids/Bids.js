import React, { useState } from "react";
import "./bids.css";
import IpoList from "./IpoList";

const Bids = () => {
  const [activeTab, setActiveTab] = useState("ipo");

  return (
    <div className="bids-container">
      <h1 className="bids-title">Bids</h1>

      {/* Tabs */}
      <div className="bids-tabs">
        {["ipo", "govt", "auctions", "corporate", "sse"].map((tab) => (
          <button
            key={tab}
            className={`bids-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bids-content">
        {activeTab === "ipo" && <IpoList />}

        {activeTab !== "ipo" && (
          <div className="empty-state">
            <p>No data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bids;
