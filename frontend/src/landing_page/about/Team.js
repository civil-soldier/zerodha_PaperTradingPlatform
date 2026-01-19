import React from "react";

function Team() {
  return (
    <div className="container hero-section">
      {/* Heading */}
      <div className="row mb-5 text-center d-flex flex-column align-items-center">
        <h1 className="mt-2" style={{ fontWeight: 500, fontSize: "25px" }}>
          People
        </h1>
      </div>

      {/* ------------------ 2 Column Section ------------------ */}
      <div
        className="row text-muted fs-6"
        style={{ lineHeight: "1.8", fontSize: "4em" }}
      >
        {/* LEFT COLUMN */}
        <div
          className="col-6"
          style={{ textAlign: "center", marginTop: "5px" }}
        >
          <img
            src="\media\images\Yash1.png"
            alt="Yash Kumar"
            style={{ width: "300px", borderRadius: "100%" , height: "300px"}}
          />
          <h3 style={{ marginTop: "10px", fontSize: "20px" }}>Yash Kumar</h3>
          <p>Founder & CEO</p>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-6" style={{ marginTop: "25px" }}>
          <p>
            Yash bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>

          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>

          <p>Playing basketball is his zen.</p>

          <p>
            Connect on <a href="#">Homepage</a> / <a href="#">TradingQnA</a> /{" "}
            <a href="#">Twitter</a>
          </p>
        </div>
      </div>

      {/* ------------------ Team Members Section ------------------ */}
      <div
        className="row mt-5 text-center team-members"
        style={{ marginTop: "10px" }}
      >
        {/* ---------- Team Member 1 ---------- */}
        <div className="col-4 d-flex flex-column align-items-center mb-5 member">
          <img src="/media/images/Nikhil.jpg" alt="Nikhil Kamath" />
          <h3 className="mt-3">Nikhil Kamath</h3>
          <p className="role">Co-founder & CFO</p>

          <details>
            <summary>Bio</summary>
            <p className="bio">
              Nikhil is an astute and experienced investor, and he heads
              financial planning at Zerodha. An avid reader, he always
              appreciates a good game of chess.
            </p>
          </details>
        </div>

        {/* ---------- Team Member 2 ---------- */}
        <div className="col-4 d-flex flex-column align-items-center mb-5 member">
          <img src="/media/images/Kailash.jpg" alt="Dr. Kailash Nadh" />
          <h3 className="mt-3">Dr. Kailash Nadh</h3>
          <p className="role">CTO</p>

          <details>
            <summary>Bio</summary>
            <p className="bio">
              Kailash has a PhD in Artificial Intelligence & Computational
              Linguistics, and is the brain behind all our technology and
              products. He has been a developer from his adolescence and
              continues to write code every day.
            </p>
          </details>
        </div>

        {/* ---------- Team Member 3 ---------- */}
        <div className="col-4 d-flex flex-column align-items-center mb-5 member">
          <img src="/media/images/Venu.jpg" alt="Venu Madhav" />
          <h3 className="mt-3">Venu Madhav</h3>
          <p className="role">COO</p>

          <details>
            <summary>Bio</summary>
            <p className="bio">
              Venu is the backbone of Zerodha taking care of operations and
              ensuring that we are compliant to rules and regulations. He has
              over a dozen certifications in financial markets and is also
              proficient in technical analysis. Workouts, cycling, and
              adventuring is what he does outside of Zerodha.
            </p>
          </details>
        </div>

        {/* ---------- Team Member 4 ---------- */}
        <div className="col-4 d-flex flex-column align-items-center mb-5 member">
          <img src="/media/images/Hanan.jpg" alt="Hanan Delvi" />
          <h3 className="mt-3">Hanan Delvi</h3>
          <p className="role">CCO</p>

          <details>
            <summary>Bio</summary>
            <p className="bio">
              We take pride in the way we support our clients, and Hanan is
              responsible for this with his never-ending flow of energy. He is
              the man behind many support initiatives that have helped us stay
              ahead. A free thinker, Hanan can be seen posing as one in his free
              time.
            </p>
          </details>
        </div>

        {/* ---------- Team Member 5 ---------- */}
        <div className="col-4 d-flex flex-column align-items-center mb-5 member">
          <img src="/media/images/Seema.jpg" alt="Seema Patil" />
          <h3 className="mt-3">Seema Patil</h3>
          <p className="role">Director</p>

          <details>
            <summary>Bio</summary>
            <p className="bio">
              Seema who has led the quality team since the beginning of Zerodha,
              is now a director. She is an extremely disciplined fitness
              enthusiast.
            </p>
          </details>
        </div>

        {/* ---------- Team Member 6 ---------- */}
        <div className="col-4 d-flex flex-column align-items-center mb-5 member">
          <img src="/media/images/karthik.jpg" alt="Karthik Rangappa" />
          <h3 className="mt-3">Karthik Rangappa</h3>
          <p className="role">Chief of Education</p>

          <details>
            <summary>Bio</summary>
            <p className="bio">
              Karthik "Guru" Rangappa single-handedly wrote Varsity, Zerodha's
              education program. He heads investor education initiatives and
              loves markets, rock music, single malts, and photography.
            </p>
          </details>
        </div>

        {/* ---------- Team Member 7 ---------- */}
        <div className="col-4 d-flex flex-column align-items-center mb-5 member">
          <img src="/media/images/Austin.jpg" alt="Austin Prakesh" />
          <h3 className="mt-3">Austin Prakesh</h3>
          <p className="role">Director Strategy</p>

          <details>
            <summary>Bio</summary>
            <p className="bio">
              Austin is a successful self-made entrepreneur from Singapore. He
              helps organisations grow by optimising revenue and creating growth
              strategies. He is a boxing enthusiast and loves collecting
              exquisite watches.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}

export default Team;
