'use client';

import { useEffect, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   B1 — FLOATING TREBLE CLEFS
   Random generation happens client-side only (useEffect) to avoid
   hydration mismatches. Each clef bobs via the floatBob keyframe
   in globals.css, reading its own --rot CSS variable.
═══════════════════════════════════════════════════════════════════ */

const MUSIC_SYMBOLS = [
  '𝄞', // treble clef
  '♩', // quarter note
  '♪', // eighth note
  '♫', // beamed eighth notes
  '♬', // beamed sixteenth notes
  '♭', // flat
  '♯', // sharp
  '𝄻', // whole rest
  '𝄼', // half rest
  '○', // whole note
  '●', // filled note head
];

interface ClefDatum {
  x: number;
  y: number;
  size: number;
  opacity: number;
  rot: number;
  duration: number;
  delay: number;
  symbol: string;
}

function TrebleClefs({ minOpacity = 0.06, maxOpacity = 0.12 }: { minOpacity?: number; maxOpacity?: number }) {
  const [clefs, setClefs] = useState<ClefDatum[]>([]);

  useEffect(() => {
    const count = 12; // sparse — confined to right side away from copy
    setClefs(
      Array.from({ length: count }, () => ({
        x: 48 + Math.random() * 52, // right 52% only — never over text
        y: Math.random() * 90, // 0–90% spread across full hero
        size: 16 + Math.random() * 24, // 16–40 px
        opacity: minOpacity + Math.random() * (maxOpacity - minOpacity),
        rot: -20 + Math.random() * 40, // –20 to +20 deg
        duration: 3 + Math.random() * 3, // 3–6 s (2× faster)
        delay: -(Math.random() * 12), // stagger phase
        symbol: MUSIC_SYMBOLS[Math.floor(Math.random() * MUSIC_SYMBOLS.length)],
      }))
    );
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {clefs.map((c, i) => (
        <span
          key={i}
          style={
            {
              position: 'absolute',
              left: `${c.x}%`,
              top: `${c.y}%`,
              fontSize: `${c.size}px`,
              color: 'rgba(255, 0, 0, 1)',
              opacity: c.opacity,
              lineHeight: 1,
              '--rot': `${c.rot}deg`,
              animation: `floatBob ${c.duration}s ease-in-out ${c.delay}s infinite`,
            } as React.CSSProperties
          }
        >
          {c.symbol}
        </span>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   B2 — STAFF LINES
   Static SVG. viewBox 1000 × 660 with xMidYMid slice so it always
   fills the section. Rotated –2 ° via CSS with a slight scale to
   cover the corners exposed by the rotation.
═══════════════════════════════════════════════════════════════════ */

const STAVES_Y = [85, 215, 340, 455, 570]; // SVG-unit baselines
const LINE_GAP = 10; // SVG units between staff lines

const NOTES = [
  { si: 0, li: 2, x: 140 },
  { si: 0, li: 0, x: 315 },
  { si: 0, li: 4, x: 530 },
  { si: 0, li: 1, x: 720 },
  { si: 1, li: 3, x: 90 },
  { si: 1, li: 1, x: 425 },
  { si: 1, li: 2, x: 680 },
  { si: 1, li: 4, x: 870 },
  { si: 2, li: 0, x: 200 },
  { si: 2, li: 2, x: 495 },
  { si: 2, li: 4, x: 755 },
  { si: 3, li: 1, x: 165 },
  { si: 3, li: 3, x: 380 },
  { si: 3, li: 2, x: 640 },
  { si: 3, li: 0, x: 855 },
  { si: 4, li: 2, x: 255 },
  { si: 4, li: 1, x: 575 },
  { si: 4, li: 3, x: 795 },
];

function StaffLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1000 660"
      preserveAspectRatio="xMidYMid slice"
      style={{ transform: 'rotate(-2deg) scale(1.08)' }}
      aria-hidden="true"
    >
      {STAVES_Y.map((baseY, si) =>
        [0, 1, 2, 3, 4].map((li) => (
          <line
            key={`${si}-${li}`}
            x1="-60"
            y1={baseY + li * LINE_GAP}
            x2="1060"
            y2={baseY + li * LINE_GAP}
            stroke="#92400E"
            strokeWidth="0.5"
            strokeOpacity="0.07"
          />
        ))
      )}
      {NOTES.map((n, i) => (
        <ellipse
          key={i}
          cx={n.x}
          cy={STAVES_Y[n.si] + n.li * LINE_GAP}
          rx="6"
          ry="5"
          fill="#92400E"
          fillOpacity="0.05"
          transform={`rotate(-15 ${n.x} ${STAVES_Y[n.si] + n.li * LINE_GAP})`}
        />
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   B3 — RADIAL GLOW
   Static SVG anchored bottom-left via preserveAspectRatio xMinYMax.
   Lines radiate from (0, H) at 9 angles; soft gradient glow at origin.
═══════════════════════════════════════════════════════════════════ */

const RG_W = 1920,
  RG_H = 1080;
const RG_DIAG = Math.sqrt(RG_W ** 2 + RG_H ** 2);
const RG_ANGLES_DEG = [8, 18, 28, 38, 48, 58, 68, 78, 88];

const rgLines = RG_ANGLES_DEG.map((deg) => {
  const r = (deg * Math.PI) / 180;
  return { x2: Math.cos(r) * RG_DIAG, y2: RG_H - Math.sin(r) * RG_DIAG };
});

function RadialGlow() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox={`0 0 ${RG_W} ${RG_H}`}
      preserveAspectRatio="xMinYMax slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="rg-glow-b3" cx="0" cy={RG_H} r="350" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#92400E" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#92400E" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="0" cy={RG_H} r="350" fill="url(#rg-glow-b3)" />

      {rgLines.map((l, i) => (
        <line key={i} x1="0" y1={RG_H} x2={l.x2} y2={l.y2} stroke="#92400E" strokeWidth="1" strokeOpacity="0.08" />
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   B4 — PIANO KEYS
   Two octaves (14 white + 10 black keys). Right-aligned, bottom of
   hero, 30 vw wide, opacity 0.15. Pure CSS — no canvas, no SVG.
═══════════════════════════════════════════════════════════════════ */

const TOTAL_WHITE = 14;
const WHITE_H_PX = 80;
const BLACK_H_PX = 52;
const BLACK_W_RATIO = 0.6; // fraction of one white key width

// Left-edge of each black key in white-key units (standard piano spacing)
const BLACK_POS_WKU = [
  0.7,
  1.75, // C# D#  (octave 1)
  3.7,
  4.75,
  5.75, // F# G# A#
  7.7,
  8.75, // C# D#  (octave 2)
  10.7,
  11.75,
  12.75, // F# G# A#
];

function PianoKeys({ overlayOpacity = 0.15 }: { overlayOpacity?: number }) {
  const wPct = 100 / TOTAL_WHITE; // % width of one white key

  return (
    <div
      className="absolute bottom-0 right-0 overflow-hidden"
      style={{ width: '30vw', height: WHITE_H_PX, opacity: overlayOpacity }}
      aria-hidden="true"
    >
      {/* White keys */}
      {Array.from({ length: TOTAL_WHITE }, (_, i) => (
        <div
          key={`w${i}`}
          style={{
            position: 'absolute',
            left: `${i * wPct}%`,
            top: 0,
            width: `${wPct}%`,
            height: WHITE_H_PX,
            background: '#F5F0E8',
            border: '1px solid #D6CFC4',
            boxSizing: 'border-box',
          }}
        />
      ))}

      {/* Black keys */}
      {BLACK_POS_WKU.map((pos, i) => (
        <div
          key={`b${i}`}
          style={{
            position: 'absolute',
            left: `${(pos / TOTAL_WHITE) * 100}%`,
            top: 0,
            width: `${(BLACK_W_RATIO / TOTAL_WHITE) * 100}%`,
            height: BLACK_H_PX,
            background: '#44403C',
            zIndex: 1,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SHARED HERO CONTENT (identical across all B variants)
═══════════════════════════════════════════════════════════════════ */

function HeroContent() {
  return (
    <div className="relative z-10 mx-auto max-w-[1200px] px-[clamp(1.5rem,5vw,4rem)] w-full">
      <div className="max-w-[800px]">
        <p
          className="font-body text-[0.6875rem] font-medium tracking-[0.15em] uppercase text-secondary mb-8 animate-fade-up"
          style={{ animationDelay: '0.10s' }}
        >
          Pianist · Composer · Teacher
        </p>

        <h1
          className="font-display text-[clamp(3.75rem,9vw,7.5rem)] font-light leading-none tracking-[-0.01em] text-primary mb-3 animate-fade-up"
          style={{ animationDelay: '0.25s' }}
        >
          Fergus Kwan
        </h1>

        <p
          className="font-display text-[clamp(1.375rem,3vw,2.125rem)] italic font-light text-secondary mb-8 animate-fade-up"
          style={{ animationDelay: '0.40s', color: '#1C1917' }}
        >
          Concert Pianist &amp; Composer
        </p>

        <p
          className="font-body text-base font-light text-secondary max-w-[480px] leading-[1.75] mb-12 animate-fade-up"
          style={{ animationDelay: '0.55s', color: '#44403C' }}
        >
          Based in Vancouver — performing repertoire from Baroque to contemporary music.
        </p>

        <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.70s' }}>
          <a
            href="#contact"
            className="font-body text-[0.8125rem] font-medium tracking-[0.1em] uppercase px-8 py-3.5 bg-primary text-ivory border border-primary rounded-sm hover:bg-accent hover:border-accent transition-colors"
          >
            Book a Lesson
          </a>
          <a
            href="#listen"
            className="font-body text-[0.8125rem] font-medium tracking-[0.1em] uppercase px-8 py-3.5 bg-transparent text-primary border border-primary rounded-sm hover:bg-primary hover:text-ivory transition-colors"
          >
            Listen Now
          </a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ROOT EXPORT
═══════════════════════════════════════════════════════════════════ */

export type Variant = 'b1' | 'b2' | 'b3' | 'b4' | 'b5';

export default function HeroElegant({ variant = 'b5' }: { variant?: Variant }) {
  return (
    <section className="relative min-h-screen bg-ivory flex items-center py-[clamp(4rem,10vw,8rem)]">
      {variant === 'b1' && <TrebleClefs />}
      {variant === 'b2' && <StaffLines />}
      {variant === 'b3' && <RadialGlow />}
      {variant === 'b4' && <PianoKeys />}
      {variant === 'b5' && (
        <>
          <PianoKeys overlayOpacity={0.18} />
          <TrebleClefs minOpacity={0.05} maxOpacity={0.1} />
        </>
      )}
      <HeroContent />
    </section>
  );
}
