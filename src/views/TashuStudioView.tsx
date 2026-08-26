import React from 'react';
import { motion } from 'motion/react';
import image1 from '../data/images/Team/WhatsApp Image 2026-08-09 at 10.54.10 AM.jpeg';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as any } },
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
          className="w-full aspect-[4/5] overflow-hidden bg-[var(--theme-cream)] flex items-center justify-center border border-[var(--theme-border)]"
        >
          <img src={image1} alt="Tashu" className="w-full h-full object-cover" />
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
            Tashu's Studio is an Indian atelier of sensual intimate wear, founded on a single conviction that the most personal garment a woman owns should be the most thoughtfully made.
          </p>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
            We are not a lingerie label in the ordinary sense. We are a studio in the truest meaning of the word: a place of craft, of quiet obsession with fabric, fit and finish, of designs drawn for the Indian body and the Indian sensibility. Every piece that leaves our atelier is made to be worn against the skin of a woman who understands that elegance begins in private, long before it is ever seen.
          </p>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
            Our house of brands is led by Pynch our flagship line of sensual intimate wear and expands into loungewear, bridal trousseau, and heirloom silk essentials, each carrying the same signature: refined, unhurried, unmistakably ours.
          </p>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light italic mt-4">
            At Tashu's Studio, we do not follow seasons. We follow the woman.
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
          <p className="font-sans text-sm text-[var(--theme-teal)] leading-relaxed font-medium italic">A word from Tashu</p>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
            There is a moment, every morning, before the world arrives before the meetings, the children, the phone calls, the roles a woman must play. In that quiet moment, she chooses what will touch her skin first.
          </p>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
            I built Tashu's Studio for that moment.
          </p>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
            For years I watched the women around me mothers, daughters, brides, businesswomen dress magnificently for the world and settle for the ordinary underneath. Beautiful sarees over tired straps. Couture gowns over ill-fitting cups. A lifetime of choosing everything else with care, and this one thing with resignation.
          </p>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
            That gap is what this studio exists to close.
          </p>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
            Tashu's Studio is my invitation to the Indian woman to bring the same intention she brings to her jewellery, her home, her table into her most intimate wardrobe. To wear silk because she loves the feel of it. To wear lace because it makes her smile when no one is watching. To choose beauty not as performance, but as a private, daily ritual of self-regard.
          </p>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
            This is not a brand. It is a return of authorship, of intimacy, of quiet luxury to the woman it always belonged to.
          </p>
          <p className="font-sans text-sm text-[var(--theme-teal)] leading-relaxed font-medium mt-4">
            Tashu
          </p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="w-full aspect-[4/5] overflow-hidden bg-[var(--theme-cream)] flex items-center justify-center border border-[var(--theme-border)] order-1 lg:order-2"
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
          className="w-full max-w-md mx-auto aspect-[3/4] overflow-hidden bg-[var(--theme-cream)] flex items-center justify-center border border-[var(--theme-border)]"
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
            Tashu's Studio was born in a dressing room.
          </p>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
            Not a boutique, not a boardroom a dressing room, on the morning of a wedding, where the bride, a young woman Tashu had known since childhood, stood in a lehenga worth more than a small apartment, and wept because the bralette beneath it did not fit. It was imported, expensive, celebrated by every magazine and it had been designed for a body that was not hers.
          </p>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
            Tashu remembered that moment for years.
          </p>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
            She remembered, too, the women of her own generation who had never questioned what they wore underneath who had inherited their mothers' habits, their mothers' compromises, their mothers' silences around the body. She remembered the market: on one side, mass brands built for volume; on the other, imported luxury built for someone else's proportions, someone else's climate, someone else's skin.
          </p>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
            Between them, an entire generation of Indian women successful, discerning, worldly with nowhere to go.
          </p>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
            Tashu's Studio was founded to occupy that empty space.
          </p>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
            We began quietly. A small atelier. A handful of master tailors, many of them trained in the fine craft traditions of Lucknow, Kolkata and Bengaluru. Fabrics sourced from the mills of Como and the looms of South India. Fit patterns drafted from the measurements of real Indian women not adapted from Western blocks, but built from the ground up.
          </p>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
            Our first line, Pynch, was designed for the woman who had waited her turn. Sensual without being loud. Luxurious without being loud about it. Made for the body she actually has, not the body a foreign catalogue insists she should have.
          </p>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
            Since then, the studio has grown into loungewear for her mornings, bridal for her beginnings, silk essentials for her keeping but the founding conviction has never moved.
          </p>
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light italic mt-4">
            Every piece is still made the way the very first one was: slowly, deliberately, and for her alone.
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
            We make five promises to every woman who enters this studio. We keep each one before we keep anything else.
          </p>
          
          <div className="space-y-4 mt-4">
            <div>
              <h3 className="font-sans text-sm font-medium text-[var(--theme-teal)]">1. Fit, first and always.</h3>
              <p className="font-sans text-sm text-gray-600 leading-relaxed font-light mt-1">
                Every Tashu's Studio pattern is drafted from Indian body data real measurements from real women across regions, ages, and life stages. Nothing we sell has been translated from a foreign block. If it does not sit correctly on you, it does not belong to us.
              </p>
            </div>
            
            <div>
              <h3 className="font-sans text-sm font-medium text-[var(--theme-teal)]">2. Fabric worthy of the skin it touches.</h3>
              <p className="font-sans text-sm text-gray-600 leading-relaxed font-light mt-1">
                We work only with mills and looms whose craft we have verified in person Italian lace, French tulle, South Indian mulberry silk, Egyptian long-staple cotton. No synthetic shortcuts in the layers that touch you. No compromises we would not accept for ourselves.
              </p>
            </div>
            
            <div>
              <h3 className="font-sans text-sm font-medium text-[var(--theme-teal)]">3. Craft over speed.</h3>
              <p className="font-sans text-sm text-gray-600 leading-relaxed font-light mt-1">
                Our atelier does not chase seasons or trends. A piece is released when it is ready, not when the calendar demands. Each garment passes through the hands of a named tailor, whose signature is recorded in our house ledger.
              </p>
            </div>
            
            <div>
              <h3 className="font-sans text-sm font-medium text-[var(--theme-teal)]">4. Privacy, protected.</h3>
              <p className="font-sans text-sm text-gray-600 leading-relaxed font-light mt-1">
                What you buy from us is your business, and ours alone. Discreet packaging. Discreet billing. Confidential fittings, in-studio or at home. Your data, your measurements, your choices held with the same care as the garments themselves.
              </p>
            </div>
            
            <div>
              <h3 className="font-sans text-sm font-medium text-[var(--theme-teal)]">5. A relationship, not a transaction.</h3>
              <p className="font-sans text-sm text-gray-600 leading-relaxed font-light mt-1">
                Every Tashu's Studio client is offered a lifetime fit consultation. Your body will change through years, through motherhood, through seasons of life and we will change with it. Your first fitting with us is the beginning of a conversation, not the end of a sale.
              </p>
            </div>
          </div>
          
          <p className="font-sans text-sm text-gray-600 leading-relaxed font-light italic mt-6 border-t border-[var(--theme-border)] pt-4">
            Tashu's Studio. Made slowly, in India, for the woman who has waited her turn.
          </p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="w-full aspect-[4/5] overflow-hidden bg-[var(--theme-cream)] flex items-center justify-center border border-[var(--theme-border)] order-1 lg:order-2"
        >
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-gray-400 text-center">Editorial Image Coming Soon</span>
        </motion.div>
      </section>

    </div>
  );
}
