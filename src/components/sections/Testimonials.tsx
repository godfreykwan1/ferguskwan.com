'use client';
import { TestimonialsColumn } from '@/components/ui/testimonials-columns';

const testimonials = [
  {
    text: "Fergus has a rare ability to connect deeply with the music and communicate that to his audience. Every recital is a genuine experience.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Margaret Lau",
    role: "Vancouver Chopin Society",
  },
  {
    text: "Studying with Fergus transformed my approach to the piano. His patience and musicality as a teacher are exceptional.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Daniel Park",
    role: "Student, Vancouver",
  },
  {
    text: "A remarkably gifted young musician. His performance at the Gifted Artists Concerto Gala left a lasting impression.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Susan Mitchell",
    role: "Audience Member, Chan Centre",
  },
  {
    text: "Fergus brings both technical brilliance and deep sensitivity to everything he performs. A truly special artist.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    name: "Prof. James Wong",
    role: "UBC School of Music",
  },
  {
    text: "His interpretation of Chopin was breathtaking — nuanced, heartfelt, and utterly committed.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Claire Arsenault",
    role: "Vancouver Westcoast Music Society",
  },
  {
    text: "My daughter has been studying with Fergus for two years. The progress and joy she has found in music is remarkable.",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    name: "Linda Chen",
    role: "Parent of Student",
  },
];

const firstColumn  = testimonials.slice(0, 2);
const secondColumn = testimonials.slice(2, 4);
const thirdColumn  = testimonials.slice(4, 6);

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{ background: 'var(--color-ivory)' }}
      className="py-24 px-6 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="text-center mb-16">
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: 'var(--color-accent)',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}>Testimonials</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300,
            color: 'var(--color-primary)',
          }}>What People Say</h2>
        </div>

        {/* Three scrolling columns */}
        <div
          className="flex justify-center gap-6"
          style={{ height: '600px', overflow: 'hidden' }}
        >
          <TestimonialsColumn
            testimonials={firstColumn}
            duration={12}
          />
          <TestimonialsColumn
            testimonials={secondColumn}
            duration={16}
            className="hidden md:block"
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            duration={14}
            className="hidden lg:block"
          />
        </div>

      </div>
    </section>
  );
}
