import React, { useContext, useMemo , useState , useEffect} from "react";
import GeneralContext from "./GeneralContext";
import MarketLineChart from "./MarketLineChart";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { LANDING_URL } from "../config";

const Summary = () => {
  // ✅ FIX: default to empty array
  const { holdings = [] , user } = useContext(GeneralContext);

  const { totalInvestment, currentValue, totalPnL, pnlPercent } =
    useMemo(() => {
      const investment = holdings.reduce((sum, h) => sum + h.avg * h.qty, 0);
      const value = holdings.reduce((sum, h) => sum + h.price * h.qty, 0);
      const pnl = value - investment;
      const percent = investment > 0 ? (pnl / investment) * 100 : 0;

      return {
        totalInvestment: investment,
        currentValue: value,
        totalPnL: pnl,
        pnlPercent: percent,
      };
    }, [holdings]);

  const OPENING_BALANCE = 3740;
  const marginUsed = totalInvestment;
  const marginAvailable = OPENING_BALANCE - marginUsed;

  return (
    <>
      <div className="data-card">
        <div className="username">
          <h6>Hi, {user?.name || "User"}!</h6>
          <hr className="divider" />
        </div>

        {/* Equity */}
        <div className="section">
          <span>
            <p>Equity</p>
          </span>

          <div className="data-card equity">
            <div className="data">
              <div className="first">
                <h3>{(marginAvailable / 1000).toFixed(2)}k</h3>
                <p>Margin available</p>
              </div>
              <hr />
              <div className="second">
                <p>
                  Margins used <span>{marginUsed.toFixed(0)}</span>
                </p>
                <p>
                  Opening balance{" "}
                  <span>{(OPENING_BALANCE / 1000).toFixed(2)}k</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Holdings */}
        <div className="section">
          <span>
            <p>Holdings ({holdings.length})</p>
          </span>

          <div className="data-card holdings">
            <div className="data">
              <div className="first">
                <h3 className={totalPnL >= 0 ? "profit" : "loss"}>
                  {(totalPnL / 1000).toFixed(2)}k{" "}
                  <small>
                    {pnlPercent >= 0 ? "+" : ""}
                    {pnlPercent.toFixed(2)}%
                  </small>
                </h3>
                <p>P&amp;L</p>
              </div>
              <hr />
              <div className="second">
                <p style={{ marginLeft: "20px" }}>
                  Current Value <span>{(currentValue / 1000).toFixed(2)}k</span>
                </p>
                <p style={{ marginLeft: "20px" }}>
                  Investment <span>{(totalInvestment / 1000).toFixed(2)}k</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* ===== Market Overview ===== */}
        <div className="section">

          <div className="chart">
            <MarketLineChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
