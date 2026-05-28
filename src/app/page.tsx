import Link from "next/link";

export default function HomePage() {
  return (
    <div className="page-body">
      <div className="container">
        <div className="hero animate">
          <div className="hero-badge">✦ Spaced Repetition Learning</div>
          <span className="hero-kana">あ漢ア</span>
          <h1 className="hero-title">Master Japanese</h1>
          <p className="hero-desc">
            Learn hiragana, katakana, and kanji with proven spaced repetition.
            Track your progress and build a lasting habit.
          </p>
          <div className="hero-actions">
            <Link href="/learn" className="btn btn-primary btn-lg">
              Start Learning
            </Link>
            <Link href="/kanji" className="btn btn-secondary btn-lg">
              Browse Kanji
            </Link>
          </div>
        </div>

        {/* Featured kanji card */}
        <Link href="/kanji" className="kanji-feature-card animate anim-d1">
          <div className="kanji-feature-left">
            <span className="badge lv-n5" style={{ marginBottom: "0.5rem" }}>NEW</span>
            <div className="kanji-feature-title">Kanji Study</div>
            <div className="kanji-feature-desc">
              80+ N5 &amp; N4 kanji with on&rsquo;yomi, kun&rsquo;yomi, stroke counts, and JLPT levels.
            </div>
          </div>
          <div className="kanji-feature-chars" aria-hidden="true">
            山水火木
          </div>
        </Link>

        <div className="feature-grid animate anim-d2">
          <Link href="/learn" className="feature-card">
            <div className="feature-icon fi-purple">📖</div>
            <div className="feature-name">Learn Kana</div>
            <div className="feature-desc">Study hiragana &amp; katakana with romaji guides.</div>
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
