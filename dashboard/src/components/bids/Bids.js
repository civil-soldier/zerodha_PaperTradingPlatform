import React, { useState } from "react";
import "./bids.css";
import IpoList from "./IpoList";
import GovtSecuritiesList from "./GovtSecuritiesList";

const EmptyState = ({ title, subtitle }) => (
  <div className="empty-state">
    <p className="empty-title">{title}</p>
    {subtitle && <p className="empty-sub">{subtitle}</p>}
  </div>
);

const Bids = () => {
  const [activeTab, setActiveTab] = useState("ipo");

  return (
    <div className="data-card">
      <h1 className="bids-title">IPOs</h1>

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

      {/* Table / Content Card */}
      <div className="table-card">
        {activeTab === "ipo" && <IpoList />}
        {activeTab === "govt" && <GovtSecuritiesList />}

        {activeTab === "auctions" && (
          <EmptyState
            title="There are no stocks for auctions yet."
            subtitle="The auction market opens at 2:30 PM. Stocks eligible to be sold in the auction will be listed here."
          />
        )}

        {activeTab === "corporate" && (
          <EmptyState
            title="There are no open corporate actions right now."
          />
        )}

        {activeTab === "sse" && (
          <EmptyState
            title="No active Social Stock Exchange (SSE) issues."
            subtitle="SSE allows non-profits to raise funds for their causes."
          />
        )}
      </div>
    </div>
  );
};

export default Bids;
