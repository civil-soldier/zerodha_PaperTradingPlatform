import React, {
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

import GeneralContext from "./GeneralContext";
import "./SellActionWindow.css";
import { toast } from "react-toastify";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { fetchHoldings, fetchPositions, closeSellWindow , fetchFunds} =
    useContext(GeneralContext);

  // ✅ Tracks whether SELL actually succeeded
  const sellSucceededRef = useRef(false);

  // ✅ Reset on open
  useEffect(() => {
    sellSucceededRef.current = false;
  }, []);

  const handleSellClick = async () => {
    if (isSubmitting) return;

    const qty = Number(stockQuantity);
    const price = Number(stockPrice);

    // 🔒 UI validation
    if (!uid || qty <= 0) {
      toast.error("Quantity must be greater than 0", {
        toastId: "sell-qty-error",
      });
      return;
    }

    if (price <= 0) {
      toast.error("Price must be greater than 0", {
        toastId: "sell-price-error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await axios.post(
        "/newOrder",
        {
          name: uid,
          qty,
          price,
          mode: "SELL",
        }
      );

      // ✅ SUCCESS PATH
      if (res.data?.success) {
        sellSucceededRef.current = true;

        toast.success(
          res.data.message || "SELL order executed successfully",
          { toastId: `sell-success-${uid}` }
        );

        await fetchHoldings();
        await fetchPositions();
        await fetchFunds();

        setIsSubmitting(false);
        closeSellWindow();
        return;
      }

      // ❌ Backend-controlled failure
      if (!sellSucceededRef.current) {
        toast.error(res.data?.message || "Sell failed", {
          toastId: `sell-failed-${uid}`,
        });
      }

      setIsSubmitting(false);
      return;

    } catch (err) {
      // ❌ Network / server error
      if (!sellSucceededRef.current) {
        toast.error(
          err.response?.data?.message || "Sell failed",
          { toastId: `sell-error-${uid}` }
        );
      }
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    closeSellWindow();
  };

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              min="1"
              value={stockQuantity}
              onChange={(e) =>
                setStockQuantity(Number(e.target.value))
              }
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              step="0.05"
              min="0.05"
              value={stockPrice}
              onChange={(e) =>
                setStockPrice(Number(e.target.value))
              }
            />
          </fieldset>

          {stockPrice <= 0 && (
            <small className="error-text">
              Enter valid price
            </small>
          )}
        </div>
      </div>

      <div className="buttons">
        <span> ₹140.65</span>
        <div>
          <button
            className="btn btn-orange"
            onClick={handleSellClick}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Placing..." : "Sell"}
          </button>

          <Link className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
