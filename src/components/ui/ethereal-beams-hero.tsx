'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ─── Beam config: 11 rays fanning from bottom-centre ─────────────── */
const BEAMS = [
  { angle: -1.10, opacity: 0.18, phase: 0.0 },
  { angle: -0.85, opacity: 0.28, phase: 1.1 },
  { angle: -0.62, opacity: 0.44, phase: 2.2 },
  { angle: -0.40, opacity: 0.58, phase: 0.7 },
  { angle: -0.18, opacity: 0.72, phase: 3.1 },
  { angle:  0.00, opacity: 0.82, phase: 1.6 },
  { angle:  0.18, opacity: 0.72, phase: 4.2 },
  { angle:  0.40, opacity: 0.58, phase: 2.7 },
  { angle:  0.62, opacity: 0.44, phase: 0.4 },
  { angle:  0.85, opacity: 0.28, phase: 3.8 },
  { angle:  1.10, opacity: 0.18, phase: 1.9 },
]

const BEAM_COLOR = '#D97706'

/* ─── Single beam ──────────────────────────────────────────────────── */
interface BeamProps { angle: number; opacity: number; phase: number }

function Beam({ angle, opacity, phase }: BeamProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(0.13, 9, 1, 64)
    g.translate(0, 4.5, 0) // pivot at bottom edge
    return g
  }, [])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColor:   { value: new THREE.Color(BEAM_COLOR) },
          uOpacity: { value: opacity },
          uTime:    { value: 0 },
          uPhase:   { value: phase },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3  uColor;
          uniform float uOpacity;
          uniform float uTime;
          uniform float uPhase;
          varying vec2  vUv;
          void main() {
            float edge   = smoothstep(0.0, 0.28, vUv.x) * smoothstep(1.0, 0.72, vUv.x);
            float length = pow(smoothstep(1.0, 0.0, vUv.y), 0.6);
            float base   = smoothstep(0.0, 0.04, vUv.y);
            float pulse  = 0.58 + 0.42 * sin(uTime * 0.5 + uPhase);
            gl_FragColor = vec4(uColor, edge * length * base * uOpacity * pulse);
          }
        `,
        transparent: true,
        blending:    THREE.AdditiveBlending,
        depthWrite:  false,
        side:        THREE.DoubleSide,
      }),
    [opacity, phase],
  )

  useEffect(
    () => () => {
      geometry.dispose()
      material.dispose()
    },
    [geometry, material],
  )

  useFrame(({ clock }) => {
    const mesh = meshRef.current
    if (!mesh) return
    const t = clock.getElapsedTime()
    ;(mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = t
    mesh.rotation.z = angle + Math.sin(t * 0.14 + phase) * 0.04
  })

  return (
    <mesh
      ref={meshRef}
      position={[0, -4.5, 0]}
      rotation={[0, 0, angle]}
      geometry={geometry}
      material={material}
    />
  )
}

/* ─── Three.js scene ───────────────────────────────────────────────── */
function Scene() {
  return (
    <>
      <color attach="background" args={['#1C1917']} />
      {BEAMS.map((b, i) => (
        <Beam key={i} {...b} />
      ))}
    </>
  )
}

/* ─── Navigation (scroll-aware) ───────────────────────────────────── */
const NAV_LINKS = ['About', 'Services', 'Listen', 'Contact'] as const

function Nav() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.75)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navBg  = scrolled ? 'bg-ivory border-b border-primary/10'        : 'bg-transparent'
  const txtClr = scrolled ? 'text-secondary hover:text-accent'            : 'text-ivory/70 hover:text-ivory'
  const brand  = scrolled ? 'text-primary'                                : 'text-ivory'

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${navBg}`}>
      <div className="mx-auto max-w-[1200px] px-[clamp(1.5rem,5vw,4rem)] h-[72px] flex items-center justify-between gap-8">

        <a
          href="#home"
          className={`font-display text-[1.375rem] font-normal tracking-[0.02em] transition-opacity hover:opacity-65 ${brand}`}
        >
          Fergus Kwan
        </a>

        {/* Desktop links */}
        <nav className="hidden md:block" aria-label="Main navigation">
          <ul className="flex items-center gap-10 list-none">
            {NAV_LINKS.map(link => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className={`font-body text-sm font-normal tracking-[0.03em] transition-colors ${txtClr}`}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1.5 cursor-pointer bg-transparent border-0"
          onClick={() => setMobileOpen(o => !o)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {[
            mobileOpen ? 'translate-y-[6px] rotate-45'  : '',
            mobileOpen ? 'opacity-0'                     : '',
            mobileOpen ? '-translate-y-[6px] -rotate-45' : '',
          ].map((extra, i) => (
            <span
              key={i}
              className={`block w-[22px] h-px transition-transform ${scrolled ? 'bg-primary' : 'bg-ivory'} ${extra}`}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-primary/95 border-b border-ivory/10 px-[clamp(1.5rem,5vw,4rem)] py-6">
          <ul className="flex flex-col gap-5 list-none">
            {NAV_LINKS.map(link => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="font-body text-base text-ivory/70 hover:text-ivory transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

/* ─── Hero content ─────────────────────────────────────────────────── */
function HeroContent() {
  return (
    <div className="absolute inset-0 flex items-center">
      <div className="mx-auto max-w-[1200px] px-[clamp(1.5rem,5vw,4rem)] w-full">
        <div className="max-w-[800px]">

          <p
            className="font-body text-[0.6875rem] font-medium tracking-[0.15em] uppercase text-ivory/55 mb-8 animate-fade-up"
            style={{ animationDelay: '0.10s' }}
          >
            Pianist · Composer · Teacher
          </p>

          <h1
            className="font-display text-[clamp(3.75rem,9vw,7.5rem)] font-light leading-none tracking-[-0.01em] text-ivory mb-3 animate-fade-up"
            style={{ animationDelay: '0.25s' }}
          >
            Fergus Kwan
          </h1>

          <p
            className="font-display text-[clamp(1.375rem,3vw,2.125rem)] italic font-light text-ivory/75 mb-8 animate-fade-up"
            style={{ animationDelay: '0.40s' }}
          >
            Concert Pianist &amp; Composer
          </p>

          <p
            className="font-body text-base font-light text-ivory/60 max-w-[480px] leading-[1.75] mb-12 animate-fade-up"
            style={{ animationDelay: '0.55s' }}
          >
            Based in Vancouver — performing repertoire from Baroque to contemporary music.
          </p>

          <div
            className="flex flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: '0.70s' }}
          >
            <a
              href="#contact"
              className="font-body text-[0.8125rem] font-medium tracking-[0.1em] uppercase px-8 py-3.5 bg-ivory text-primary border border-ivory rounded-sm hover:bg-[#D97706] hover:border-[#D97706] transition-colors"
            >
              Book a Lesson
            </a>
            <a
              href="#listen"
              className="font-body text-[0.8125rem] font-medium tracking-[0.1em] uppercase px-8 py-3.5 bg-transparent text-ivory border border-ivory/50 rounded-sm hover:bg-ivory/10 transition-colors"
            >
              Listen Now
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}

/* ─── Root export ──────────────────────────────────────────────────── */
export default function EtherealBeamsHero({ noNav = false }: { noNav?: boolean }) {
  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        className="absolute inset-0"
        dpr={[1, 2]}
        style={{ pointerEvents: 'none' }}
        gl={{ antialias: false }}
      >
        <Scene />
      </Canvas>

      {!noNav && <Nav />}
      <HeroContent />
    </section>
  )
}
