import React from 'react';
import { motion } from 'motion/react';
import { MoodsSection } from '../components/MoodsSection';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
};

export default function PhilosophyView() {
  return (
    <div className="w-full bg-[#08514C] min-h-screen overflow-hidden relative">
      
      {/* Our World / Brand Philosophy Section */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-12 md:px-20 py-24 flex flex-col justify-center items-center text-center space-y-12 text-[#F9F6F0] selection:bg-[#CFE11C] selection:text-black">
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
          <h1 className="font-serif text-5xl md:text-6xl text-[#CFE11C] font-light">Our World</h1>
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-[#F9F6F0]/70">Brand Philosophy</p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariants}
          className="space-y-8 font-serif text-xl sm:text-2xl md:text-3xl font-light leading-[1.6] md:leading-[1.8] relative z-10"
        >
          <p>
            For decades, intimate wear has been sold through a single, narrow prism: performance. Padding designed to push, wire engineered to cage, and lace woven to conform to an external gaze. It was a construction site, masquerading as elegance.
          </p>
          <p>
            When PYNCH was founded, the goal wasn't just to make pretty garments. It was to strip away the expectations. The word PYNCH is a reminder that we feel through touch, that our clothes should be a continuation of our sensory experience, not a correction of it.
          </p>

          <p className="italic font-medium text-2xl sm:text-3xl md:text-4xl text-[#CFE11C] py-8">
            "Dress the person, not the performance."
          </p>

          <p>
            This is more than a slogan. It is an architectural methodology. We do not use hardware. We do not use plastic spacers or steel cages. We use European micro-modal spun from sustainable beechwood, sand-washed Mulberry silk, and flexible titanium alloy that mimics the heat of your skin.
          </p>
          <p>
            We believe that true luxury is not a performance put on for an audience. It is the quiet, physical ease of feeling entirely at home in your own skin. PYNCH is here to wrap you in that ease.
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
