import React, { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";
import { toast } from "react-toastify";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generalContext = useContext(GeneralContext);

  // ✅ Tracks whether BUY actually succeeded
  const buySucceededRef = useRef(false);

  // ✅ Reset when window opens
  useEffect(() => {
    buySucceededRef.current = false;
  }, []);

  const handleBuyClick = async () => {
    if (isSubmitting) return;

    const qty = Number(stockQuantity);
    const price = Number(stockPrice);

    // 🔒 UI validation
    if (!uid || qty <= 0) {
      toast.error("Quantity must be greater than 0", {
        toastId: "buy-qty-error",
      });
      return;
    }

    if (price <= 0) {
      toast.error("Price must be greater than 0", {
        toastId: "buy-price-error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await axios.post("/newOrder", {
        name: uid,
        qty,
        price,
        mode: "BUY",
      });

      // ✅ SUCCESS PATH
      if (res.data?.success) {
        buySucceededRef.current = true;

        toast.success(
          res.data.message || "BUY order executed successfully",
          { toastId: `buy-success-${uid}` }
        );

        await generalContext.fetchHoldings();
        await generalContext.fetchPositions();
        await generalContext.fetchFunds();


        setIsSubmitting(false);
        generalContext.closeBuyWindow();
        return;
      }

      // ❌ Backend-controlled failure
      if (!buySucceededRef.current) {
        toast.error(res.data?.message || "Buy failed", {
          toastId: `buy-failed-${uid}`,
        });
      }

      setIsSubmitting(false);
      return;

    } catch (err) {
      // ❌ Network / server error
      if (!buySucceededRef.current) {
        toast.error(
          err.response?.data?.message || "Buy failed",
          { toastId: `buy-error-${uid}` }
        );
      }
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              min="1"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(Number(e.target.value))}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              step="0.05"
              min="0.05"
              value={stockPrice}
              onChange={(e) => setStockPrice(Number(e.target.value))}
            />
          </fieldset>

          {stockPrice <= 0 && (
            <small className="error-text">Enter valid price</small>
          )}
        </div>
      </div>

      <div className="buttons">
        <span> ₹140.65</span>
        <div>
          <button
            className="btn btn-blue"
            onClick={handleBuyClick}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Placing..." : "Buy"}
          </button>

          <Link className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
