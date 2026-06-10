import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';

type Point = {
  x: number;
  y: number;
};

interface WaveConfig {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
}

const highlightPills = ['Immersive visuals', 'Responsive motion', 'GPU friendly'] as const;

const heroStats: { label: string; value: string }[] = [
  { label: 'Live installations', value: '320+' },
  { label: 'Latency', value: '8ms' },
  { label: 'Teams onboarded', value: '120+' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const statsVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.08 },
  },
};

export function GlowyWavesHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 });
  const clefsRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    opacity: number;
    direction: number;
    speed: number;
    active: boolean;
    rotation: number;
    rotationSpeed: number;
    symbol: string;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let animationId: number;
    let time = 0;

    const computeThemeColors = () => {
      const rootStyles = getComputedStyle(document.documentElement);

      // Helper to convert any CSS color to a Canvas-compatible format
      const resolveColor = (variables: string[], alpha = 1) => {
        // Create a temporary element to get computed color
        const tempEl = document.createElement('div');
        tempEl.style.position = 'absolute';
        tempEl.style.visibility = 'hidden';
        tempEl.style.width = '1px';
        tempEl.style.height = '1px';
        document.body.appendChild(tempEl);

        let color = `rgba(255, 255, 255, ${alpha})`;

        for (const variable of variables) {
          const value = rootStyles.getPropertyValue(variable).trim();
          if (value) {
            // Try to set the background color using the CSS variable
            tempEl.style.backgroundColor = `var(${variable})`;
            const computedColor = getComputedStyle(tempEl).backgroundColor;

            if (computedColor && computedColor !== 'rgba(0, 0, 0, 0)') {
              // Convert RGB to RGBA with alpha if needed
              if (alpha < 1) {
                const rgbMatch = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
                if (rgbMatch) {
                  color = `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${alpha})`;
                } else {
                  color = computedColor;
                }
              } else {
                color = computedColor;
              }
              break;
            }
          }
        }

        document.body.removeChild(tempEl);
        return color;
      };

      return {
        backgroundTop: resolveColor(['--background'], 1),
        backgroundBottom: resolveColor(['--muted', '--background'], 0.95),
        wavePalette: [
          {
            offset: 0,
            amplitude: 70,
            frequency: 0.003,
            color: resolveColor(['--primary'], 0.8),
            opacity: 0.45,
          },
          {
            offset: Math.PI / 2,
            amplitude: 90,
            frequency: 0.0026,
            color: resolveColor(['--accent', '--primary'], 0.7),
            opacity: 0.35,
          },
          {
            offset: Math.PI,
            amplitude: 60,
            frequency: 0.0034,
            color: resolveColor(['--secondary', '--foreground'], 0.65),
            opacity: 0.3,
          },
          {
            offset: Math.PI * 1.5,
            amplitude: 80,
            frequency: 0.0022,
            color: resolveColor(['--primary-foreground', '--foreground'], 0.25),
            opacity: 0.25,
          },
          {
            offset: Math.PI * 2,
            amplitude: 55,
            frequency: 0.004,
            color: resolveColor(['--foreground'], 0.2),
            opacity: 0.2,
          },
        ] satisfies WaveConfig[],
      };
    };

    let themeColors = computeThemeColors();

    const handleThemeMutation = () => {
      themeColors = computeThemeColors();
    };

    const observer = new MutationObserver(handleThemeMutation);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const mouseInfluence = prefersReducedMotion ? 10 : 70;
    const influenceRadius = prefersReducedMotion ? 160 : 320;
    const smoothing = prefersReducedMotion ? 0.04 : 0.1;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const recenterMouse = () => {
      const centerPoint = { x: canvas.width / 2, y: canvas.height / 2 };
      mouseRef.current = centerPoint;
      targetMouseRef.current = centerPoint;
    };

    const handleResize = () => {
      resizeCanvas();
      recenterMouse();
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseLeave = () => {
      recenterMouse();
    };

    resizeCanvas();
    recenterMouse();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const drawWave = (wave: WaveConfig) => {
      ctx.save();
      ctx.beginPath();

      for (let x = 0; x <= canvas.width; x += 4) {
        const dx = x - mouseRef.current.x;
        const dy = canvas.height / 2 - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / influenceRadius);
        const mouseEffect = influence * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + wave.offset);

        const y =
          canvas.height / 2 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) * (wave.amplitude * 0.45) +
          mouseEffect;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur = 35;
      ctx.shadowColor = wave.color;
      ctx.stroke();

      ctx.restore();
    };

    const musicSymbols = [
      '𝄞',  // treble clef
      '𝄢',  // bass clef
      '♩',  // quarter note
      '♪',  // eighth note
      '♫',  // beamed eighth notes
      '♬',  // beamed sixteenth notes
      '𝄽',  // quarter rest
      '♭',  // flat
      '♯',  // sharp
      '𝄪',  // double sharp
    ];

    const animate = () => {
      time += 1;

      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * smoothing;

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, themeColors.backgroundTop);
      gradient.addColorStop(1, themeColors.backgroundBottom);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      themeColors.wavePalette.forEach(drawWave);

      // Check if mouse is near any wave line
      const mouseX = Math.round(mouseRef.current.x);
      if (mouseX >= 0 && mouseX < canvas.width) {
        themeColors.wavePalette.forEach((wave, i) => {
          const y = canvas.height / 2 +
            Math.sin(mouseX * wave.frequency + time * 0.002 + wave.offset) *
              wave.amplitude +
            Math.sin(mouseX * wave.frequency * 0.4 + time * 0.003) *
              (wave.amplitude * 0.45);

          const dist = Math.abs(mouseRef.current.y - y);

          if (dist < 20 && Math.random() < 0.03) {
            clefsRef.current.push({
              x: mouseX + (Math.random() - 0.5) * 40,
              y: y,
              size: 32 + Math.random() * 48,
              opacity: 0.8,
              direction: (Math.random() - 0.5) * 4,
              speed: 0.5 + Math.random() * 1.5,
              active: true,
              rotation: (Math.random() - 0.5) * Math.PI * 0.5,
              rotationSpeed: (Math.random() - 0.5) * 0.05,
              symbol: musicSymbols[Math.floor(Math.random() * musicSymbols.length)],
            });
          }
        });
      }

      // Draw and animate clefs
      clefsRef.current = clefsRef.current.filter(clef => clef.opacity > 0.01);
      clefsRef.current.forEach(clef => {
        clef.y -= clef.speed;
        clef.x += clef.direction;
        clef.opacity -= 0.01;
        clef.rotation += clef.rotationSpeed;

        ctx.save();
        ctx.globalAlpha = clef.opacity;
        ctx.translate(clef.x, clef.y);
        ctx.rotate(clef.rotation);
        ctx.font = `${clef.size}px serif`;
        ctx.fillStyle = '#92400E';
        ctx.fillText(clef.symbol, 0, 0);
        ctx.restore();
      });

      // Limit max clefs to 40 to avoid performance issues
      if (clefsRef.current.length > 40) {
        clefsRef.current = clefsRef.current.slice(-40);
      }

      animationId = window.requestAnimationFrame(animate);
    };

    animationId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-background"
      role="region"
      aria-label="Glowing waves hero section"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-foreground/[0.035] blur-[140px] dark:bg-foreground/[0.06]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-foreground/[0.025] blur-[120px] dark:bg-foreground/[0.05]" />
        <div className="absolute top-1/2 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/[0.02] blur-[150px] dark:bg-primary/[0.05]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-24 text-center md:px-8 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full">
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-4xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl"
          >
            <span style={{fontFamily:"'Cormorant Garamond',serif", fontWeight:300}}>
              Fergus Kwan
            </span>
          </motion.h1>

          <motion.p variants={itemVariants}
            style={{fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic"}}
            className="mb-4 text-2xl md:text-3xl text-foreground/70">
            Concert Pianist &amp; Composer
          </motion.p>

          <motion.p variants={itemVariants} className="mx-auto mb-10 max-w-3xl text-lg text-foreground/70 md:text-2xl">
            Based in Vancouver — performing repertoire from Baroque to contemporary music.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" className="group gap-2 rounded-full px-8 text-base uppercase tracking-[0.2em]">
              Book a Lesson
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-border/40 bg-background/60 px-8 text-base text-foreground/80 backdrop-blur transition-all hover:border-border/60 hover:bg-background/70 dark:border-border/50 dark:bg-background/40 dark:text-foreground/70 dark:hover:border-border/70 dark:hover:bg-background/50"
            >
              Listen Now
            </Button>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
