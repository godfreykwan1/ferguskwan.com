'use client';
import React, { useEffect, useRef, useState } from 'react';

const MUSIC_COLORS = [
  ["#92400E", "#B45309", "#78350F"],  // amber tones
  ["#1C1917", "#44403C", "#92400E"],  // dark + amber
  ["#78350F", "#D97706", "#FDFAF6"],  // warm spectrum
  ["#44403C", "#92400E", "#C2410C"],  // earthy
];

const LIGHT_COLORS = [
  ["#D97706", "#92400E", "#FDFAF6", "#B45309"],
  ["#92400E", "#1C1917", "#D97706", "#78350F"],
  ["#FDFAF6", "#92400E", "#D97706", "#44403C"],
];

const MUSIC_SYMBOLS = ['𝄞', '♩', '♪', '♫', '♬', '♭', '♯'];

export default function TubesHero() {
  const tubesCanvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<any>(null);
  const colorIndexRef = useRef(0);
  const [symbols, setSymbols] = useState<Array<{
    symbol: string;
    x: number;
    y: number;
    size: number;
    opacity: number;
    rotation: number;
  }>>([]);

  // Generate static music symbols scattered across the screen
  useEffect(() => {
    setSymbols(Array.from({ length: 24 }, () => ({
      symbol: MUSIC_SYMBOLS[Math.floor(Math.random() * MUSIC_SYMBOLS.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 24 + Math.random() * 48,
      opacity: 0.08 + Math.random() * 0.15,
      rotation: (Math.random() - 0.5) * 30,
    })));
  }, []);

  useEffect(() => {
    const initTimer = setTimeout(() => {
      // Use Function constructor to bypass webpack's static analysis of import()
      // so the CDN URL is resolved at runtime in the browser.
      const dynamicImport = new Function('url', 'return import(url)') as
        (url: string) => Promise<any>;

      dynamicImport(
        'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js'
      )
        .then((module: any) => {
          const TubesCursor = module.default;
          if (TubesCursor && tubesCanvasRef.current) {
            const app = TubesCursor(tubesCanvasRef.current, {
              tubes: {
                colors: MUSIC_COLORS[0],
                lights: {
                  intensity: 150,
                  colors: LIGHT_COLORS[0],
                },
              },
              onMouseMove: null,
            });
            appRef.current = app;

            // Override mouse interaction — lock tubes to center
            if (app.tubes && app.tubes.mouse) {
              app.tubes.mouse.x = 0;
              app.tubes.mouse.y = 0;
            }
          }
        })
        .catch((err: any) => console.error('Failed to load TubesCursor:', err));
    }, 100);

    return () => {
      clearTimeout(initTimer);
      if (appRef.current?.dispose) appRef.current.dispose();
    };
  }, []);

  const handleClick = () => {
    if (appRef.current) {
      colorIndexRef.current = (colorIndexRef.current + 1) % MUSIC_COLORS.length;
      const idx = colorIndexRef.current;
      appRef.current.tubes.setColors(MUSIC_COLORS[idx]);
      appRef.current.tubes.setLightsColors(LIGHT_COLORS[idx % LIGHT_COLORS.length]);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative h-screen w-full overflow-hidden cursor-pointer"
      style={{ background: '#0F0D0B' }}
    >
      {/* 3D Tubes canvas */}
      <canvas ref={tubesCanvasRef} className="absolute inset-0 z-0 w-full h-full" />

      {/* Static music symbols overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {symbols.map((s, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: `${s.x}%`,
              top: `${s.y}%`,
              fontSize: `${s.size}px`,
              color: `rgba(253, 250, 246, ${s.opacity})`,
              transform: `rotate(${s.rotation}deg)`,
              fontFamily: 'serif',
              userSelect: 'none',
              lineHeight: 1,
            }}
          >
            {s.symbol}
          </span>
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '11px',
          letterSpacing: '0.25em',
          color: 'rgba(146,64,14,0.9)',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          PIANIST · COMPOSER · TEACHER
        </p>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(3.5rem, 8vw, 7rem)',
          fontWeight: 300,
          color: '#FDFAF6',
          lineHeight: 1.05,
          marginBottom: '16px',
          textShadow: '0 0 60px rgba(0,0,0,0.8)',
        }}>
          Fergus Kwan
        </h1>

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
          fontStyle: 'italic',
          color: 'rgba(253,250,246,0.75)',
          marginBottom: '12px',
          textShadow: '0 0 30px rgba(0,0,0,0.6)',
        }}>
          Concert Pianist &amp; Composer
        </p>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.9rem',
          color: 'rgba(253,250,246,0.45)',
          letterSpacing: '0.05em',
          marginBottom: '40px',
        }}>
          Based in Vancouver — click to change the light
        </p>

        <div style={{ display: 'flex', gap: '16px' }}>
          <a
            href="#contact"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '14px 32px',
              background: '#FDFAF6',
              color: '#1C1917',
              border: 'none',
              borderRadius: '2px',
              cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            Book a Lesson
          </a>
          <a
            href="#listen"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '14px 32px',
              background: 'transparent',
              color: '#FDFAF6',
              border: '1px solid rgba(253,250,246,0.4)',
              borderRadius: '2px',
              cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            Listen Now
          </a>
        </div>
      </div>

      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 z-30 px-8 h-16 flex items-center justify-between">
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.1rem',
          color: '#FDFAF6',
          letterSpacing: '0.05em',
        }}>Fergus Kwan</span>
        <div style={{ display: 'flex', gap: '32px' }}>
          {['About', 'Services', 'Listen', 'Contact'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={(e) => e.stopPropagation()}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(253,250,246,0.7)',
                textDecoration: 'none',
              }}
            >
              {link}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
