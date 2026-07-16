import React from 'react';

const FitGuideGraphic = () => {
  return (
    <div className="w-full max-w-5xl mx-auto border border-[#E5E5E5] dark:border-[#333333] bg-[#FFFFFF] dark:bg-[#0F0F0F] text-[#1A1A1A] dark:text-[#F5F5F5] font-['Inter'] rounded-none flex flex-col transition-colors duration-300">
      
      {/* A. Image Banner */}
      <div className="relative w-full aspect-video md:aspect-[21/9] bg-gray-200 dark:bg-gray-800 flex items-center justify-center border-b border-[#E5E5E5] dark:border-[#333333]">
        {/* Placeholder image that fits the high-end editorial vibe */}
        <img 
          src="https://images.unsplash.com/photo-1572522718790-255d1ecfcb95?q=80&w=2000&auto=format&fit=crop" 
          alt="How to Measure" 
          className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply" 
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <h2 className="relative z-10 font-['Cormorant_Garamond'] text-5xl md:text-7xl text-white tracking-widest uppercase text-center px-6">
          How To Measure
        </h2>
      </div>

      {/* B. Instructions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#E5E5E5] dark:border-[#333333]">
        <div className="p-10 md:p-14 border-b md:border-r border-[#E5E5E5] dark:border-[#333333]">
          <h3 className="font-['Cormorant_Garamond'] text-3xl uppercase tracking-widest mb-4">Band</h3>
          <p className="text-sm md:text-base leading-relaxed text-[#1A1A1A]/80 dark:text-[#F5F5F5]/80">
            Wearing a non-padded bra, measure just above the bust by bringing a soft tape across your back at band level, under each arm, and snugly around the front.
          </p>
        </div>
        <div className="p-10 md:p-14 border-b border-[#E5E5E5] dark:border-[#333333]">
          <h3 className="font-['Cormorant_Garamond'] text-3xl uppercase tracking-widest mb-4">Bust</h3>
          <p className="text-sm md:text-base leading-relaxed text-[#1A1A1A]/80 dark:text-[#F5F5F5]/80">
            Measure across the fullest part of the bust by threading a soft measuring tape across your back at band level and under each arm.
          </p>
        </div>
        <div className="p-10 md:p-14 border-b md:border-b-0 md:border-r border-[#E5E5E5] dark:border-[#333333]">
          <h3 className="font-['Cormorant_Garamond'] text-3xl uppercase tracking-widest mb-4">Waist</h3>
          <p className="text-sm md:text-base leading-relaxed text-[#1A1A1A]/80 dark:text-[#F5F5F5]/80">
            Bend to one side to find the natural indentation in your torso. Run the tape around this natural waistline.
          </p>
        </div>
        <div className="p-10 md:p-14 border-[#E5E5E5] dark:border-[#333333]">
          <h3 className="font-['Cormorant_Garamond'] text-3xl uppercase tracking-widest mb-4">Hip</h3>
          <p className="text-sm md:text-base leading-relaxed text-[#1A1A1A]/80 dark:text-[#F5F5F5]/80">
            Stand on a level surface with your feet together. Measure around the fullest part of your hips and bottom.
          </p>
        </div>
      </div>

      {/* C. Cup Size Math Box */}
      <div className="bg-[#08514C] text-white p-10 md:p-16 border-b border-[#E5E5E5] dark:border-[#333333]">
        <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-4xl text-center mb-10 md:mb-12 uppercase tracking-widest leading-snug">
          If the difference between your<br className="hidden md:block"/> underbust and overbust is:
        </h3>
        
        {/* Highlighted Row */}
        <div className="grid grid-cols-5 bg-[#CFE11C] text-[#1A1A1A] text-center border border-[#1A1A1A]">
          <div className="py-6 md:py-8 border-r border-[#1A1A1A] flex flex-col justify-center gap-1">
            <span className="text-xs md:text-sm uppercase tracking-widest font-medium">1"</span>
            <span className="text-lg md:text-2xl font-bold font-['Cormorant_Garamond']">A Cup</span>
          </div>
          <div className="py-6 md:py-8 border-r border-[#1A1A1A] flex flex-col justify-center gap-1">
            <span className="text-xs md:text-sm uppercase tracking-widest font-medium">2"</span>
            <span className="text-lg md:text-2xl font-bold font-['Cormorant_Garamond']">B Cup</span>
          </div>
          <div className="py-6 md:py-8 border-r border-[#1A1A1A] flex flex-col justify-center gap-1">
            <span className="text-xs md:text-sm uppercase tracking-widest font-medium">3"</span>
            <span className="text-lg md:text-2xl font-bold font-['Cormorant_Garamond']">C Cup</span>
          </div>
          <div className="py-6 md:py-8 border-r border-[#1A1A1A] flex flex-col justify-center gap-1">
            <span className="text-xs md:text-sm uppercase tracking-widest font-medium">4"</span>
            <span className="text-lg md:text-2xl font-bold font-['Cormorant_Garamond']">D Cup</span>
          </div>
          <div className="py-6 md:py-8 flex flex-col justify-center gap-1">
            <span className="text-xs md:text-sm uppercase tracking-widest font-medium">5"</span>
            <span className="text-lg md:text-2xl font-bold font-['Cormorant_Garamond']">DD Cup</span>
          </div>
        </div>
      </div>

      {/* D. Master Sizing Grid */}
      <div className="p-8 md:p-14 overflow-x-auto">
        <table className="w-full text-center border-collapse text-sm md:text-base border border-[#E5E5E5] dark:border-[#333333]">
          <thead>
            <tr>
              <th className="border border-[#E5E5E5] dark:border-[#333333] p-5 bg-[#F9F9F9] dark:bg-[#151515] font-['Cormorant_Garamond'] text-lg md:text-xl font-medium tracking-widest uppercase">Cup \ Band</th>
              {['32', '34', '36', '38', '40', '42', '44'].map(band => (
                <th key={band} className="border border-[#E5E5E5] dark:border-[#333333] p-5 bg-[#F9F9F9] dark:bg-[#151515] font-medium">
                  {band}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['A', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
              ['B', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
              ['C', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
              ['D', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
              ['DD', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL']
            ].map((row, idx) => (
              <tr key={idx}>
                {/* Left Column (Cup Size) */}
                <td className="border border-[#E5E5E5] dark:border-[#333333] p-5 bg-[#F9F9F9] dark:bg-[#151515] font-['Cormorant_Garamond'] text-lg md:text-xl font-medium">
                  {row[0]}
                </td>
                {/* Intersecting Cells */}
                {row.slice(1).map((size, i) => (
                  <td key={i} className="border border-[#E5E5E5] dark:border-[#333333] p-5 transition-colors cursor-default hover:bg-[#CFE11C]/10 hover:text-[#CFE11C] dark:hover:bg-[#CFE11C]/20 dark:hover:text-[#CFE11C]">
                    {size}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default FitGuideGraphic;
