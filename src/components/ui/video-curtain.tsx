"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const playlist = [
  { id: "szvzTpDnTF8", title: "Piano Concerto in C Major" },
  { id: "pn0kxP3fUhw", title: "Solo Recital"              },
  { id: "0Y7VcvDZ6Jg", title: "Chamber Performance"       },
  { id: "PnXUB2GiUlU", title: "Live Concert"              },
];

export function VideoCurtain() {
  const [activeId,    setActiveId]    = useState(playlist[0].id);
  const [isPlaying,   setIsPlaying]   = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const ref      = useRef<HTMLDivElement>(null);
  const isInView  = useInView(ref, { once: true, margin: "-150px" });

  useEffect(() => {
    if (isInView && !curtainOpen) {
      setTimeout(() => setCurtainOpen(true), 400);
    }
  }, [isInView, curtainOpen]);

  const handleThumbnailClick = (id: string) => {
    if (id !== activeId) {
      // Switching video resets to facade; user clicks play for the new one
      setIsPlaying(false);
      setActiveId(id);
    }
  };

  const activeTitle = playlist.find(v => v.id === activeId)?.title ?? '';

  return (
    <div ref={ref} className="w-full py-24 px-6" style={{ background: 'var(--color-primary)' }}>
      <div className="mx-auto max-w-5xl flex flex-col gap-6">

        {/* Section label */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: 'var(--color-accent)',
            textTransform: 'uppercase',
          }}>Listen</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300,
            color: 'var(--color-ivory)',
            marginTop: '8px',
          }}>Selected Performances</h2>
        </motion.div>

        {/* Main video */}
        <div className="relative w-full" style={{ aspectRatio: '16/9' }}>

          {isPlaying ? (
            /* ── Real iframe — only mounted after user clicks play ── */
            <iframe
              key={activeId}
              src={`https://www.youtube.com/embed/${activeId}?autoplay=1&controls=1&modestbranding=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
              title={`Fergus Kwan — ${activeTitle}`}
              style={{ borderRadius: '4px' }}
            />
          ) : (
            /* ── Click-to-load facade — no iframe, no YouTube requests ── */
            <button
              className="absolute inset-0 w-full h-full"
              onClick={() => setIsPlaying(true)}
              aria-label={`Play ${activeTitle}`}
              style={{ padding: 0, border: 'none', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer' }}
            >
              <img
                src={`https://img.youtube.com/vi/${activeId}/maxresdefault.jpg`}
                onError={(e) => {
                  e.currentTarget.src = `https://img.youtube.com/vi/${activeId}/mqdefault.jpg`;
                }}
                alt={`Fergus Kwan — ${activeTitle}`}
                className="w-full h-full object-cover"
              />
              {/* Play button */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.25)' }}
              >
                <div style={{
                  width: '72px',
                  height: '72px',
                  background: 'rgba(0,0,0,0.72)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg viewBox="0 0 24 24" width="30" height="30" fill="white" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </button>
          )}

          {/* Left curtain panel */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: curtainOpen ? '-100%' : 0 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '50%', height: '100%',
              background: 'linear-gradient(to right, #0F0D0B, var(--color-primary))',
              zIndex: 10,
              borderRadius: '4px 0 0 4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: '24px',
              pointerEvents: 'none',
            }}
          >
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '4rem',
              color: 'rgba(253,250,246,0.15)',
              fontStyle: 'italic',
            }}>𝄞</span>
          </motion.div>

          {/* Right curtain panel */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: curtainOpen ? '100%' : 0 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            style={{
              position: 'absolute',
              top: 0, right: 0,
              width: '50%', height: '100%',
              background: 'linear-gradient(to left, #0F0D0B, var(--color-primary))',
              zIndex: 10,
              borderRadius: '0 4px 4px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingLeft: '24px',
              pointerEvents: 'none',
            }}
          >
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '4rem',
              color: 'rgba(253,250,246,0.15)',
              fontStyle: 'italic',
            }}>𝄢</span>
          </motion.div>

        </div>

        {/* Thumbnails */}
        <motion.div
          className="grid grid-cols-4 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          {playlist.map((video) => (
            <motion.button
              key={video.id}
              onClick={() => handleThumbnailClick(video.id)}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative cursor-pointer"
              style={{
                aspectRatio: '16/9',
                overflow: 'hidden',
                borderRadius: '4px',
                border: activeId === video.id
                  ? `2px solid var(--color-accent)`
                  : '1px solid rgba(253,250,246,0.15)',
                padding: 0,
                background: 'none',
                boxShadow: activeId === video.id
                  ? '0 0 0 2px var(--color-accent), 0 4px 20px rgba(146,64,14,0.3)'
                  : 'none',
              }}
            >
              <img
                src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                alt={`Fergus Kwan — ${video.title}`}
                className="w-full h-full object-cover"
                style={{
                  opacity: activeId === video.id ? 1 : 0.5,
                  transition: 'opacity 200ms ease',
                }}
              />
              {activeId !== video.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span style={{
                    color: 'white',
                    fontSize: '20px',
                    textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                  }}>▶</span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 px-2 py-1" style={{
                background: 'linear-gradient(transparent, rgba(28,25,23,0.8))',
                fontFamily: "'Cormorant Garamond', serif",
                color: 'var(--color-ivory)',
                fontSize: '11px',
                letterSpacing: '0.05em',
                textAlign: 'left',
              }}>
                {video.title}
              </div>
            </motion.button>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
