import React, { useState , useEffect } from "react";
import axios from "../api/axios";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  holdings: [],
  positions: [],
  fetchHoldings: () => {},
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
  openSellWindow: (uid) => {},
  closeSellWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);
  const [funds, setFunds] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  const handleOpenBuyWindow = (uid) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  const handleOpenSellWindow = (uid) => {
    setIsSellWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
  };

  // 🔥 PRODUCTION SAFE API CALLS

  const fetchHoldings = async () => {
    const res = await axios.get("/allHoldings");
    setHoldings(res.data);
  };

  const fetchPositions = async () => {
    const res = await axios.get("/allPositions");
    setPositions(res.data);
  };

  const fetchFunds = async () => {
    const res = await axios.get("/funds");
    setFunds(res.data);
  };

  const fetchOrders = async () => {
    const res = await axios.get("/orders");
    setOrders(res.data);
  };

  const fetchUser = async () => {
  try {
    const res = await axios.get("/user/me");
    setUser(res.data.user);
  } catch (err) {
    console.error("Fetch user failed");
    setUser(null);
  }
};

  useEffect(() => {
    fetchHoldings();
    fetchPositions();
    fetchFunds();
    fetchOrders();
    fetchUser();
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        user,
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
        fetchHoldings,
        fetchPositions,
        fetchFunds,
        fetchOrders,
        holdings,
        positions,
        funds,
        orders,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {isSellWindowOpen && <SellActionWindow uid={selectedStockUID} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
