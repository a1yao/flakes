'use client';
import Link from "next/link";

export default function Home() {
  return (
    <div className="wrapper">
      <h1 className="heading">Welcome to Flakes</h1>
      <div className="links">
        <Link href="/login" className="link-login">Login</Link>
        <Link href="/signup" className="link-signup">Signup</Link>
      </div>

      <style jsx>{`
        .wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
        }

        .heading {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 700;
          color: #1e3a8a;
          letter-spacing: 0.04em;
          margin: 0;
        }

        .links {
          display: flex;
          gap: 1rem;
        }

        .link-login,
        .link-signup {
          padding: 0.6rem 1.8rem;
          border-radius: 9999px;
          font-family: Georgia, serif;
          font-size: 0.95rem;
          letter-spacing: 0.06em;
          text-decoration: none;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }

        .link-login {
          background: transparent;
          color: #1e3a8a;
          border: 1.5px solid rgba(30, 58, 138, 0.45);
        }
        .link-login:hover {
          background: rgba(30, 58, 138, 0.06);
          transform: translateY(-2px);
        }

        .link-signup {
          background: #1e3a8a;
          color: #e0f2fe;
          box-shadow: 0 4px 14px rgba(30, 58, 138, 0.28);
        }
        .link-signup:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(30, 58, 138, 0.38);
        }

        @media (prefers-color-scheme: dark) {
          .heading { color: #e0f2fe; }
          .link-login { color: #e0f2fe; border-color: rgba(224, 242, 254, 0.3); }
          .link-login:hover { background: rgba(224, 242, 254, 0.06); }
          .link-signup { background: #3b82f6; color: #f0f9ff; }
          .link-signup:hover { background: #60a5fa; }
        }
      `}</style>
    </div>
  );
}