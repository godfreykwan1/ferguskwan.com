'use client'

import { useState } from 'react'
import EtherealBeamsHero            from '@/components/ui/ethereal-beams-hero'
import { GlowyWavesHero }           from '@/components/ui/glowy-waves-hero-shadcnui'
import TubesHero                    from '@/components/ui/tubes-hero'
import StageParallaxHero            from '@/components/ui/stage-parallax-hero'
import HeroElegant, { type Variant } from '@/components/sections/HeroElegant'
import About                         from '@/components/sections/About'
import Services                      from '@/components/sections/Services'
import Listen                        from '@/components/sections/Listen'
import Testimonials                  from '@/components/sections/Testimonials'
import Contact                       from '@/components/sections/Contact'
import Footer                        from '@/components/sections/Footer'

type MainTab = 'a' | 'b' | 'c' | 'd' | 'e'

const MAIN_TABS: { id: MainTab; label: string; sub: string }[] = [
  { id: 'a', label: 'Version A', sub: 'Dramatic' },
  { id: 'b', label: 'Version B', sub: 'Elegant'  },
  { id: 'c', label: 'Version C', sub: 'Waves'    },
  { id: 'd', label: 'Version D', sub: 'Tubes'    },
  { id: 'e', label: 'Version E', sub: 'Stage'    },
]

const SUB_TABS: { id: Variant; label: string }[] = [
  { id: 'b1', label: 'B1: Treble Clefs' },
  { id: 'b2', label: 'B2: Staff Lines'  },
  { id: 'b3', label: 'B3: Radial Glow'  },
  { id: 'b4', label: 'B4: Piano Keys'   },
  { id: 'b5', label: 'B5: Combined'     },
]

export default function ComparePage() {
  const [tab,    setTab]    = useState<MainTab>('a')
  const [subTab, setSubTab] = useState<Variant>('b5')

  const switchMain = (next: MainTab) => {
    setTab(next)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const switchSub = (next: Variant) => {
    setSubTab(next)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          Fixed compare bar
          Row 1: A / B / C  — Row 2: B sub-variants (B only)
      ══════════════════════════════════════════════════════════════ */}
      <div className="fixed inset-x-0 top-0 z-[300] bg-primary/95 backdrop-blur-md border-b border-ivory/10">

        {/* Row 1 */}
        <div className="mx-auto max-w-[1200px] px-[clamp(1.5rem,5vw,4rem)] h-14 flex items-center gap-5">
          <span className="hidden sm:block font-body text-[0.6875rem] font-medium tracking-[0.15em] uppercase text-ivory/40 shrink-0">
            Choose your hero style
          </span>
          <div className="flex gap-2">
            {MAIN_TABS.map(t => (
              <button
                key={t.id}
                onClick={() => switchMain(t.id)}
                className={[
                  'font-body text-xs font-medium tracking-[0.08em] uppercase px-4 py-2 rounded-sm transition-colors',
                  tab === t.id
                    ? 'bg-ivory text-primary'
                    : 'text-ivory/55 border border-ivory/20 hover:text-ivory hover:border-ivory/40',
                ].join(' ')}
              >
                <span className="hidden sm:inline">{t.label} — </span>
                {t.sub}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: B sub-variants only */}
        {tab === 'b' && (
          <div className="border-t border-ivory/10 bg-primary/40">
            <div className="mx-auto max-w-[1200px] px-[clamp(1.5rem,5vw,4rem)] h-11 flex items-center gap-1 overflow-x-auto">
              {SUB_TABS.map((st, idx) => (
                <button
                  key={st.id}
                  onClick={() => switchSub(st.id)}
                  className={[
                    'font-body text-[0.625rem] font-medium tracking-[0.06em] uppercase px-3 py-1.5 rounded-sm transition-colors whitespace-nowrap shrink-0',
                    subTab === st.id
                      ? 'bg-ivory/15 text-ivory border border-ivory/20'
                      : 'text-ivory/40 hover:text-ivory/70',
                  ].join(' ')}
                >
                  {idx === 0 && <span className="mr-1 opacity-60">←</span>}
                  {st.label}
                  {idx === SUB_TABS.length - 1 && <span className="ml-1 opacity-60">→</span>}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ══════════════════════════════════════════════════════════════
          Hero
      ══════════════════════════════════════════════════════════════ */}
      {tab === 'a' ? (
        <EtherealBeamsHero noNav />
      ) : tab === 'b' ? (
        <HeroElegant variant={subTab} />
      ) : tab === 'c' ? (
        <GlowyWavesHero />
      ) : tab === 'd' ? (
        <TubesHero />
      ) : (
        <StageParallaxHero />
      )}


      {/* ══════════════════════════════════════════════════════════════
          Shared sections
      ══════════════════════════════════════════════════════════════ */}
      <About />
      <Services />
      <Listen />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}
