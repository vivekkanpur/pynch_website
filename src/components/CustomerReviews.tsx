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
  { id: 1, name: "Priya M.", avatar: reviewer1, rating: 5, text: "Absolutely in love with the quality. The fit is perfect and it feels so luxurious." },
  { id: 2, name: "Ananya S.", avatar: reviewer2, rating: 4, text: "Stunning details and fabric. I wish shipping was a bit faster, but worth the wait." },
  { id: 3, name: "Neha K.", avatar: reviewer3, rating: 5, text: "So comfortable yet incredibly flattering. The materials are definitely premium." },
  { id: 4, name: "Riya P.", avatar: reviewer4, rating: 3, text: "Beautiful design, but the sizing runs slightly small for me. Consider sizing up!" },
  { id: 5, name: "Kavya R.", avatar: reviewer5, rating: 5, text: "I've finally found my go-to brand for intimates. The sizing is spot on." },
  { id: 6, name: "Isha V.", avatar: reviewer6, rating: 4, text: "The packaging alone was an experience. The pieces are great, but a bit on the pricey side." },
  { id: 7, name: "Simran D.", avatar: reviewer7, rating: 5, text: "Sensual, honest, and truly beautifully crafted. I'll be buying more colors." },
  { id: 8, name: "Aisha N.", avatar: reviewer8, rating: 3, text: "The fabric is nice but the elastic band feels a bit restrictive after a few hours of wear." }
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
          transition={{ ease: "linear", duration: 35, repeat: Infinity }}
        >
          {/* Duplicate the array to ensure smooth looping */}
          {[...REVIEWS, ...REVIEWS].map((review, i) => (
            <div 
              key={`${review.id}-${i}`} 
              className="w-[300px] sm:w-[400px] shrink-0 mx-4 p-8 flex flex-col justify-between gap-6 bg-[var(--theme-bg)] hover:bg-[var(--theme-text)] hover:text-[var(--theme-bg)] transition-colors duration-500 group"
            >
              <div className="flex items-center gap-4">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
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
