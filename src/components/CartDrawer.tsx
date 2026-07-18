import React, { useState } from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@shopify/hydrogen-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [giftNoteAdded, setGiftNoteAdded] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const { lines, cost, linesRemove, linesUpdate, checkoutUrl, totalQuantity } = useCart();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el || !isOpen) return;
    const stopProp = (e: Event) => e.stopPropagation();
    el.addEventListener('wheel', stopProp, { passive: false });
    el.addEventListener('touchmove', stopProp, { passive: false });
    return () => {
      el.removeEventListener('wheel', stopProp);
      el.removeEventListener('touchmove', stopProp);
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = cost?.subtotalAmount?.amount ? parseFloat(cost.subtotalAmount.amount) : 0;
  const freeShippingThreshold = 1500;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingLeft = freeShippingThreshold - subtotal;

  const handleUpdateQuantity = (lineId: string, quantity: number) => {
    if (quantity <= 0) {
      linesRemove([lineId]);
    } else {
      linesUpdate([{ id: lineId, quantity }]);
    }
  };

  const handleCheckout = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity duration-300">
      <div className="absolute inset-0" onClick={onClose} data-lenis-prevent="true"></div>
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 no-radius">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E8E3DB] flex justify-between items-center bg-white sticky top-0">
          <div>
            <h2 className="font-sans text-xl tracking-[0.1em] text-[#111111] uppercase font-light">
              Your Bag
            </h2>
            <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-gray-400 mt-1">
              {totalQuantity || 0} {(totalQuantity || 0) === 1 ? 'item' : 'items'} selected
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-black transition-colors focus:outline-none">
            <X className="w-5 h-5 stroke-[1]" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#F4F0EA] p-4 px-6 border-b border-[#E8E3DB] text-[10px] font-sans uppercase tracking-[0.1em]">
          {isFreeShipping ? (
            <div className="text-gray-700 flex justify-between items-center">
              <span>🎉 Congratulations! Your order qualifies for free shipping.</span>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-gray-600">
                <span>Free shipping progress</span>
                <span className="text-black font-medium">₹{shippingLeft.toFixed(2)} away</span>
              </div>
              <div className="w-full bg-[#E8E3DB] h-1 no-radius overflow-hidden">
                <div
                  className="bg-[#111111] h-full transition-all duration-500"
                  style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Scrollable Item List */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto overscroll-contain p-6 space-y-6" 
          data-lenis-prevent="true"
        >
          {!lines || lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <span className="text-gray-200 font-sans font-light text-5xl">Ø</span>
              <div>
                <p className="font-sans font-light text-sm text-gray-600 italic">Your bag is empty.</p>
                <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-gray-400 mt-2">
                  We dress the person, not the performance.
                </p>
              </div>
              <button
                onClick={onClose}
                className="border border-[#111111] text-[#111111] text-[11px] font-sans tracking-[0.2em] uppercase px-6 py-4 hover:bg-gray-50 transition-colors no-radius mt-4"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            lines.map((item: any) => {
              const primaryImage = item?.merchandise?.image?.url || 'https://images.unsplash.com/photo-1594913785162-e678537db3b1?q=80&w=800';
              const price = item?.cost?.totalAmount?.amount ? parseFloat(item.cost.totalAmount.amount) : 0;
              const title = item?.merchandise?.product?.title || 'Unknown Product';
              const selectedOptions = item?.merchandise?.selectedOptions || [];
              const colorOption = selectedOptions.find((o: any) => o.name === 'Color')?.value || 'Default';
              const sizeOption = selectedOptions.find((o: any) => o.name === 'Size')?.value || 'Default';

              return (
                <div key={item.id} className="flex gap-4 border-b border-[#E8E3DB] pb-6 last:border-0 last:pb-0">
                  <div className="w-24 aspect-[3/4] bg-[#F4F0EA] overflow-hidden shrink-0">
                    <img src={primaryImage} alt={title} className="w-full h-full object-cover mix-blend-multiply" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-sans font-light text-sm tracking-[0.1em] uppercase text-[#111111]">
                          {title}
                        </h4>
                        <span className="font-sans font-light text-sm text-gray-900">
                          ₹{price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-[10px] font-sans text-gray-400 uppercase tracking-[0.1em]">
                        Color: {colorOption} | Size: {sizeOption}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center border border-[#E8E3DB] no-radius">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 px-3 text-gray-500 hover:text-black transition-colors focus:outline-none"
                        >
                          <Minus className="w-3 h-3 stroke-[1]" />
                        </button>
                        <span className="px-3 text-[11px] font-sans font-light text-gray-800">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 px-3 text-gray-500 hover:text-black transition-colors focus:outline-none"
                        >
                          <Plus className="w-3 h-3 stroke-[1]" />
                        </button>
                      </div>
                      <button
                        onClick={() => linesRemove([item.id])}
                        className="text-gray-400 hover:text-[#111111] transition-colors focus:outline-none p-2 border border-transparent hover:border-[#111111]"
                      >
                        <Trash2 className="w-3.5 h-3.5 stroke-[1]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer / Summary Area */}
        {lines && lines.length > 0 && (
          <div className="border-t border-[#E8E3DB] p-6 space-y-6 bg-white sticky bottom-0">
            {/* Gift Note Section */}
            <div className="border-b border-[#E8E3DB] pb-6">
              {!giftNoteAdded ? (
                <button
                  onClick={() => setGiftNoteAdded(true)}
                  className="text-[10px] font-sans text-gray-400 hover:text-black tracking-[0.2em] uppercase transition-colors focus:outline-none flex gap-2 items-center"
                >
                  <Plus className="w-3 h-3 stroke-[1]" /> Add Scented Gift Message
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-sans text-gray-500 uppercase tracking-[0.2em]">
                      Scented Gift Card Message
                    </span>
                    <button
                      onClick={() => {
                        setGiftNote('');
                        setGiftNoteAdded(false);
                      }}
                      className="text-[9px] font-sans text-gray-400 hover:text-red-500 uppercase tracking-wider"
                    >
                      Remove
                    </button>
                  </div>
                  <textarea
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Enter your message here..."
                    className="w-full bg-[#F4F0EA] border-0 p-3 text-[11px] font-sans text-gray-800 focus:ring-1 focus:ring-[#111111] resize-none no-radius h-20 placeholder:text-gray-400"
                  />
                </div>
              )}
            </div>

            {/* Totals */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[11px] font-sans text-gray-500 uppercase tracking-widest">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-sans text-gray-500 uppercase tracking-widest">
                <span>Shipping</span>
                <span>{isFreeShipping ? 'Complimentary' : 'Calculated at checkout'}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={!checkoutUrl}
              className="w-full bg-[#111111] text-white py-4 flex justify-between items-center px-6 hover:bg-black transition-colors no-radius group disabled:opacity-50"
            >
              <span className="font-sans text-[11px] tracking-[0.2em] uppercase font-light">Proceed to Checkout</span>
              <span className="font-sans text-[11px] tracking-widest font-light">
                ₹{subtotal.toFixed(2)}
              </span>
            </button>
            <p className="text-center text-[9px] font-sans uppercase tracking-widest text-gray-400">
              Taxes calculated at checkout. Secure checkout powered by Shopify.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
