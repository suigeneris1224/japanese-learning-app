import { prisma } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

const LEVELS = ["N5", "N4", "N3", "N2", "N1"] as const;

const levelColors: Record<string, string> = {
  N5: "lv-n5",
  N4: "lv-n4",
  N3: "lv-n3",
  N2: "lv-n2",
  N1: "lv-n1",
};

export default async function KanjiPage({
  searchParams,
}: {
  searchParams: { level?: string };
}) {
  const raw = (searchParams?.level ?? "").toUpperCase();
  const activeLevel = (LEVELS as readonly string[]).includes(raw) ? raw : null;

  const kanji = await prisma.kanji.findMany({
    where: activeLevel ? { jlptLevel: activeLevel } : undefined,
    orderBy: [{ jlptLevel: "desc" }, { strokeCount: "asc" }],
  });

  const counts = await prisma.kanji.groupBy({
    by: ["jlptLevel"],
    _count: { _all: true },
  });
  const countMap = Object.fromEntries(counts.map((c) => [c.jlptLevel, c._count._all]));

  return (
    <div className="container">
      <div className="page-header animate">
        <div className="row">
          <div>
            <h1 className="page-title">Kanji</h1>
            <p className="page-sub">Study kanji by JLPT level — readings and meanings.</p>
          </div>
          <span className="badge badge-purple">{kanji.length} kanji</span>
        </div>
      </div>

      {/* Level filter tabs */}
      <div className="level-tabs animate anim-d1">
        <Link
          href="/kanji"
          className={`level-tab${!activeLevel ? " level-tab-active" : ""}`}
        >
          All
        </Link>
        {LEVELS.map((lvl) => (
          <Link
            key={lvl}
            href={`/kanji?level=${lvl}`}
            className={`level-tab${activeLevel === lvl ? " level-tab-active" : ""}`}
          >
            {lvl}
            {countMap[lvl] ? (
              <span className="level-tab-count">{countMap[lvl]}</span>
            ) : null}
          </Link>
        ))}
      </div>

      {kanji.length === 0 ? (
        <div className="empty animate anim-d2">
          <div className="empty-icon">漢</div>
          <div className="empty-title">No kanji yet</div>
          <p className="empty-desc">
            Run <code style={{ background: "var(--surface-3)", padding: "0.1rem 0.4rem", borderRadius: 4, fontSize: "0.85em" }}>prisma db seed</code> to populate kanji.
          </p>
        </div>
      ) : (
        <div className="kanji-grid animate anim-d2">
          {kanji.map((k) => (
            <div className="kanji-card" key={k.id} title={`${k.onyomi} / ${k.kunyomi}`}>
              <span className={`badge ${levelColors[k.jlptLevel] ?? "badge-gray"} kanji-level-badge`}>
                {k.jlptLevel}
              </span>
              <span className="kanji-char">{k.character}</span>
              <span className="kanji-meaning">{k.meaning}</span>
              <div className="kanji-readings">
                <div>音: {k.onyomi}</div>
                <div>訓: {k.kunyomi}</div>
              </div>
              <span className="kanji-strokes">{k.strokeCount}画</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
