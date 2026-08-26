import React from 'react';
import { motion } from 'motion/react';
import { MoodsSection } from '../components/MoodsSection';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } },
};

export default function PhilosophyView() {
  return (
    <div className="w-full bg-[#08514C] min-h-screen overflow-hidden relative">
      
      {/* Our World / Brand Philosophy Section */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-12 md:px-20 py-24 flex flex-col justify-center items-center text-center space-y-12 text-[var(--theme-cream)] selection:bg-[var(--theme-lime)] selection:text-black">
        {/* Subtle abstract background element */}
        <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-[#0A5D57] rounded-full mix-blend-screen filter blur-[100px] opacity-30 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        
        {/* Top Label */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="space-y-4 mb-8"
        >
          <h1 className="font-serif text-5xl md:text-6xl text-[var(--theme-lime)] font-light">Our World</h1>
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-[var(--theme-cream)]/70">Brand Philosophy</p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariants}
          className="space-y-8 font-serif text-xl sm:text-2xl md:text-3xl font-light leading-[1.6] md:leading-[1.8] relative z-10"
        >
          <p>
            For decades, intimate wear was sold through a single, narrow prism performance. Padding designed to push. Wire engineered to cage. Lace woven to conform to an external gaze.
          </p>
          <p>
            It was a construction site, masquerading as elegance.
          </p>
          <p>
            We started PYNCH because we had one quiet, stubborn belief: a woman is not one thing. She is a seductress on Monday, a romantic on a rainy Wednesday, unruly on Thursday, and finally, gloriously still on Sunday night. She contains multitudes. Her intimate wear should too.
          </p>

          <p className="italic font-medium text-2xl sm:text-3xl md:text-4xl text-[var(--theme-lime)] py-6">
            &ldquo;Dress the person, not the performance.&rdquo;
          </p>

          <p>
            So we built a language for her, not a uniform. Four moods. Four versions of her. None of them wrong. All of them real.
          </p>

          <div className="py-4 space-y-3 font-serif text-2xl sm:text-3xl font-normal text-[var(--theme-cream)]/90">
            <p><span className="text-[var(--theme-lime)] italic">Aarambh.</span> The seductress.</p>
            <p><span className="text-[var(--theme-lime)] italic">Ishq.</span> The romantic.</p>
            <p><span className="text-[var(--theme-lime)] italic">Shararat.</span> The playful.</p>
            <p><span className="text-[var(--theme-lime)] italic">Sukoon.</span> The stillness.</p>
          </div>

          <p>
            The word PYNCH itself is a reminder that we feel through touch, that our clothes should be a continuation of our sensory experience, not a correction of it. So we removed everything that got in the way of feeling. No hardware. No plastic spacers. No steel cages.
          </p>
          <p>
            What we kept is what matters. Whisper-fine polyamide that moves like a second skin. The world&apos;s finest polyester engineered to feel like cotton, and to last longer than it. Pure cotton where the body needs to breathe. And a flexible titanium alloy that mimics the heat of your own skin because the softest thing against a woman&apos;s body should be closer to her body than to a machine.
          </p>
          <p>
            We believe true luxury is not a performance put on for an audience. It is the quiet, physical ease of feeling entirely at home in your own skin in whichever mood found you today.
          </p>
          <p>
            PYNCH is here to wrap you in that ease.
          </p>
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[var(--theme-lime)] italic pt-4">
            Just a pynch is enough.
          </p>

          <div className="pt-16 pb-8 flex justify-center w-full">
            <span style={{ fontFamily: "'Mrs Saint Delafield', cursive" }} className="text-5xl md:text-7xl lg:text-8xl transform -rotate-2">
              Love, Tashu
            </span>
          </div>
        </motion.div>
      </section>

      {/* Re-added horizontal looping mood area */}
      <div className="relative z-10 w-full pb-24 bg-[#08514C]">
        <MoodsSection />
      </div>
    </div>
  );
}
