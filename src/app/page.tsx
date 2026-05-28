import Link from "next/link";

export default function HomePage() {
  return (
    <div className="page-body">
      <div className="container">
        <div className="hero animate">
          <div className="hero-badge">✦ Spaced Repetition Learning</div>
          <span className="hero-kana">あいう</span>
          <h1 className="hero-title">Master Japanese Kana</h1>
          <p className="hero-desc">
            Learn hiragana and katakana with proven spaced repetition.
            Track your progress, quiz yourself, and build a lasting habit.
          </p>
          <div className="hero-actions">
            <Link href="/learn" className="btn btn-primary btn-lg">
              Start Learning
            </Link>
            <Link href="/quiz" className="btn btn-secondary btn-lg">
              Quick Quiz
            </Link>
          </div>
        </div>

        <div className="feature-grid animate anim-d1">
          <Link href="/learn" className="feature-card">
            <div className="feature-icon fi-purple">📖</div>
            <div className="feature-name">Learn</div>
            <div className="feature-desc">Study kana character by character with romaji guides.</div>
          </Link>
          <Link href="/review" className="feature-card">
            <div className="feature-icon fi-green">🔄</div>
            <div className="feature-name">Review</div>
            <div className="feature-desc">Revisit cards due today based on your retention.</div>
          </Link>
          <Link href="/quiz" className="feature-card">
            <div className="feature-icon fi-yellow">⚡</div>
            <div className="feature-name">Quiz</div>
            <div className="feature-desc">Test yourself and earn streaks for correct answers.</div>
          </Link>
          <Link href="/profile" className="feature-card">
            <div className="feature-icon fi-pink">📊</div>
            <div className="feature-name">Profile</div>
            <div className="feature-desc">See your accuracy, streak, and overall progress.</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
