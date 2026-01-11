import React, { useState, useContext, useEffect } from "react";
import axios from "../api/axios";


import GeneralContext from "./GeneralContext";

import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { watchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";

const WatchList = () => {
  const [livePrices, setLivePrices] = useState({});
  const [prevPrices, setPrevPrices] = useState({});
  const [search, setSearch] = useState("");



  // 🔁 Fetch live prices every 1.5s
  useEffect(() => {
  const fetchPrices = async () => {
    try {
      const res = await axios.get("/live-prices");

      setPrevPrices((prev) => {
        // keep previous snapshot
        return { ...livePrices };
      });

      setLivePrices(res.data);
    } catch (err) {
      console.error("Live prices error");
    }
  };

  fetchPrices();
  const interval = setInterval(fetchPrices, 1500);

  return () => clearInterval(interval);
}, []); // ✅ EMPTY dependency


  // Doughnut chart data (LIVE)
  const labels = watchlist.map((s) => s.name);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Price",
        data: watchlist.map(
          (stock) => livePrices[stock.name] ?? stock.price
        ),
        backgroundColor: [
          "rgba(0, 208, 198, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      {/* SEARCH */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search eg: infy, bse, nifty fut weekly, gold mcx"
          className="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="counts">{watchlist.length} / 50</span>
      </div>

      {/* LIST */}
      <ul className="list">
        {watchlist
  .filter((stock) =>
    stock.name.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((stock, index) => (

          <WatchListItem
            key={index}
            stock={stock}
            livePrice={livePrices[stock.name]}
            prevPrices={prevPrices}
          />
        ))}
      </ul>

      {/* CHART */}
      <div className="data-card chart">
        <DoughnutChart data={chartData} />
      </div>
    </div>
  );
};

export default WatchList;

/* ========================= ITEM ========================= */

const WatchListItem = ({ stock, livePrice, prevPrices }) => {
  const [showActions, setShowActions] = useState(false);

  const basePrice = stock.price;

// Current price (backend-driven)
const price = livePrice ?? basePrice;

// Previous price (fallback to basePrice, NOT price)
const prevPrice =
  prevPrices?.[stock.name] ?? basePrice;

// Difference
const diff = price - prevPrice;

// Percentage change
const percent =
  prevPrice > 0 ? ((diff / prevPrice) * 100).toFixed(2) : "0.00";

// Direction
const isDown = diff < 0;
const isUp = diff > 0;

  return (
    <li
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="item">
        <p className={isDown ? "down" : "up"}>{stock.name}</p>

        <div className="item-info">
          <span className={isDown ? "down" : "up"}>
            {percent}%
          </span>

          {isDown ? (
  <KeyboardArrowDown className="down" />
) : (
  <KeyboardArrowUp className="up" />
)}


<span className={isDown ? "down" : "up"}>
  {percent}%
</span>

          <span className={isDown ? "down" : "up"}>
            ₹{price.toFixed(2)}
          </span>
        </div>
      </div>

      {showActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

/* ========================= ACTIONS ========================= */

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  return (
    <span className="actions">
      <span>
        <Tooltip title="Buy (B)" arrow TransitionComponent={Grow}>
          <button
            className="buy"
            onClick={() => generalContext.openBuyWindow(uid)}
          >
            Buy
          </button>
        </Tooltip>

        <Tooltip title="Sell (S)" arrow TransitionComponent={Grow}>
          <button
            className="sell"
            onClick={() => generalContext.openSellWindow(uid)}
          >
            Sell
          </button>
        </Tooltip>

        <Tooltip title="Analytics (A)" arrow TransitionComponent={Grow}>
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>

        <Tooltip title="More" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
