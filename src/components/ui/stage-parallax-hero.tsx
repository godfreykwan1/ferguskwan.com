'use client';
import React from 'react';

export default function StageParallaxHero() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>

      {/* Background photo */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1514119412350-e174d90d280e?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        filter: 'brightness(0.55)',
      }} />

      {/* Amber warm overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(80,30,5,0.4) 0%, rgba(20,8,2,0.7) 100%)',
      }} />

      {/* Spotlight overlays — CSS only */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 8% 45% at 35% 0%, rgba(255,200,80,0.18) 0%, transparent 100%),
          radial-gradient(ellipse 6% 55% at 50% 0%, rgba(255,210,100,0.22) 0%, transparent 100%),
          radial-gradient(ellipse 7% 40% at 65% 0%, rgba(255,190,60,0.15) 0%, transparent 100%)
        `,
        pointerEvents: 'none',
      }} />

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, rgba(4,2,0,0.75) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Nav */}
      <nav style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        height: '64px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 40px',
        background: 'linear-gradient(to bottom, rgba(4,2,0,0.6) 0%, transparent 100%)',
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.1rem', color: '#FDFAF6', letterSpacing: '0.05em',
        }}>Fergus Kwan</span>
        <div style={{ display: 'flex', gap: '32px' }}>
          {['About', 'Services', 'Listen', 'Contact'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} style={{
              fontFamily: 'Inter, sans-serif', fontSize: '12px',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(253,250,246,0.65)', textDecoration: 'none',
            }}>{link}</a>
          ))}
        </div>
      </nav>

      {/* Hero content */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '24px',
      }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '11px', letterSpacing: '0.25em',
          color: 'rgba(217,119,6,0.9)', textTransform: 'uppercase',
          marginBottom: '20px',
        }}>PIANIST · COMPOSER · TEACHER</p>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(3.5rem, 8vw, 7rem)', fontWeight: 300,
          color: '#FDFAF6', lineHeight: 1.05, marginBottom: '16px',
          textShadow: '0 0 80px rgba(146,64,14,0.5), 0 2px 8px rgba(0,0,0,0.9)',
        }}>Fergus Kwan</h1>

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', fontStyle: 'italic',
          color: 'rgba(253,250,246,0.75)', marginBottom: '12px',
          textShadow: '0 0 30px rgba(0,0,0,0.8)',
        }}>Concert Pianist &amp; Composer</p>

        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.85rem',
          color: 'rgba(253,250,246,0.4)', letterSpacing: '0.08em',
          marginBottom: '44px',
        }}>Based in Vancouver</p>

        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="#contact" style={{
            fontFamily: 'Inter, sans-serif', fontSize: '11px',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            padding: '13px 30px', background: '#FDFAF6',
            color: '#1C1917', borderRadius: '2px', textDecoration: 'none',
          }}>Book a Lesson</a>
          <a href="#listen" style={{
            fontFamily: 'Inter, sans-serif', fontSize: '11px',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            padding: '13px 30px', background: 'transparent',
            color: '#FDFAF6', border: '1px solid rgba(253,250,246,0.35)',
            borderRadius: '2px', textDecoration: 'none',
          }}>Listen Now</a>
        </div>
      </div>

    </div>
  );
}
