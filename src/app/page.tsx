import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      <h1>Japanese Learning App</h1>
      <p>Mobile-first Japanese practice for Hiragana and Katakana.</p>
      <div className="card">
        <h2>Start</h2>
        <p>Choose a learning mode below.</p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link className="button" href="/learn">
            Learn
          </Link>
          <Link className="button" href="/review">
            Review
          </Link>
          <Link className="button" href="/quiz">
            Quiz
          </Link>
          <Link className="button" href="/profile">
            Profile
          </Link>
        </div>
      </div>
    </main>
  );
}
