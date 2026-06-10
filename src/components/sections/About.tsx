export default function About() {
  return (
    <section id="about" className="bg-surface py-[clamp(4rem,8vw,8rem)]">
      <div className="mx-auto max-w-[1200px] px-[clamp(1.5rem,5vw,4rem)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(2.5rem,6vw,5rem)] items-start">

          <div className="relative w-full aspect-[3/4] overflow-hidden">
            <img
              src="/images/fergus.jpg"
              alt="Fergus Kwan at the piano"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Content */}
          <div className="pt-1">
            <p
              className="font-body text-[0.6875rem] font-medium tracking-[0.15em] uppercase mb-5"
              style={{ color: 'var(--color-secondary)' }}
            >
              About
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.15] text-primary mb-7">
              A Life Shaped by Music
            </h2>

            <div
              className="font-body text-[1rem] font-light leading-[1.8] mb-10 space-y-[1.125rem]"
              style={{ color: 'var(--color-primary)' }}
            >
              <p>
                Fergus Kwan is a concert pianist and composer based in Vancouver,
                and has graduated from the University of British Columbia. He holds
                a Bachelor of Music degree majoring in Piano Performance and Composition,
                and is currently pursuing a Masters degree with Dr. David Fung.
              </p>
              <p>
                He has studied with Dr. Corey Hamm, Dr. Henri-Paul Sicsic, Prof. Rena Sharon,
                Dr. Jennifer Butler, and Prof. Serra Hwang, and has participated in masterclasses
                with Prof. Jon Kimura Parker, Dr. Henry Kramer, Ilana Vered, and Nelson Goerner.
              </p>
              <p>
                A passionate performer, Fergus has given recitals for the Vancouver Chopin Society,
                the Vancouver Westcoast Music Society, and Mastery School of Music, and has appeared
                at the Five Piano Fantasy concert at the Chan Centre, the VSO Day of Music,
                and the Gifted Artists Concerto Gala. He has performed with the Chilliwack Symphony
                Orchestra and in countries across Europe and North America.
              </p>
            </div>

            <div
              className="font-body text-[0.8125rem] font-light leading-[1.75] mb-10"
              style={{ color: 'var(--color-primary)' }}
            >
              <span
                className="block font-body text-[0.6875rem] font-medium tracking-[0.15em] uppercase mb-2"
                style={{ color: 'var(--color-secondary)' }}
              >
                Recognition
              </span>
              Canadian Music Competition · Vancouver Westcoast Music Society · Pacific Youth
              International Competition · Architecture of Music Competition · Elevato International
              Piano Competition · Best Performance of a work by Chopin (Vancouver Chopin Society)
            </div>

            <blockquote className="border-l-2 border-accent pl-6">
              <p
                className="font-display text-[clamp(1.125rem,2.5vw,1.5rem)] italic font-light leading-[1.55] mb-3.5"
                style={{ color: 'var(--color-primary)', opacity: 0.8 }}
              >
                &ldquo;A passionate performer spanning Baroque to contemporary music —
                performing across Europe, North America, and the concert stages of Vancouver.&rdquo;
              </p>
              <cite
                className="font-body text-[0.6875rem] font-medium tracking-[0.12em] uppercase not-italic"
                style={{ color: 'var(--color-secondary)' }}
              >
                Fergus Kwan
              </cite>
            </blockquote>
          </div>

        </div>
      </div>
    </section>
  )
}
