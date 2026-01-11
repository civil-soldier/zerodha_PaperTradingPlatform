import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

import { toast } from "react-toastify";

import GeneralContext from "./GeneralContext";
import FundsTable from "./FundsTable";
import { FiClock } from "react-icons/fi";
import { FaTint } from "react-icons/fa";

const Funds = () => {
  const { funds, fetchFunds } = useContext(GeneralContext);

  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState("");

  // ✅ Safe DB extraction
  const equityFunds = funds.find((f) => f.type === "EQUITY") || {};
  const commodityFunds = funds.find((f) => f.type === "COMMODITY") || {};
  const hasCommodityAccount = commodityFunds?.openingBalance > 0;

  // 🔹 ADD FUNDS
  const handleAddFunds = async () => {
    if (!amount || amount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    try {
      const res = await axios.post("/funds/add", {
        amount: Number(amount),
      });

      if (res.data.success) {
        toast.success(res.data.message);
        await fetchFunds();
        setAmount("");
        setShowAddFunds(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Add funds failed");
    }
  };

  // 🔹 WITHDRAW FUNDS
  const handleWithdraw = async () => {
    if (!amount || amount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    if (amount > (equityFunds.availableCash || 0)) {
      toast.error("Insufficient available cash");
      return;
    }

    try {
      const res = await axios.post("/funds/withdraw", {
        amount: Number(amount),
      });

      if (res.data.success) {
        toast.success(res.data.message);
        await fetchFunds();
        setAmount("");
        setShowWithdraw(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Withdraw failed");
    }
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI</p>
        <button className="btn btn-green" onClick={() => setShowAddFunds(true)}>
          Add funds
        </button>
        <button className="btn btn-blue" onClick={() => setShowWithdraw(true)}>
          Withdraw
        </button>
      </div>

      {/* FUNDS TABLES */}
      <div className="row">
        <FundsTable
          title="Equity"
          data={equityFunds}
          icon={
            <FiClock size={20} style={{ color: "#fff", marginRight: "6px" }} />
          }
        />

        {hasCommodityAccount ? (
          <FundsTable
            title="Commodity"
            data={commodityFunds}
            icon={
              <FaTint size={20} style={{ color: "#fff", marginRight: "6px" }} />
            }
          />
        ) : (
          <div className="commodity disabled">
            <h3 style={{ color: "#fff" }}>
              <FaTint size={20} style={{ marginRight: "6px" }} />
              Commodity
            </h3>
            <p>You don’t have a commodity account</p>
            <Link className="btn btn-blue">Open Account</Link>
          </div>
        )}
      </div>

      {/* ADD FUNDS MODAL */}
      {showAddFunds && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Funds</h3>

            <input
              type="number"
              placeholder="Enter amount"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <div className="modal-actions">
              <button className="btn btn-green" onClick={handleAddFunds}>
                Add
              </button>
              <button
                className="btn btn-grey"
                onClick={() => {
                  setShowAddFunds(false);
                  setAmount("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WITHDRAW MODAL */}
      {showWithdraw && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Withdraw Funds</h3>

            <input
              type="number"
              placeholder="Enter amount"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <div className="modal-actions">
              <button className="btn btn-blue" onClick={handleWithdraw}>
                Withdraw
              </button>
              <button
                className="btn btn-grey"
                onClick={() => {
                  setShowWithdraw(false);
                  setAmount("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Funds;
