import React from "react";
import Nav from "../components/Nav";
import { useAuth } from "../context/authContext";

export default function Home() {
  const { user, status, errMsg } = useAuth();

  return (
    <div>
      <Nav />
      <div className="screen">
        <div className="hero-section glass-card-b">
          <h1 className="iconAndText">
            <span className="material-symbols-outlined bigIcon">lock</span>{" "}
            Welcome to the Secure App
          </h1>
          <p className="subtitle">
            Built with security-first principles for the Application Security &
            Secure Coding course
          </p>
        </div>

        {status === 429 && (
          <div className="disclaimer ">
            <p>
              ⚠️ <strong>{errMsg}:</strong> We have suspended your
              account temporarly for too many requests
            </p>
          </div>
        )}

        {user && user.isDeleted === true && (
          <div className="disclaimer-red">
            <p className="redI">
              ⛔ <strong>Blocked Account:</strong> This account was blocked by
              the admins for a suspected terms of service violation
            </p>
          </div>
        )}

        <div className="security-info">
          <h2 className="iconAndText">
            <span className="material-symbols-outlined midIcon">
              shield_lock
            </span>
            How is this app secure?
          </h2>

          <div className="security-features">
            <div className="feature-card glass-card">
              <div className="feature-icon">
                <span className="material-symbols-outlined xlIcon gold">
                  key
                </span>
              </div>
              <h3>Strong Authentication</h3>
              <p>
                Your passwords are hashed using <strong>bcrypt</strong> with
                salt rounds, making them virtually impossible to crack. We use{" "}
                <strong>JWT tokens</strong> with expiration to keep your
                sessions secure.
              </p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon">
                <span className="material-symbols-outlined xlIcon purple">
                  people
                </span>
              </div>
              <h3>Role-Based Access Control</h3>
              <p>
                Admin and user roles are strictly enforced. You can only access
                resources you're authorized to see - no privilege escalation
                possible.
              </p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon">
                <span className="material-symbols-outlined xlIcon green">
                  check_box
                </span>
              </div>
              <h3>Input Validation</h3>
              <p>
                Every input is validated on both client (<strong>Yup</strong>)
                and server (<strong>Joi</strong>) to prevent injection attacks,
                XSS, and malicious data.
              </p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon">
                <span className="material-symbols-outlined xlIcon gold">
                  lock
                </span>
              </div>
              <h3>Encrypted Data</h3>
              <p>
                Sensitive data is encrypted at rest in <strong>MongoDB</strong>.
                All communications use secure protocols to protect data in
                transit.
              </p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon">
                <span className="material-symbols-outlined xlIcon redI">
                  do_not_disturb_on
                </span>
              </div>
              <h3>Rate Limiting</h3>
              <p>
                Brute-force attacks are prevented through intelligent rate
                limiting. Multiple failed login attempts result in temporary
                account lockout.
              </p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon">
                <span className="material-symbols-outlined xlIcon blue2">
                  shield
                </span>
              </div>
              <h3>Security Headers</h3>
              <p>
                <strong>Helmet.js</strong> sets security headers including CSP,
                XSS protection, and frame options to defend against common
                attacks.
              </p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon">
                <span className="material-symbols-outlined xlIcon blue">
                  language
                </span>
              </div>
              <h3>CORS Protection</h3>
              <p>
                Strict CORS policies ensure only authorized origins can access
                our API, preventing cross-origin attacks.
              </p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon">
                <span className="material-symbols-outlined xlIcon blue3">
                  search
                </span>
              </div>
              <h3>Threat Modeling</h3>
              <p>
                Designed using <strong>STRIDE</strong> methodology and
                risk-assessed with <strong>DREAD</strong> framework to identify
                and mitigate threats.
              </p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon">
                <span className="material-symbols-outlined xlIcon gold">
                  warning
                </span>
              </div>
              <h3>Safe Error Handling</h3>
              <p>
                Generic error messages prevent information leakage. Stack traces
                and sensitive details are never exposed to users.
              </p>
            </div>
          </div>

          <div className="disclaimer ">
            <p>
              ⚠️ <strong>Educational Purpose:</strong> This project is developed
              for academic demonstration of secure coding practices and is not
              intended for production use.
            </p>
          </div>

          <div className="tech-stack glass-card">
            <h2 className="iconAndText">
              <span className="material-symbols-outlined bigIcon">
                home_repair_service
              </span>{" "}
              Tech Stack
            </h2>
            <div className="tech-columns">
              <div className="tech-column">
                <h3>Frontend</h3>
                <ul>
                  <li>React</li>
                  <li>Formik</li>
                  <li>Yup</li>
                </ul>
              </div>
              <div className="tech-column">
                <h3>Backend</h3>
                <ul>
                  <li>Node.js</li>
                  <li>Express.js</li>
                  <li>Joi</li>
                </ul>
              </div>
              <div className="tech-column">
                <h3>Database</h3>
                <ul>
                  <li>MongoDB</li>
                </ul>
              </div>
              <div className="tech-column">
                <h3>Security</h3>
                <ul>
                  <li>JWT</li>
                  <li>bcrypt</li>
                  <li>Helmet</li>
                </ul>
              </div>
            </div>
          </div>

          {!user && (
            <div className="cta-section glass-card-b">
              <h2>Ready to experience secure authentication?</h2>
              <p>Create an account or log in to explore the secure features.</p>
              <div className="cta-buttons">
                <a href="/register" className="btn btn-primary">
                  Get Started
                </a>
                <a href="/login" className="btn btn-secondary">
                  Login
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
