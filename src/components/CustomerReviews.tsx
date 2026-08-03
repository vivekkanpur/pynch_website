import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

import reviewer1 from '../data/images/reviewer_1.webp';
import reviewer2 from '../data/images/reviewer_2.webp';
import reviewer3 from '../data/images/reviewer_3.webp';
import reviewer4 from '../data/images/reviewer_4.webp';
import reviewer5 from '../data/images/reviewer_5.webp';
import reviewer6 from '../data/images/reviewer_6.webp';
import reviewer7 from '../data/images/reviewer_7.webp';
import reviewer8 from '../data/images/reviewer_8.webp';

const REVIEWS = [
  { id: 1, name: "Priya M.", avatar: reviewer1, rating: 5, text: "okay so i was NOT expecting to feel this way about a bralette but here we are. wore it all day and forgot i had it on. that never happens." },
  { id: 2, name: "Ananya S.", avatar: reviewer2, rating: 4, text: "got it for a wedding and ended up wearing it basically every weekend after. the fabric just gets better after washing. minus one star only because i want more colours." },
  { id: 3, name: "Neha K.", avatar: reviewer3, rating: 5, text: "i have a really hard time finding things that fit right and this actually did. like properly. i've already told four people about this brand." },
  { id: 4, name: "Riya P.", avatar: reviewer4, rating: 3, text: "the fabric is genuinely beautiful, softer than i expected. i'd size up though — i'm usually an M and the M was a bit snug on me." },
  { id: 5, name: "Kavya R.", avatar: reviewer5, rating: 5, text: "bought this on a whim and now i'm annoyed at myself for not finding it sooner. it's the kind of thing you want in every colour." },
  { id: 6, name: "Isha V.", avatar: reviewer6, rating: 4, text: "wore this under a silk saree and it was the first time in years i didn't have to keep adjusting. that alone is worth it." },
  { id: 7, name: "Simran D.", avatar: reviewer7, rating: 5, text: "honestly was skeptical at this price point but it really does feel different. my regular stuff feels cheap now which is a problem for my wallet." },
  { id: 8, name: "Aisha N.", avatar: reviewer8, rating: 3, text: "the design is lovely and the material feels premium but the band digs in a bit by evening. hoping it stretches with wear." }
];

export function CustomerReviews() {
  return (
    <section className="w-full overflow-hidden bg-[var(--theme-bg)] py-16 flex flex-col items-center">
      <h2 className="font-serif font-light text-3xl sm:text-4xl text-[var(--theme-teal)] uppercase tracking-[0.1em] mb-12 text-center">
        What Our Community Says
      </h2>
      <div className="w-full relative flex items-center">
        {/* We use two identical sets of reviews to create a seamless infinite loop */}
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 17.5, repeat: Infinity }}
        >
          {/* Duplicate the array to ensure smooth looping */}
          {[...REVIEWS, ...REVIEWS].map((review, i) => (
            <div 
              key={`${review.id}-${i}`} 
              className="w-[300px] sm:w-[400px] shrink-0 mx-4 p-8 flex flex-col justify-between gap-6 bg-[var(--theme-bg)] hover:bg-[var(--theme-text)] hover:text-[var(--theme-bg)] transition-colors duration-500 group"
            >
              <div className="flex items-center gap-4">
                <img src={review.avatar} alt={review.name} loading="lazy" decoding="async" className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="flex flex-col gap-1">
                  <span className="font-sans font-medium text-xs tracking-[0.2em] uppercase">
                    {review.name}
                  </span>
                  <div className="flex gap-1 text-[var(--theme-teal)] group-hover:text-[var(--theme-bg)] transition-colors duration-500">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star 
                        key={idx} 
                        size={14} 
                        fill={idx < review.rating ? "currentColor" : "none"} 
                        strokeWidth={idx < review.rating ? 0 : 1.5} 
                        className={idx >= review.rating ? "opacity-30" : ""} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="font-serif text-xl leading-relaxed italic whitespace-normal">
                "{review.text}"
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
