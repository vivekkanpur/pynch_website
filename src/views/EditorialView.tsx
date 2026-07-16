import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, User, ArrowRight, X } from 'lucide-react';
import { EDITORIAL_ARTICLES } from '../data/products';
import { Product } from '../types';

interface EditorialViewProps {
  onViewChange: (view: string) => void;
}

export default function EditorialView({ onViewChange }: EditorialViewProps) {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const activeArticle = EDITORIAL_ARTICLES.find((art) => art.id === selectedArticleId);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16 sm:py-24 space-y-24">
      {/* Editorial Header */}
      <div className="text-center space-y-6 max-w-2xl mx-auto pb-12 border-b border-[#E8E3DB]">
        <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-gray-400 block">
          The Pynch Chronicles
        </span>
        <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl tracking-widest font-light text-[#111111] uppercase">
          The Essential <br />
          <span className="italic">Journal</span>
        </h2>
        <p className="font-sans italic text-base text-gray-500 leading-relaxed font-light">
          "A quarterly gathering of reflections on skin, clothes, sustainability, and physical freedom."
        </p>
      </div>

      {/* Main Campaign Image Row */}
      <section className="relative w-full aspect-[16/9] bg-[#F4F0EA] overflow-hidden no-radius border border-[#E8E3DB]">
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600"
          alt="PYNCH Lookbook Campaign"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover grayscale-15 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-[#111111]/20 to-transparent"></div>
        <div className="absolute bottom-0 inset-x-0 p-8 sm:p-12 text-white space-y-4 max-w-xl">
          <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-white/70">Summer Release Lookbook</span>
          <h3 className="font-sans text-2xl sm:text-4xl font-light tracking-wide">Sensual Honesty: The Body in Solitude</h3>
          <p className="font-sans font-light italic text-xs sm:text-sm text-white/80 leading-relaxed">
            "A series of photos capturing raw silk and cotton contours in warm morning light, showing that beautiful forms don't need wire-mesh cages."
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16">
        {EDITORIAL_ARTICLES.map((art) => (
          <article
            key={art.id}
            onClick={() => setSelectedArticleId(art.id)}
            className="group cursor-pointer space-y-8 flex flex-col justify-between border border-[#E8E3DB] p-6 sm:p-10 hover:bg-[#F4F0EA]/50 transition-colors no-radius"
            id={`editorial-article-${art.id}`}
          >
            <div className="space-y-6">
              {/* Cover Thumbnail */}
              <div className="aspect-[16/10] bg-[#F4F0EA] overflow-hidden no-radius">
                <img
                  src={art.image}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 mix-blend-multiply"
                />
              </div>

              {/* Meta */}
              <div className="flex gap-4 items-center font-sans text-[9px] text-gray-400 uppercase tracking-[0.2em]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 stroke-[1]" />
                  <span>{art.date}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 stroke-[1]" />
                  <span>{art.readTime}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 stroke-[1]" />
                  <span>by {art.author}</span>
                </span>
              </div>

              {/* Title & Excerpt */}
              <div className="space-y-3">
                <h3 className="font-sans text-2xl tracking-[0.1em] group-hover:text-gray-600 transition-colors uppercase font-light">
                  {art.title}
                </h3>
                <p className="font-sans text-sm font-light italic text-gray-500 leading-relaxed">
                  "{art.subtitle}"
                </p>
                <p className="font-sans font-light text-xs text-gray-600 leading-relaxed pt-2">
                  {art.excerpt}
                </p>
              </div>
            </div>

            {/* Read Button */}
            <div className="pt-6 flex items-center gap-3 text-[11px] font-sans tracking-[0.2em] uppercase text-[#111111] font-light group-hover:text-gray-600 transition-colors border-t border-[#E8E3DB]">
              <span>Read Reflection</span>
              <ArrowRight className="w-4 h-4 stroke-[1] transition-transform group-hover:translate-x-1" />
            </div>
          </article>
        ))}
      </section>

      {/* Philosophy Quote Ribbon */}
      <section className="text-center py-16 border-y border-[#E8E3DB] max-w-4xl mx-auto space-y-6">
        <blockquote className="font-sans italic font-light text-xl sm:text-2xl text-gray-800 leading-relaxed">
          “Physical ease is the foundation of emotional honesty. Lingerie shouldn't feel like armor you put on to face the world; it should feel like the quiet sanctuary you return to.”
        </blockquote>
        <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#111111] font-medium block">
          — Atelier Tashu Dictionary of Comfort
        </span>
      </section>

      {/* Expanded Article Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6 lg:p-10">
          <div className="w-full max-w-4xl bg-white h-full max-h-[90vh] overflow-y-auto no-radius shadow-2xl relative flex flex-col">
            {/* Header Sticky Bar */}
            <div className="p-6 border-b border-[#E8E3DB] flex justify-between items-center bg-white sticky top-0 z-10">
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-gray-400">
                Pynch Essays ╱ By Tashu
              </span>
              <button
                onClick={() => setSelectedArticleId(null)}
                className="p-2 text-gray-400 hover:text-black transition-colors focus:outline-none"
                id="close-article-modal"
              >
                <X className="w-5 h-5 stroke-[1]" />
              </button>
            </div>

            {/* Content Stage */}
            <div className="p-6 sm:p-12 space-y-10 flex-1">
              <div className="space-y-6 max-w-3xl mx-auto text-center">
                <h2 className="font-sans text-3xl sm:text-4xl tracking-[0.1em] font-light uppercase">
                  {activeArticle.title}
                </h2>
                <p className="font-sans font-light italic text-base text-gray-500">
                  {activeArticle.subtitle}
                </p>
                
                <div className="flex justify-center gap-6 font-sans text-[10px] text-gray-400 border-y border-[#E8E3DB] py-4 uppercase tracking-[0.2em]">
                  <span>Date: {activeArticle.date}</span>
                  <span>╱</span>
                  <span>Read: {activeArticle.readTime}</span>
                  <span>╱</span>
                  <span>Author: {activeArticle.author}</span>
                </div>
              </div>

              {/* Cover image in detail */}
              <div className="w-full aspect-[16/9] bg-[#F4F0EA] overflow-hidden no-radius border border-[#E8E3DB]">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover mix-blend-multiply"
                />
              </div>

              {/* Essay Text body */}
              <div className="max-w-2xl mx-auto space-y-8 text-[#111111] leading-relaxed font-sans text-sm sm:text-base font-light">
                {activeArticle.content.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}

                {activeArticle.quote && (
                  <div className="border-l border-[#111111] pl-8 py-4 my-10 bg-[#F4F0EA]/30">
                    <p className="font-sans font-light italic text-xl sm:text-2xl text-[#111111] leading-relaxed">
                      "{activeArticle.quote}"
                    </p>
                  </div>
                )}
              </div>

              {/* Link back to collection */}
              {activeArticle.collectionLink && (
                <div className="max-w-2xl mx-auto pt-12 border-t border-[#E8E3DB] text-center">
                  <button
                    onClick={() => {
                      setSelectedArticleId(null);
                      onViewChange('shop');
                    }}
                    className="bg-[#111111] text-white px-10 py-5 text-[11px] font-sans tracking-[0.2em] uppercase hover:bg-black transition-colors no-radius font-light"
                    id="article-shop-cta"
                  >
                    {activeArticle.collectionLink.text}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
