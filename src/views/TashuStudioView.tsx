import React from 'react';
import { motion } from 'motion/react';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function TashuStudioView() {
  return (
    <div className="w-full bg-[var(--theme-bg)] min-h-screen text-[var(--theme-text)] pt-24">
      
      {/* 1. About the Brand */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24 sm:pb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="w-full aspect-[4/5] overflow-hidden bg-[#F4F0EA] flex items-center justify-center border border-[var(--theme-border)]"
        >
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-gray-400">Founder Image Coming Soon</span>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="flex flex-col justify-center space-y-6 max-w-lg mx-auto lg:mx-0 text-center lg:text-left"
        >
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--theme-teal)] font-light">About The Brand</h2>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
            Founded with the philosophy that garments should honor your natural geometry, PYNCH reimagines intimate wear. We believe in creating pieces that support rather than shape, using carefully sourced materials that feel like a second skin.
          </p>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
            Every stitch is a testament to our commitment to comfort, sustainability, and the celebration of the individual. Our atelier in New Delhi works tirelessly to bring you essentials that you'll never want to take off.
          </p>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light italic mt-4">
            We dress the person, not the performance. Welcome to our world.
          </p>
        </motion.div>
      </section>

      {/* 2. Brand Quote Banner */}
      <section className="w-full bg-[var(--theme-teal)] py-12 px-4 border-y border-[var(--theme-teal)]/80">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="font-serif text-xl sm:text-2xl text-white font-light tracking-wide leading-relaxed">
            With each of our products, there is an experience, rather than just aesthetics—a feeling of absolute comfort that honors your everyday biography.
          </p>
        </motion.div>
      </section>

      {/* 3. Introduction */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="flex flex-col justify-center space-y-6 max-w-lg mx-auto lg:mx-0 text-center lg:text-left order-2 lg:order-1"
        >
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--theme-teal)] font-light">Introduction</h2>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
            Our journey began with a simple question: why should intimate wear be uncomfortable? We set out to redefine the standards of everyday luxury, focusing on breathability, softness, and a fit that adapts to you, not the other way around.
          </p>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
            Through rigorous testing and a deep understanding of textile science, we developed our signature fabrics. They are designed to move seamlessly with your body, providing invisible support throughout your day.
          </p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="w-full aspect-[4/5] overflow-hidden bg-[#F4F0EA] flex items-center justify-center border border-[var(--theme-border)] order-1 lg:order-2"
        >
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-gray-400 text-center">Editorial Image Coming Soon</span>
        </motion.div>
      </section>

      {/* 4. Brand Story */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="w-full max-w-md mx-auto aspect-[3/4] overflow-hidden bg-[#F4F0EA] flex items-center justify-center border border-[var(--theme-border)]"
        >
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-gray-400 text-center">Editorial Image Coming Soon</span>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="flex flex-col justify-center space-y-6 max-w-lg mx-auto lg:mx-0 text-center lg:text-left"
        >
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--theme-teal)] font-light">Brand Story</h2>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
            The heart of PYNCH lies in our dedication to mindful creation. We bypass mass production in favor of slow, deliberate craftsmanship. By partnering directly with ethical manufacturers, we ensure that every piece meets our uncompromising standards.
          </p>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
            We are more than just an intimate apparel brand; we are a community of individuals who value authenticity and physical well-being.
          </p>
        </motion.div>
      </section>

      {/* 5. Our Promise */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="flex flex-col justify-center space-y-6 max-w-lg mx-auto lg:mx-0 text-center lg:text-left order-2 lg:order-1"
        >
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--theme-teal)] font-light">Our Promise</h2>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
            We promise to always prioritize your comfort above all else. To design with intention, source with responsibility, and produce with transparency. 
          </p>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
            When you wear PYNCH, you are choosing garments that respect your body and the environment. This is our commitment to you, from our studio to your skin.
          </p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="w-full aspect-[4/5] overflow-hidden bg-[#F4F0EA] flex items-center justify-center border border-[var(--theme-border)] order-1 lg:order-2"
        >
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-gray-400 text-center">Editorial Image Coming Soon</span>
        </motion.div>
      </section>

    </div>
  );
}
