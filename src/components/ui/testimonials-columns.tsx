'use client';
import React from 'react';
import { motion } from 'motion/react';

type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: '-50%',
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-8 rounded-lg border max-w-xs w-full"
                  style={{
                    background: 'var(--color-cream)',
                    borderColor: 'var(--color-border)',
                    boxShadow: '0 2px 16px rgba(28,25,23,0.06)',
                  }}
                  key={i}
                >
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.05rem',
                    lineHeight: 1.7,
                    color: 'var(--color-primary)',
                    fontStyle: 'italic',
                  }}>{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <img width={40} height={40} src={image} alt={name} className="h-10 w-10 rounded-full" />
                    <div className="flex flex-col">
                      <div
                        style={{ color: 'var(--color-primary)', fontWeight: 500 }}
                        className="tracking-tight leading-5"
                      >{name}</div>
                      <div
                        style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}
                        className="leading-5 tracking-tight"
                      >{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
