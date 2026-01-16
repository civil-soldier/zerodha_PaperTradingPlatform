require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const authMiddleware = require("./middlewares/authMiddleware");
const uploadMiddleware = require("./middlewares/uploadMiddleware");
const signupStepMiddleware = require("./middlewares/signupStepMiddleware");
const cron = require("node-cron");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { FundsModel } = require("./model/FundsModel");
const { livePrices } = require("./utils/livePrices");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const cleanupExpiredOtps = require("./utils/otpCleanup");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://zerodha-paper-trading-platform.vercel.app",
];

app.use(cors({
  origin: true,        // allow all origins dynamically
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", require("./routes/user"));

cron.schedule("*/5 * * * *", cleanupExpiredOtps, {
  scheduled: true,
  timezone: "Asia/Kolkata",
});

// app.get('/addHoldings' , async(req,res)=>{
//     let tempHoldings =[
//   {
//     name: "BHARTIARTL",
//     qty: 2,
//     avg: 538.05,
//     price: 541.15,
//     net: "+0.58%",
//     day: "+2.99%",
//   },
//   {
//     name: "HDFCBANK",
//     qty: 2,
//     avg: 1383.4,
//     price: 1522.35,
//     net: "+10.04%",
//     day: "+0.11%",
//   },
//   {
//     name: "HINDUNILVR",
//     qty: 1,
//     avg: 2335.85,
//     price: 2417.4,
//     net: "+3.49%",
//     day: "+0.21%",
//   },
//   {
//     name: "INFY",
//     qty: 1,
//     avg: 1350.5,
//     price: 1555.45,
//     net: "+15.18%",
//     day: "-1.60%",
//     isLoss: true,
//   },
//   {
//     name: "ITC",
//     qty: 5,
//     avg: 202.0,
//     price: 207.9,
//     net: "+2.92%",
//     day: "+0.80%",
//   },
//   {
//     name: "KPITTECH",
//     qty: 5,
//     avg: 250.3,
//     price: 266.45,
//     net: "+6.45%",
//     day: "+3.54%",
//   },
//   {
//     name: "M&M",
//     qty: 2,
//     avg: 809.9,
//     price: 779.8,
//     net: "-3.72%",
//     day: "-0.01%",
//     isLoss: true,
//   },
//   {
//     name: "RELIANCE",
//     qty: 1,
//     avg: 2193.7,
//     price: 2112.4,
//     net: "-3.71%",
//     day: "+1.44%",
//   },
//   {
//     name: "SBIN",
//     qty: 4,
//     avg: 324.35,
//     price: 430.2,
//     net: "+32.63%",
//     day: "-0.34%",
//     isLoss: true,
//   },
//   {
//     name: "SGBMAY29",
//     qty: 2,
//     avg: 4727.0,
//     price: 4719.0,
//     net: "-0.17%",
//     day: "+0.15%",
//   },
//   {
//     name: "TATAPOWER",
//     qty: 5,
//     avg: 104.2,
//     price: 124.15,
//     net: "+19.15%",
//     day: "-0.24%",
//     isLoss: true,
//   },
//   {
//     name: "TCS",
//     qty: 1,
//     avg: 3041.7,
//     price: 3194.8,
//     net: "+5.03%",
//     day: "-0.25%",
//     isLoss: true,
//   },
//   {
//     name: "WIPRO",
//     qty: 4,
//     avg: 489.3,
//     price: 577.75,
//     net: "+18.08%",
//     day: "+0.32%",
//   },
// ];

// tempHoldings.forEach((item)=>{
//     let newHolding = new HoldingsModel({
//         name: item.name,
//         qty: item.qty,
//         avg: item.avg,
//         price: item.price,
//         net: item.net,
//         day: item.day,
//     });

//     newHolding.save();
// });
// res.send("Done!");
// });

// app.get("/addPositions", async (req , res) => {
//     let tempPositions = [
//         {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
//     ];

//     tempPositions.forEach((item)=>{
//     let newPosition = new PositionsModel({
//         product: item.product,
//         name: item.name,
//         qty:  item.qty,
//         avg:  item.avg,
//         price:item.price,
//         net:  item.net,
//         day:  item.day,
//         isLoss: item.isLoss,
//     });
//     newPosition.save();
// });
// res.send("Done!");
// })

app.get("/allHoldings", authMiddleware, async (req, res) => {
  const userId = req.user._id;
  let holdings = await HoldingsModel.find({ userId });
  res.json(holdings);
});

app.get("/allPositions", authMiddleware, async (req, res) => {
  const userId = req.user._id;
  let positions = await PositionsModel.find({ userId });
  res.json(positions);
});

app.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome", user: req.user });
});

app.post("/newOrder", authMiddleware, async (req, res) => {
  try {
    let { name, qty, price, mode } = req.body;

    // ---------- HARD VALIDATION ----------
    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid stock name",
      });
    }

    name = name.trim().toUpperCase();

    if (!qty || qty <= 0 || !price || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity or price",
      });
    }

    if (!["BUY", "SELL"].includes(mode)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order mode",
      });
    }

    // ================== 🔥 FUNDS FETCH (PASTE HERE) 🔥 ==================
    const equityFunds = await FundsModel.findOne({
      userId: req.user._id,
      type: "EQUITY",
    });

    if (!equityFunds) {
      return res.status(500).json({
        success: false,
        message: "Funds not initialized",
      });
    }
    // ===================================================================

    // ---------- HOLDINGS ----------
    const userId = req.user._id;
    let holding = await HoldingsModel.findOne({ userId, name });

    // ================== BUY ==================
    if (mode === "BUY") {
      const buyAmount = qty * price;

      // 🔥 FUNDS CHECK
      if (equityFunds.availableCash < buyAmount) {
        return res.status(400).json({
          success: false,
          message: "Insufficient funds",
        });
      }

      // 🔥 UPDATE FUNDS
      equityFunds.availableCash -= buyAmount;
      equityFunds.usedMargin += buyAmount;
      equityFunds.availableMargin =
        equityFunds.openingBalance - equityFunds.usedMargin;
      await equityFunds.save();

      // 🔹 UPDATE HOLDINGS
      if (holding) {
        const totalCost = holding.avg * holding.qty + buyAmount;
        holding.qty += qty;
        holding.avg = totalCost / holding.qty;
        holding.price = price;
        await holding.save();
      } else {
        await HoldingsModel.create({
          userId,
          name,
          qty,
          avg: price,
          price,
          net: "0%",
          day: "0%",
        });
      }
    }

    // ================== SELL ==================
    if (mode === "SELL") {
      if (!holding) {
        return res.status(400).json({
          success: false,
          message: "Stock not in holdings",
        });
      }

      if (qty > holding.qty) {
        return res.status(400).json({
          success: false,
          message: "Insufficient quantity",
        });
      }

      const sellAmount = qty * price;

      // 🔥 UPDATE FUNDS
      equityFunds.availableCash += sellAmount;
      equityFunds.usedMargin -= sellAmount;
      if (equityFunds.usedMargin < 0) equityFunds.usedMargin = 0;

      equityFunds.availableMargin =
        equityFunds.openingBalance - equityFunds.usedMargin;
      await equityFunds.save();

      // 🔹 UPDATE HOLDINGS
      holding.qty -= qty;
      holding.price = price;

      if (holding.qty === 0) {
        await HoldingsModel.deleteOne({ userId, name });
      } else {
        await holding.save();
      }
    }

    // ---------- POSITIONS ----------
    let position = await PositionsModel.findOne({ userId, name });

    if (mode === "BUY") {
      if (position) {
        const totalQty = position.qty + qty;
        position.avg = (position.avg * position.qty + price * qty) / totalQty;
        position.qty = totalQty;
        position.price = price;
        await position.save();
      } else {
        await PositionsModel.create({
          userId,
          product: "CNC",
          name,
          qty,
          avg: price,
          price,
          net: "0%",
          day: "0%",
        });
      }
    }

    if (mode === "SELL" && position) {
      position.qty -= qty;
      position.price = price;

      if (position.qty <= 0) {
        await PositionsModel.deleteOne({ userId, name });
      } else {
        await position.save();
      }
    }

    // ---------- ORDERS ----------
    const randomStatus = Math.random() > 0.9 ? "REJECTED" : "COMPLETE";

    const randomPrice = price + (Math.random() * 2 - 1); // ±1 fluctuation

    await OrdersModel.create({
      userId: req.user._id,
      name,
      qty,
      price,
      mode,
      status: "COMPLETE", // future-ready
    });

    return res.status(200).json({
      success: true,
      message: `${mode} order executed successfully`,
    });
  } catch (err) {
    console.error("Order error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

app.post("/checkHolding", authMiddleware, async (req, res) => {
  let { name, qty } = req.body;
  name = name.trim().toUpperCase();

  const userId = req.user._id;
  let holding = await HoldingsModel.findOne({ userId, name });

  if (!holding) {
    return res
      .status(404)
      .json({ ok: false, message: "Stock not in holdings" });
  }

  if (holding.qty < qty) {
    return res.status(400).json({
      ok: false,
      message: "Insufficient quantity to sell",
    });
  }

  res.json({ ok: true });
});

// app.get("/initFunds", async (req, res) => {
//   await FundsModel.deleteMany({});

//   await FundsModel.create([
//     {
//       type: "EQUITY",
//       openingBalance: 50000,
//       availableCash: 50000,
//       usedMargin: 0,
//       availableMargin: 50000,
//     },
//     {
//       type: "COMMODITY",
//       openingBalance: 0,
//       availableCash: 0,
//       usedMargin: 0,
//       availableMargin: 0,
//     },
//   ]);

//   res.send("Funds initialized successfully");
// });

app.get("/funds", authMiddleware, async (req, res) => {
  const funds = await FundsModel.find({ userId: req.user._id });
  res.json(funds);
});

app.post("/funds/add", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    const equityFunds = await FundsModel.findOne({
      userId: req.user._id,
      type: "EQUITY",
    });

    if (!equityFunds) {
      return res.status(500).json({
        success: false,
        message: "Equity funds not initialized",
      });
    }

    equityFunds.availableCash += amount;
    equityFunds.availableMargin += amount;

    await equityFunds.save();

    res.json({
      success: true,
      message: `₹${amount} added successfully`,
    });
  } catch (err) {
    console.error("Add funds error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// WITHDRAW FUNDS
app.post("/funds/withdraw", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    const equityFunds = await FundsModel.findOne(
      { userId: req.user._id, type: "EQUITY" },
      {
        $setOnInsert: {
          userId: req.user._id,
          type: "EQUITY",
          openingBalance: 50000,
          availableCash: 50000,
          usedMargin: 0,
          availableMargin: 50000,
        },
      },
      { upsert: true, new: true }
    );

    if (!equityFunds) {
      return res.status(500).json({
        success: false,
        message: "Funds not initialized",
      });
    }

    if (amount > equityFunds.availableCash) {
      return res.status(400).json({
        success: false,
        message: "Insufficient available cash",
      });
    }

    equityFunds.availableCash -= amount;
    equityFunds.availableMargin -= amount;

    await equityFunds.save();

    res.json({
      success: true,
      message: `₹${amount} withdrawn successfully`,
    });
  } catch (err) {
    console.error("Withdraw funds error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// ================== GET ALL ORDERS ==================
app.get("/orders", authMiddleware, async (req, res) => {
  try {
    const orders = await OrdersModel.find({ userId: req.user._id })
      .sort({ createdAt: -1 }) // 🔥 latest first
      .limit(25); // 🔥 last 26 orders only

    res.json(orders);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
});

app.get("/live-prices", (req, res) => {
  res.json(livePrices);
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ MongoDB connected");
    require("./cron"); // Initialize cron jobs
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err);
    process.exit(1);
  });
