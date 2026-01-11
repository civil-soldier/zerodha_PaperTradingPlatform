import React, { useEffect, useState } from "react";
import axios from "../api/axios";

import { Link, Outlet } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Orders fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading orders...</p>;
  }

  return (
    <div className="data-card orders-card">
      <h3 className="card-title">Orders</h3>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven’t placed any orders yet</p>
          <Link to="/" className="btn btn-blue">
            Get started
          </Link>
        </div>
      ) : (
        <>
          <div className="orders-header">
            <span>Instrument</span>
            <span>Qty</span>
            <span>Price</span>
            <span>Type</span>
            <span>Status</span>
            <span>Time</span>
          </div>

          {orders.map((order) => (
            <div key={order._id} className="orders-row">
              <span className="symbol">{order.name}</span>
              <span>{order.qty}</span>
              <span>₹{order.price}</span>
              <span
                className={order.mode === "BUY" ? "buy-text" : "sell-text"}
              >
                {order.mode}
              </span>
              <span className="order-status">{order.status}</span>
              <span className="time">
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </>
      )}

      {/* 🔥 REQUIRED FOR /orders/funds */}
      <Outlet />
    </div>
  );
};

export default Orders;
