import React, { useState } from "react";

function Brokerage() {
  const [activeTab, setActiveTab] = useState("equity");

  return (
    <div className="pricing-container">
      {/* Tabs */}
      <div className="tabs">
        <span
          className={activeTab === "equity" ? "active" : ""}
          onClick={() => setActiveTab("equity")}
          style={{ textAlign: "center", fontSize: "25px" }}
        >
          Equity
        </span>
        <span
          className={activeTab === "currency" ? "active" : ""}
          onClick={() => setActiveTab("currency")}
          style={{ textAlign: "center", fontSize: "25px" }}
        >
          Currency
        </span>
        <span
          className={activeTab === "commodity" ? "active" : ""}
          onClick={() => setActiveTab("commodity")}
          style={{ textAlign: "center", fontSize: "25px" }}
        >
          Commodity
        </span>
      </div>

      {/* Equity Table */}
      {activeTab === "equity" && (
        <table className="pricing-table">
          <thead>
            <tr>
              <th></th>
              <th>Equity delivery</th>
              <th>Equity intraday</th>
              <th>F&O – Futures</th>
              <th>F&O – Options</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Brokerage</td>
              <td>Zero Brokerage</td>
              <td>0.03% or ₹20</td>
              <td>0.03% or ₹20</td>
              <td>₹20 / order</td>
            </tr>

            <tr>
              <td>STT / CTT</td>
              <td>0.1% on buy & sell</td>
              <td>0.025% on sell</td>
              <td>0.02% on sell</td>
              <td>0.1% on sell</td>
            </tr>

            <tr>
              <td>Transaction charges</td>
              <td>NSE: 0.00297%</td>
              <td>NSE: 0.00297%</td>
              <td>NSE: 0.00173%</td>
              <td>NSE: 0.03503%</td>
            </tr>

            <tr>
              <td>GST</td>
              <td>18% on (brokerage + SEBI charges + transaction charges)</td>
              <td>18% on (brokerage + SEBI charges + transaction charges)</td>
              <td>18% on (brokerage + SEBI charges + transaction charges)</td>
              <td>18% on (brokerage + SEBI charges + transaction charges)</td>
            </tr>

            <tr>
              <td>SEBI charges</td>
              <td>₹10 / crore</td>
              <td>₹10 / crore</td>
              <td>₹10 / crore</td>
              <td>₹10 / crore</td>
            </tr>

            <tr>
              <td>Stamp charges</td>
              <td>0.015% or ₹1500 / crore on buy side</td>
              <td>0.003% or ₹300 / crore on buy side</td>
              <td>0.002% or ₹200 / crore on buy side</td>
              <td>0.003% or ₹300 / crore on buy side</td>
            </tr>
          </tbody>
        </table>
      )}

      {/* Currency */}
      {activeTab === "currency" && (
        <table className="pricing-table">
          <thead>
            <tr>
              <th></th>
              <th>Currency Futures</th>
              <th>Currency Options</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Brokerage</td>
              <td>0.03% or ₹ 20/executed order whichever is lower</td>
              <td>₹ 20/executed order</td>
            </tr>

            <tr>
              <td>STT / CTT</td>
              <td>No STT</td>
              <td>No STT</td>
            </tr>

            <tr>
              <td>Transaction charges</td>
              <td>
                NSE: 0.00035%<br></br>
                BSE: 0.00045%
              </td>
              <td>
                NSE: 0.0311%<br></br>
                BSE: 0.001%
              </td>
            </tr>

            <tr>
              <td>GST</td>
              <td>18% on (brokerage + SEBI charges + transaction charges)</td>
              <td>18% on (brokerage + SEBI charges + transaction charges)</td>
            </tr>

            <tr>
              <td>SEBI charges</td>
              <td>₹10 / crore</td>
              <td>₹10 / crore</td>
            </tr>

            <tr>
              <td>Stamp charges</td>
              <td>0.0001% or ₹10 / crore on buy side</td>
              <td>0.0001% or ₹10 / crore on buy side</td>
            </tr>
          </tbody>
        </table>
      )}

      {/* Commodity */}
      {activeTab === "commodity" && (
        <table className="pricing-table">
          <thead>
            <tr>
              <th></th>
              <th>Commodity Futures</th>
              <th>Commodity Options</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Brokerage</td>
              <td>0.03% or Rs. 20/executed order whichever is lower</td>
              <td>₹ 20/executed order</td>
            </tr>

            <tr>
              <td>STT / CTT</td>
              <td>0.01% on sell side (Non-Agri)</td>
              <td>0.05% on sell side</td>
            </tr>

            <tr>
              <td>Transaction charges</td>
              <td>MCX: 0.0021% NSE: 0.0001%</td>
              <td>MCX: 0.0418% NSE: 0.001%</td>
            </tr>

            <tr>
              <td>GST</td>
              <td>18% on (brokerage + SEBI charges + transaction charges)</td>
              <td>18% on (brokerage + SEBI charges + transaction charges)</td>
            </tr>

            <tr>
              <td>SEBI charges</td>
              <td>
                <b>Agri:</b>
                <br></br>
                ₹1 / crore <br></br>
                <b>Non-agri:</b>
                <br></br>
                ₹10 / crore
              </td>
              <td>₹10 / crore</td>
            </tr>

            <tr>
              <td>Stamp charges</td>
              <td>0.002% or ₹200 / crore on buy side</td>
              <td>0.003% or ₹300 / crore on buy side</td>
            </tr>
          </tbody>
        </table>
      )}
      <div className="container hero-section">
        <div className="row  text-center d-flex flex-column align-items-center">
          <p style={{ fontWeight: 100, fontSize: "22px" }}>
            <button
              type="button"
              className="hero-section"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                fontWeight: 500,
                fontSize: "20px",
                color: "#387ed1",
                cursor: "pointer",
              }}
            >
              Calculate your costs upfront
            </button>
            using our brokerage calculator.
          </p>
        </div>
      </div>

      {/* ===== ACCOUNT OPENING ===== */}
      <h3 className="section-title" style={{ fontWeight: "400px" }}>
        Charges for account opening
      </h3>

      <table className="pricing-table">
        <thead>
          <tr>
            <th>Type of account</th>
            <th>Charges</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Online account</td>
            <td>
              <span className="free">FREE</span>
            </td>
          </tr>
          <tr>
            <td>Offline account</td>
            <td>
              <span className="free">FREE</span>
            </td>
          </tr>
          <tr>
            <td>NRI account (offline only)</td>
            <td>₹500</td>
          </tr>
          <tr>
            <td>Partnership / LLP / HUF / Corporate</td>
            <td>₹500</td>
          </tr>
        </tbody>
      </table>

      {/* ===== DEMAT AMC ===== */}
      <h3 className="section-title">Demat AMC (Annual Maintenance Charge)</h3>

      <table className="pricing-table mb-3">
        <thead>
          <tr>
            <th>Value of holdings</th>
            <th>AMC</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Up to ₹4 lakh</td>
            <td>
              <span className="free">FREE*</span>
            </td>
          </tr>
          <tr>
            <td>₹4 lakh – ₹10 lakh</td>
            <td>₹100 per year, charged quarterly*</td>
          </tr>
          <tr>
            <td>Above ₹10 lakh</td>
            <td>₹300 per year, charged quarterly</td>
          </tr>
        </tbody>
      </table>
      <div className="container hero-section ">
        <div>
          <p style={{ fontSize: "13px", marginLeft: "-11px" }}>
            * Lower AMC is applicable only if the account qualifies as a Basic
            Services Demat Account (BSDA). BSDA account holders cannot hold more
            than one demat account. To learn more about BSDA,{" "}
            <a href="#">click here.</a>
          </p>
        </div>
      </div>

      {/* ===== VALUE ADDED SERVICES ===== */}
      <h3 className="section-title">
        Charges for optional value added services
      </h3>

      <table className="pricing-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Billing frequency</th>
            <th>Charges</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tickertape</td>
            <td>Monthly / Annual</td>
            <td>Free | Pro: ₹249 / ₹2399</td>
          </tr>
          <tr>
            <td>Smallcase</td>
            <td>Per transaction</td>
            <td>Buy & Invest More: ₹100 | SIP: ₹10</td>
          </tr>
          <tr>
            <td>Kite Connect</td>
            <td>Monthly</td>
            <td>Connect: ₹500 | Personal: Free</td>
          </tr>
        </tbody>
      </table>

      {/* ================= CHARGES EXPLAINED ================= */}

      <h2 className="section-title">Charges explained</h2>
      <div className="container hero-section ">
        <div className="charges-explained mb-2">
          {/* LEFT COLUMN */}
          <div className="charge-col">
            <h4>Securities/Commodities transaction tax</h4>
            <p>
              Tax by the government when transacting on the exchanges. Charged
              as above on both buy and sell sides when trading equity delivery.
              Charged only on selling side when trading intraday or on F&O.
            </p>
            <p>
              When trading at Zerodha, STT/CTT can be a lot more than the
              brokerage we charge. Important to keep a tab.
            </p>

            <h4>Transaction/Turnover Charges</h4>
            <p>
              Charged by exchanges (NSE, BSE, MCX) on the value of your
              transactions.
            </p>
            <p>
              BSE has revised transaction charges in XC, XD, XT, Z and ZP groups
              to ₹10,000 per crore w.e.f 01.01.2016. (XC and XD groups have been
              merged into a new group X w.e.f 01.12.2017)
            </p>
            <p>
              BSE has revised transaction charges in SS and ST groups to
              ₹1,00,000 per crore of gross turnover.
            </p>
            <p>
              BSE has revised transaction charges for group A, B and other non
              exclusive scrips (non-exclusive scrips from group E, F, FC, G, GC,
              W, T) at ₹375 per crore of turnover on flat rate basis w.e.f.
              December 1, 2022.
            </p>
            <p>
              BSE has revised transaction charges for group A, B and other non
              exclusive scrips (non-exclusive scrips from group E, F, FC, G, GC,
              W, T) at ₹375 per crore of turnover on flat rate basis w.e.f.
              December 1, 2022.
            </p>

            <h4>Call & trade</h4>
            <p>
              Additional charges of ₹50 per order for orders placed through a
              dealer at Zerodha including auto square off orders.
            </p>

            <h4>Stamp charges</h4>
            <p>
              Stamp charges by the Government of India as per the Indian Stamp
              Act of 1899 for transacting in instruments on the stock exchanges
              and depositories.
            </p>

            <h4>NRI brokerage charges</h4>
            <ul className="bullet-list">
              <li>
                For a non-PIS account, 0.5% or ₹50 per executed order for equity
                and F&O (whichever is lower).
              </li>
              <li>
                For a PIS account, 0.5% or ₹200 per executed order for equity
                (whichever is lower).
              </li>
              <li>
                ₹500 + GST as yearly account maintenance charges (AMC) charges.
              </li>
            </ul>

            <h4>Account with debit balance</h4>
            <p>
              If the account is in debit balance, any order placed will be
              charged ₹40 per executed order instead of ₹20 per executed order.
            </p>

            <h4>Charges for Investor's Protection Fund Trust (IPFT) by NSE</h4>

            <ul className="bullet-list">
              <li>
                Equity and Futures - ₹10 per crore + GST of the traded value.
              </li>
              <li>
                Options - ₹50 per crore + GST traded value (premium value).
              </li>
              <li>
                Currency - ₹0.05 per lakh + GST of turnover for Futures and ₹2
                per lakh + GST of premium for Options.
              </li>
            </ul>

            <h4>Margin Trading Facility (MTF)</h4>

            <ul className="bullet-list">
              <li>
                MTF Interest: 0.04% per day (₹40 per lakh) on the funded amount.
                Interest is applicable from T+1 day until the MTF stocks are
                sold.
              </li>
              <li>
                MTF Brokerage: 0.3% or ₹20 per executed order, whichever is
                lower.
              </li>
              <li>
                MTF pledge charge: ₹15 + GST per pledge and unpledge request per
                ISIN.
              </li>
            </ul>
          </div>

          {/* RIGHT COLUMN */}
          <div className="charge-col">
            <h4>GST</h4>
            <p>
              Tax levied by the government on the services rendered. 18% of
              (brokerage + SEBI charges + transaction charges).
            </p>

            <h4>SEBI Charges</h4>
            <p>
              Charged at ₹10 per crore + GST by Securities and Exchange Board of
              India for regulating the markets.
            </p>

            <h4>DP (Depository participant) charges</h4>
            <p>
              ₹15.34 per scrip (₹3.5 CDSL fee + ₹9.5 Zerodha fee + ₹2.34 GST) is
              charged on the trading account ledger when stocks are sold,
              irrespective of quantity.
            </p>
            <p>
              Female demat account holders (as first holder) will enjoy a
              discount of ₹0.25 per transaction on the CDSL fee.
            </p>
            <p>
              Debit transactions of mutual funds & bonds get an additional
              discount of ₹0.25 on the CDSL fee.
            </p>

            <h4>Pledging charges</h4>
            <p>₹30 + GST per pledge request per ISIN.</p>

            <h4>AMC (Account maintenance charges)</h4>
            <p>
              For BSDA demat account: Zero charges if the holding value is less
              than ₹4,00,000. To learn more about BSDA,{" "}
              <a href="#">Click here</a>
            </p>
            <p>
              For non-BSDA demat accounts: ₹300/year + 18% GST charged quarterly
              (90 days). To learn more about AMC, <a href="#">Click here</a>
            </p>

            <h4>Corporate action order charges</h4>
            <p>
              ₹20 plus GST will be charged for OFS / buyback / takeover /
              delisting orders placed through Console.
            </p>

            <h4>Off-market transfer charges</h4>
            <p>₹25 per transaction.</p>

            <h4>Physical CMR request</h4>
            <p>
              First CMR request is free. ₹20 + ₹100 (courier charge) + 18% GST
              for subsequent requests.
            </p>

            <h4>Payment gateway charges</h4>
            <p>₹9 + GST (Not levied on transfers done via UPI)</p>

            <h4>Delayed Payment Charges</h4>
            <p>
              Interest is levied at 18% a year or 0.05% per day on the debit
              balance in your trading account. <a href="#">Learn more.</a>
            </p>

            <h4>Trading using 3-in-1 account with block functionality</h4>

            <ul className="bullet-list">
              <li>
                <b>Delivery & MTF Brokerage:</b> 0.5% per executed order.
              </li>
              <li>
                <b>Intraday Brokerage:</b> 0.05% per executed order.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <h4 style={{ fontSize: "16px", marginBottom: "15px" }}>Disclaimer</h4>
      <p style={{ fontSize: "12px", lineheight: "1.8" }}>
        For Delivery based trades, a minimum of ₹0.01 will be charged per
        contract note. Clients who opt to receive physical contract notes will
        be charged ₹20 per contract note plus courier charges. Brokerage will
        not exceed the rates specified by SEBI and the exchanges. All statutory
        and regulatory charges will be levied at actuals. Brokerage is also
        charged on expired, exercised, and assigned options contracts. Free
        investments are available only for our retail individual clients.
        Companies, Partnerships, Trusts, and HUFs need to pay 0.1% or ₹20
        (whichever is less) as delivery brokerage. A brokerage of 0.25% of the
        contract value will be charged for contracts where physical delivery
        happens. For netted off positions in physically settled contracts, a
        brokerage of 0.1% will be charged.
      </p>
    </div>
  );
}

export default Brokerage;
