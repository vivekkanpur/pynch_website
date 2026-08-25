import { Product } from '../types';

import imgBralette from '../data/images/products/prod_tascher_bralette.webp';
import imgBrief from '../data/images/products/prod_essence_brief.webp';
import imgSupport from '../data/images/products/prod_performance_support.webp';

export const PYNCH_PRODUCTS: Product[] = [
  {
    id: 'tascher-bralette',
    handle: 'tascher-bralette',
    sku: 'PYN-TB-001',
    name: 'The Tascher Bralette',
    tagline: 'unstructured support, zero performance',
    description: 'Our signature hardware-free, double-layered triangle bralette. Crafted from whisper-soft, sustainably sourced micro-modal that breathes with you. No wires, no padding, just pure tactile freedom designed to mold to your natural form.',
    price: 78,
    category: 'bralettes',
    colors: [
      {
        name: 'Chalk',
        hex: '#F9F6F0',
        images: [imgBralette, imgBralette]
      },
      {
        name: 'Charcoal',
        hex: '#2E2D2B',
        images: [imgBralette, imgBralette]
      },
      {
        name: 'Dune',
        hex: '#E6DFD3',
        images: [imgBralette, imgBralette]
      }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    materials: '92% Lenzing Micro-Modal, 8% Elastane. Sourced from certified renewable European beechwood forests.',
    details: [
      'Double-layer front panel for comfortable coverage without bulk',
      'Plunge neckline with minimalist raw-edge binding',
      'Ultra-soft elastic underband encased in self-fabric',
      'Fully adjustable, delicate shoulder straps'
    ],
    features: [
      'Zero hardware to eliminate pressure points',
      'Biodegradable yarn and botanic origin fibers',
      'Breathable, moisture-regulating feel'
    ],
    fitInfo: 'Tashu is 5\'9" wearing a Size S. Fits true to size. If between sizes or desiring a more relaxed fit on the underband, we recommend sizing up.',
    story: 'Designed as a protest against the structural fortresses of traditional lingerie. Named after Tashu, this piece celebrates the natural posture of the female body, celebrating skin-to-fabric intimacy with zero artificial shaping.'
  },
  {
    id: 'essence-brief',
    handle: 'essence-brief',
    sku: 'PYN-EB-002',
    name: 'The Essence High-Rise',
    tagline: 'second skin containment, seamless luxury',
    description: 'An elegant high-waisted brief offering effortless envelope containment. Made with raw-cut leg openings and an invisible waist seam to eliminate digging. It sits seamlessly under clothes while preserving a soft, raw tactile presence.',
    price: 38,
    category: 'briefs',
    colors: [
      {
        name: 'Chalk',
        hex: '#F9F6F0',
        images: [imgBrief, imgBrief]
      },
      {
        name: 'Charcoal',
        hex: '#2E2D2B',
        images: [imgBrief, imgBrief]
      },
      {
        name: 'Moss',
        hex: '#3D4035',
        images: [imgBrief, imgBrief]
      }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    materials: '88% Recycled Nylon, 12% Lycra with a 100% Organic Cotton gusset liner.',
    details: [
      'High-rise waist sits smoothly just above the belly button',
      'Raw-cut leg openings for zero-panty-line security',
      'Flat-locked back seam for a sculpted silhouette',
      'Double-lined crotch with pure breathable organic cotton'
    ],
    features: [
      'Seamless edges for invisibility under silk and knitwear',
      'Highly elasticized recycled technical yarn',
      'Ultra-smooth hand feel'
    ],
    fitInfo: 'Sits comfortably around the natural waistline. Generous stretch allows for seamless contouring. Sizing down provides firmer compression.',
    story: 'We wanted a brief that didn\'t feel like an afterthought. The Essence brief envelopes you in a comforting embrace, sitting comfortably against your skin with zero distraction.'
  },
  {
    id: 'persona-bodysuit',
    handle: 'persona-bodysuit',
    sku: 'PYN-PB-003',
    name: 'The Persona Ribbed Bodysuit',
    tagline: 'sculpted organic knit, designed to be seen',
    description: 'A luxurious rib-knit mock neck bodysuit featuring a deep scoop back and raw thong base. Crafted from heavyweight Peruvian organic cotton rib, this bodysuit elevates intimate wear into a sophisticated everyday uniform.',
    price: 120,
    category: 'bodysuits',
    colors: [
      {
        name: 'Charcoal',
        hex: '#2E2D2B',
        images: [imgBrief, imgBrief]
      },
      {
        name: 'Dune',
        hex: '#E6DFD3',
        images: [imgBrief, imgBrief]
      }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    materials: '95% Certified Organic Cotton, 5% Spandex heavyweight 2x2 rib knit.',
    details: [
      'Double-lined bust area for subtle support and modesty',
      'Low, sensual scoop back designed for versatility',
      'Thong back cut with flat, snap-free raw gusset closure',
      'Thick ribbing that provides active hold'
    ],
    features: [
      'Can be worn as high-end loungewear or styled outward',
      'Peruvian long-staple organic cotton for incredible durability',
      'Retains shape after multiple washes'
    ],
    fitInfo: 'Fits snugly. The rib structure expands beautifully to contour your waist and chest. Choose your standard top size.',
    story: 'The line between what we wear for ourselves and what we wear for the world is artificial. The Persona Bodysuit is an intimate layer that commands space as outerwear, carrying Tashu\'s core philosophy: wear who you are.'
  },
  {
    id: 'performance-free-underwire',
    handle: 'performance-free-underwire',
    sku: 'PYN-PU-004',
    name: 'The Performance-Free Support',
    tagline: 'engineered release, intuitive contour',
    description: 'A masterpiece of invisible engineering. This minimalist underwire uses a patented flexible titanium wire that matches body heat to contour smoothly without poking or bruising. Framed by delicate, single-layer Italian tulle.',
    price: 95,
    category: 'bralettes',
    colors: [
      {
        name: 'Charcoal',
        hex: '#2E2D2B',
        images: [imgSupport, imgSupport]
      },
      {
        name: 'Chalk',
        hex: '#F9F6F0',
        images: [imgSupport, imgSupport]
      }
    ],
    sizes: ['32B', '32C', '34B', '34C', '34D', '36B', '36C', '36D'],
    materials: '84% Biodegradable Polyamide, 16% Elastane. Italian sheer micro-mesh tulle.',
    details: [
      'Flexible, heat-reactive titanium underwire casing',
      'Ultra-sheer, high-tension mesh tulle cups',
      'French-seamed cup lines for a pure, hand-finished look',
      'Premium metal hooks with plush velvet eyelet backer'
    ],
    features: [
      'Underwire that floats with motion rather than restricting',
      'Invisible under clothes with sheer illusion texture',
      'Earthy, sophisticated visual lines'
    ],
    fitInfo: 'Standard cup sizing. The flexible underwire expands slightly when warm, fitting closer after 10 minutes of active wear.',
    story: 'Traditional underwires are steel cages designed for outward projection. The Performance-Free Support uses smart materials to mirror your natural geometry, creating comfort rather than a performance.'
  },
  {
    id: 'tashu-silk-slip',
    handle: 'tashu-silk-slip',
    sku: 'PYN-SS-005',
    name: 'The Tashu Silk Slip',
    tagline: 'sand-washed heavy silk, liquid drape',
    description: 'A bias-cut, 19-momme sand-washed mulberry silk slip dress. Boasting a heavy, suede-like finish, it cascades like liquid silver down the body. Features a minimalist v-neckline and elegant crossed racerback strap details.',
    price: 180,
    category: 'loungewear',
    colors: [
      {
        name: 'Moss',
        hex: '#3D4035',
        images: [imgSupport, imgSupport]
      },
      {
        name: 'Dune',
        hex: '#E6DFD3',
        images: [imgSupport, imgSupport]
      },
      {
        name: 'Charcoal',
        hex: '#2E2D2B',
        images: [imgSupport, imgSupport]
      }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    materials: '100% Mulberry Silk, 19-momme grade 6A. Sand-washed for a velvet-matte drape.',
    details: [
      'Bias cut contours the waist naturally without binding or tightness',
      'Adjustable criss-cross straps for custom bust lift',
      'Mid-calf length with subtle side slit for movement ease',
      'Hypoallergenic, temperature-regulating pure silk weave'
    ],
    features: [
      'Incredibly soft, matte, suede-like hand feel',
      'Breathable, premium natural fibers',
      'Double-stitched flat French seams'
    ],
    fitInfo: 'Relaxed bias drape. If you prefer a loose, flowing pajama aesthetic, size up. If you plan to wear it styled under outerwear, select your normal size.',
    story: 'Pure mulberry silk is a living fabric. Sand-washed to strip away shiny pretension, it reveals a matte, dusty glow. It feels cool in the heat and warm in the cold, acting as an intimate extension of your natural skin.'
  },
  {
    id: 'untethered-rib-set',
    handle: 'untethered-rib-set',
    sku: 'PYN-US-006',
    name: 'The Untethered Rib Set',
    tagline: 'unstructured lounger, matching freedom',
    description: 'A two-piece lounge and intimate set crafted from our organic, rib-knit micromodal fabric. Features a scoop crop bralette and a high-cut boyshort brief. Sourced and spun in Italy for an incredibly soft feel.',
    price: 110,
    category: 'sets',
    colors: [
      {
        name: 'Dune',
        hex: '#E6DFD3',
        images: [imgBralette, imgBralette]
      },
      {
        name: 'Chalk',
        hex: '#F9F6F0',
        images: [imgBralette, imgBralette]
      }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    materials: '94% European Modal Rib, 6% Elastane. Spun with low-impact botanical methods.',
    details: [
      'Includes: Scoop Neck Ribbed Crop Bra + Matching High-Rise Boyshorts',
      'Soft flat waistband that behaves like a second skin',
      'Unstructured cups with comfortable cross-over strap support',
      'Oeko-Tex Standard 100 certified non-toxic fabrics'
    ],
    features: [
      'Excellent for sleeping, working from home, or laying low',
      'Incredibly elastic rib weave that expands up to 150%',
      'Sustainably packaged in a reusable cotton envelope'
    ],
    fitInfo: 'Highly stretchy. If between sizes, size down for an intimate fit, or choose your regular size for an easy loungewear drape.',
    story: 'Intimacy isn\'t a costume. The Untethered Set is made for the quietest hours of your day. It strips away structured seams, giving your skin space to rest, breathe, and simply be.'
  },
  {
    id: 'prod-8810-bra-0',
    handle: 'prod-8810-bra-0',
    sku: 'prod-8810-bra-0',
    name: 'Style 8810 - Bra',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 8810 - Bra. Carefully crafted for a perfect fit, featuring Cup Fabric - 68% polyamide - 32% Elastane  Cup Mesh  - 100% polyaminde  Side fabric - 68% polyamide 32% elastane.',
    price: 45,
    category: 'bralettes',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['M'],
    materials: 'Cup Fabric - 68% polyamide - 32% Elastane  Cup Mesh  - 100% polyaminde  Side fabric - 68% polyamide 32% elastane',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Handwash only, max temp 40$ C, Do not Bleach , Hand dry, Do not iron, Do not drycllean`,
  },
  {
    id: 'prod-8810-pantie-1',
    handle: 'prod-8810-pantie-1',
    sku: 'prod-8810-pantie-1',
    name: 'Style 8810 - Pantie',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 8810 - Pantie. Carefully crafted for a perfect fit, featuring Fabric  68% Polyamide  32% Elastane Crotch lining 100% Cotton.',
    price: 45,
    category: 'briefs',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['M'],
    materials: 'Fabric  68% Polyamide  32% Elastane Crotch lining 100% Cotton',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Handwash only, max temp 40$ C, Do not Bleach , Hand dry, Do not iron, Do not drycllean`,
  },
  {
    id: 'prod-2857-bra-2',
    handle: 'prod-2857-bra-2',
    sku: 'prod-2857-bra-2',
    name: 'Style 2857 - Bra',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 2857 - Bra. Carefully crafted for a perfect fit, featuring 9%% Polyester  5% Elastane.',
    price: 45,
    category: 'bralettes',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['M'],
    materials: '9%% Polyester  5% Elastane',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-2857-pantie-3',
    handle: 'prod-2857-pantie-3',
    sku: 'prod-2857-pantie-3',
    name: 'Style 2857 - Pantie',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 2857 - Pantie. Carefully crafted for a perfect fit, featuring 9%% Polyester  5% Elastane.',
    price: 45,
    category: 'briefs',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['M'],
    materials: '9%% Polyester  5% Elastane',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Handwash only, max temp 40$ C, Do not Bleach , Hand dry, Do not iron, Do not drycllean`,
  },
  {
    id: 'prod-8826-bra-4',
    handle: 'prod-8826-bra-4',
    sku: 'prod-8826-bra-4',
    name: 'Style 8826 - Bra',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 8826 - Bra. Carefully crafted for a perfect fit, featuring Lace  86% Polyamide 14% Elastane  Cup lining  100% Cotton   side lining 85% polyamide 15% elastane.',
    price: 45,
    category: 'bralettes',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['M'],
    materials: 'Lace  86% Polyamide 14% Elastane  Cup lining  100% Cotton   side lining 85% polyamide 15% elastane',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Handwash only, max temp 40$ C, Do not Bleach , Hand dry, Do not iron, Do not drycllean`,
  },
  {
    id: 'prod-8826-pantie-5',
    handle: 'prod-8826-pantie-5',
    sku: 'prod-8826-pantie-5',
    name: 'Style 8826 - Pantie',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 8826 - Pantie. Carefully crafted for a perfect fit, featuring Lace  86% Polyamide 14% Elastane  Mesh Fabric 86% Polyamide 14% Elastane  Crotch Lining  100% Cotton.',
    price: 45,
    category: 'briefs',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['M'],
    materials: 'Lace  86% Polyamide 14% Elastane  Mesh Fabric 86% Polyamide 14% Elastane  Crotch Lining  100% Cotton',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Handwash only, max temp 40$ C, Do not Bleach , Hand dry, Do not iron, Do not drycllean`,
  },
  {
    id: 'prod-2366-bra-6',
    handle: 'prod-2366-bra-6',
    sku: 'prod-2366-bra-6',
    name: 'Style 2366 - Bra',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 2366 - Bra. Carefully crafted for a perfect fit, featuring 95% Polyester 5% Elastane.',
    price: 45,
    category: 'bralettes',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['L'],
    materials: '95% Polyester 5% Elastane',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-2366-pantie-7',
    handle: 'prod-2366-pantie-7',
    sku: 'prod-2366-pantie-7',
    name: 'Style 2366 - Pantie',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 2366 - Pantie. Carefully crafted for a perfect fit, featuring 95% Polyester 5% Elastane.',
    price: 45,
    category: 'briefs',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['L'],
    materials: '95% Polyester 5% Elastane',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-2870-bra-8',
    handle: 'prod-2870-bra-8',
    sku: 'prod-2870-bra-8',
    name: 'Style 2870 - Bra',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 2870 - Bra. Carefully crafted for a perfect fit, featuring Cup Shell 61.5% Polyester 38.5% Polyamide  Cup lining 100% Polyester Flank 85.8% Plyamide 14.2% Elastane.',
    price: 45,
    category: 'bralettes',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['M'],
    materials: 'Cup Shell 61.5% Polyester 38.5% Polyamide  Cup lining 100% Polyester Flank 85.8% Plyamide 14.2% Elastane',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-2870-pantie-9',
    handle: 'prod-2870-pantie-9',
    sku: 'prod-2870-pantie-9',
    name: 'Style 2870 - Pantie',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 2870 - Pantie. Carefully crafted for a perfect fit, featuring Fabric.1  61.5% Polyamide 38.5% Elastane  Fabric 2  85.8% Polyamide 14.2% Elastane   Crotch  100% Cotton.',
    price: 45,
    category: 'briefs',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['M'],
    materials: 'Fabric.1  61.5% Polyamide 38.5% Elastane  Fabric 2  85.8% Polyamide 14.2% Elastane   Crotch  100% Cotton',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-9276-bra-10',
    handle: 'prod-9276-bra-10',
    sku: 'prod-9276-bra-10',
    name: 'Style 9276 - Bra',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 9276 - Bra. Carefully crafted for a perfect fit, featuring Cup Fabric  90.4% Polyamide Fiber 9.6% Spandex  Cup lining  100% polyamide fiber   Flank  83.8% Polyamide  16.2% Spandex.',
    price: 45,
    category: 'bralettes',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['L'],
    materials: 'Cup Fabric  90.4% Polyamide Fiber 9.6% Spandex  Cup lining  100% polyamide fiber   Flank  83.8% Polyamide  16.2% Spandex',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-9276-pantie-11',
    handle: 'prod-9276-pantie-11',
    sku: 'prod-9276-pantie-11',
    name: 'Style 9276 - Pantie',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 9276 - Pantie. Carefully crafted for a perfect fit, featuring Fabric 1  90.4% Polyamide fibre 9.6% Spandex  Fabric 2  83.8% Polyamide  16.2 Spandex   Crotch  100% Cotton.',
    price: 45,
    category: 'briefs',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['L'],
    materials: 'Fabric 1  90.4% Polyamide fibre 9.6% Spandex  Fabric 2  83.8% Polyamide  16.2 Spandex   Crotch  100% Cotton',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-t13--360-bra-12',
    handle: 'prod-t13--360-bra-12',
    sku: 'prod-t13--360-bra-12',
    name: 'Style T13- 360 - Bra',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style T13- 360 - Bra. Carefully crafted for a perfect fit, featuring Cup Lining 100% Polyester  Cup Fabric 78% Polyamide, 22% Elastane.',
    price: 45,
    category: 'bralettes',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['L'],
    materials: 'Cup Lining 100% Polyester  Cup Fabric 78% Polyamide, 22% Elastane',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-t13--360-pantie-13',
    handle: 'prod-t13--360-pantie-13',
    sku: 'prod-t13--360-pantie-13',
    name: 'Style T13- 360 - Pantie',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style T13- 360 - Pantie. Carefully crafted for a perfect fit, featuring Fabric - 78% Polyamide, 22% Elastane Crotch - 100% Cotton.',
    price: 45,
    category: 'briefs',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['L'],
    materials: 'Fabric - 78% Polyamide, 22% Elastane Crotch - 100% Cotton',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-6616-bra-14',
    handle: 'prod-6616-bra-14',
    sku: 'prod-6616-bra-14',
    name: 'Style 6616 - Bra',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 6616 - Bra. Carefully crafted for a perfect fit, featuring Cup Shell 70% Polyamide 30% Elastane  Cup lining 100% Polyester Flank 70% Plyamide 30% Elastane.',
    price: 45,
    category: 'bralettes',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['M'],
    materials: 'Cup Shell 70% Polyamide 30% Elastane  Cup lining 100% Polyester Flank 70% Plyamide 30% Elastane',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-6616-pantie-15',
    handle: 'prod-6616-pantie-15',
    sku: 'prod-6616-pantie-15',
    name: 'Style 6616 - Pantie',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 6616 - Pantie. Carefully crafted for a perfect fit, featuring Fabric 1  85% Polyamide  15% Elastane  Fabric 2  70% Polyamide 30% Elastane  Crotch 100% Cotton.',
    price: 45,
    category: 'briefs',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['M'],
    materials: 'Fabric 1  85% Polyamide  15% Elastane  Fabric 2  70% Polyamide 30% Elastane  Crotch 100% Cotton',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-2839-only-bra--l020-bra-16',
    handle: 'prod-2839-only-bra--l020-bra-16',
    sku: 'prod-2839-only-bra--l020-bra-16',
    name: 'Style 2839# only Bra/ L020 - Bra',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 2839# only Bra/ L020 - Bra. Carefully crafted for a perfect fit, featuring Fabric - 95% Nylon, 5% Spandex Cup Lining 95.3% Polyester Fibre 4.7% Spandex  Flank- 95% Nylon, 5% Spandex.',
    price: 45,
    category: 'bralettes',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['M'],
    materials: 'Fabric - 95% Nylon, 5% Spandex Cup Lining 95.3% Polyester Fibre 4.7% Spandex  Flank- 95% Nylon, 5% Spandex',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-9306-only-bra--5201-bra-17',
    handle: 'prod-9306-only-bra--5201-bra-17',
    sku: 'prod-9306-only-bra--5201-bra-17',
    name: 'Style 9306# only Bra/ 5201 - Bra',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 9306# only Bra/ 5201 - Bra. Carefully crafted for a perfect fit, featuring Cup Fabric : 100 % Nylon Shell Fabric 100% Polyester Side: 85% Nylon, 15% Spandex.',
    price: 45,
    category: 'bralettes',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['M'],
    materials: 'Cup Fabric : 100 % Nylon Shell Fabric 100% Polyester Side: 85% Nylon, 15% Spandex',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-rh001-2881-bra-18',
    handle: 'prod-rh001-2881-bra-18',
    sku: 'prod-rh001-2881-bra-18',
    name: 'Style RH001/2881 - Bra',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style RH001/2881 - Bra. Carefully crafted for a perfect fit, featuring 95% Polyester 5% Elastane.',
    price: 45,
    category: 'bralettes',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['M'],
    materials: '95% Polyester 5% Elastane',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-rh001-2881-pantie-19',
    handle: 'prod-rh001-2881-pantie-19',
    sku: 'prod-rh001-2881-pantie-19',
    name: 'Style RH001/2881 - Pantie',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style RH001/2881 - Pantie. Carefully crafted for a perfect fit, featuring 95% Polyester 5% Elastane.',
    price: 45,
    category: 'briefs',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['M'],
    materials: '95% Polyester 5% Elastane',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-2856-bra-20',
    handle: 'prod-2856-bra-20',
    sku: 'prod-2856-bra-20',
    name: 'Style 2856 - Bra',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 2856 - Bra. Carefully crafted for a perfect fit, featuring 95% Polyester 5% Elastane.',
    price: 45,
    category: 'bralettes',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['L'],
    materials: '95% Polyester 5% Elastane',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-2856-pantie-21',
    handle: 'prod-2856-pantie-21',
    sku: 'prod-2856-pantie-21',
    name: 'Style 2856 - Pantie',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 2856 - Pantie. Carefully crafted for a perfect fit, featuring 95% Polyester 5% Elastane.',
    price: 45,
    category: 'briefs',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['L'],
    materials: '95% Polyester 5% Elastane',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-9350-m002-bra-22',
    handle: 'prod-9350-m002-bra-22',
    sku: 'prod-9350-m002-bra-22',
    name: 'Style 9350#/M002 - Bra',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 9350#/M002 - Bra. Carefully crafted for a perfect fit, featuring Main : 90% Nylon, 10% Elastane Mesh - 100% Nylon Lining - 100% Nylon FlankMesh- 5% Nylon, 25% Elastane.',
    price: 45,
    category: 'bralettes',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['M'],
    materials: 'Main : 90% Nylon, 10% Elastane Mesh - 100% Nylon Lining - 100% Nylon FlankMesh- 5% Nylon, 25% Elastane',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-9350-m002-pantie-23',
    handle: 'prod-9350-m002-pantie-23',
    sku: 'prod-9350-m002-pantie-23',
    name: 'Style 9350#/M002 - Pantie',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 9350#/M002 - Pantie. Carefully crafted for a perfect fit, featuring Lace - 90% Nylon, 10% Elastane Msh - 90%Nylon, 10% Elastane Gusset Lining - 100% Cotton.',
    price: 45,
    category: 'briefs',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['M'],
    materials: 'Lace - 90% Nylon, 10% Elastane Msh - 90%Nylon, 10% Elastane Gusset Lining - 100% Cotton',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-2867-bra-24',
    handle: 'prod-2867-bra-24',
    sku: 'prod-2867-bra-24',
    name: 'Style 2867 - Bra',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 2867 - Bra. Carefully crafted for a perfect fit, featuring 95% Polyester 5% Elastane.',
    price: 45,
    category: 'bralettes',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['L'],
    materials: '95% Polyester 5% Elastane',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-2867-pantie-25',
    handle: 'prod-2867-pantie-25',
    sku: 'prod-2867-pantie-25',
    name: 'Style 2867 - Pantie',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 2867 - Pantie. Carefully crafted for a perfect fit, featuring 95% Polyester 5% Elastane.',
    price: 45,
    category: 'briefs',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['L'],
    materials: '95% Polyester 5% Elastane',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-6616-2876-bra-26',
    handle: 'prod-6616-2876-bra-26',
    sku: 'prod-6616-2876-bra-26',
    name: 'Style 6616#/2876 - Bra',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 6616#/2876 - Bra. Carefully crafted for a perfect fit, featuring 95% Polyester 5% Elastane.',
    price: 45,
    category: 'bralettes',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['M'],
    materials: '95% Polyester 5% Elastane',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-6616-2876-pantie-27',
    handle: 'prod-6616-2876-pantie-27',
    sku: 'prod-6616-2876-pantie-27',
    name: 'Style 6616#/2876 - Pantie',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 6616#/2876 - Pantie. Carefully crafted for a perfect fit, featuring 95% Polyester 5% Elastane.',
    price: 45,
    category: 'briefs',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['M'],
    materials: '95% Polyester 5% Elastane',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-2343-bra-28',
    handle: 'prod-2343-bra-28',
    sku: 'prod-2343-bra-28',
    name: 'Style 2343 - Bra',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 2343 - Bra. Carefully crafted for a perfect fit, featuring 95% Polyester 5% Elastane.',
    price: 45,
    category: 'bralettes',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['L'],
    materials: '95% Polyester 5% Elastane',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-2343-pantie-29',
    handle: 'prod-2343-pantie-29',
    sku: 'prod-2343-pantie-29',
    name: 'Style 2343 - Pantie',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 2343 - Pantie. Carefully crafted for a perfect fit, featuring 95% Polyester 5% Elastane.',
    price: 45,
    category: 'briefs',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['L'],
    materials: '95% Polyester 5% Elastane',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-2851-bra-30',
    handle: 'prod-2851-bra-30',
    sku: 'prod-2851-bra-30',
    name: 'Style 2851# - Bra',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 2851# - Bra. Carefully crafted for a perfect fit, featuring Lace - 90% Nylon, 10% Elastane cup Fabric - 82% Nylon, 18% Spandex  Flank Lining - 85% Nylon, 15% Spandex Cup Lining - 100% Polyester.',
    price: 45,
    category: 'bralettes',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['M'],
    materials: 'Lace - 90% Nylon, 10% Elastane cup Fabric - 82% Nylon, 18% Spandex  Flank Lining - 85% Nylon, 15% Spandex Cup Lining - 100% Polyester',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-2851-pantie-31',
    handle: 'prod-2851-pantie-31',
    sku: 'prod-2851-pantie-31',
    name: 'Style 2851# - Pantie',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 2851# - Pantie. Carefully crafted for a perfect fit, featuring Lace - 90 % Nylon, 10 % Spandex  Mesh - 85% Nylon, 15% Spandex  Lining - 100% Cotton.',
    price: 45,
    category: 'briefs',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['M'],
    materials: 'Lace - 90 % Nylon, 10 % Spandex  Mesh - 85% Nylon, 15% Spandex  Lining - 100% Cotton',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-2852-bra-32',
    handle: 'prod-2852-bra-32',
    sku: 'prod-2852-bra-32',
    name: 'Style 2852 - Bra',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 2852 - Bra. Carefully crafted for a perfect fit, featuring 95% Polyester 5% Elastane.',
    price: 45,
    category: 'bralettes',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['M'],
    materials: '95% Polyester 5% Elastane',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-2852-pantie-33',
    handle: 'prod-2852-pantie-33',
    sku: 'prod-2852-pantie-33',
    name: 'Style 2852 - Pantie',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 2852 - Pantie. Carefully crafted for a perfect fit, featuring 95% Polyester 5% Elastane.',
    price: 45,
    category: 'briefs',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['M'],
    materials: '95% Polyester 5% Elastane',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  },
  {
    id: 'prod-3931-bodysuit-34',
    handle: 'prod-3931-bodysuit-34',
    sku: 'prod-3931-bodysuit-34',
    name: 'Style 3931 - Bodysuit',
    tagline: 'designed for comfort and style',
    description: 'Experience ultimate comfort with our Style 3931 - Bodysuit. Carefully crafted for a perfect fit, featuring Premium blended fabric.',
    price: 45,
    category: 'bodysuits',
    colors: [
      {
        name: 'Standard',
        hex: '#E6DFD3',
        images: []
      }
    ],
    sizes: ['XL'],
    materials: 'Premium blended fabric',
    details: [],
    features: [],
    fitInfo: 'Standard fit. Choose your normal size.',
    story: 'Part of our exclusive new collection.',
    washingGuide: `Follow standard care instructions.`,
  }
];

export const EDITORIAL_ARTICLES = [
  {
    id: 'philosophical-unbuttoning',
    handle: 'philosophical-unbuttoning',
    title: 'The Anti-Performance Manifesto',
    subtitle: 'Why Tashu founded PYNCH to dismantle the traditional lingerie gaze.',
    date: 'June 24, 2026',
    readTime: '6 min read',
    author: 'Tashu',
    excerpt: 'Intimacy has been marketed as a theater of expectation. But who are we dressing for when the doors are closed and the mirror is ours alone?',
    content: [
      'For decades, intimate wear has been sold through a single, narrow prism: performance. Padding designed to push, wire engineered to cage, and lace woven to conform to an external gaze. It was a construction site, masquerading as elegance.',
      'When I founded PYNCH, my goal wasn\'t to make pretty garments. It was to strip away the expectations. The word PYNCH is a reminder that we feel through touch, that our clothes should be a continuation of our sensory experience, not a correction of it.',
      '"Dress the person, not the performance" is more than a slogan. It is an architectural methodology. We do not use hardware. We do not use plastic spacers or steel cages. We use European micro-modal spun from sustainable beechwood, sand-washed Mulberry silk, and flexible titanium alloy that mimics the heat of your skin.',
      'We believe that true confidence is not a performance put on for an audience. It is the quiet, physical ease of feeling entirely at home in your own skin. PYNCH is here to wrap you in that ease.'
    ],
    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=800',
    quote: 'True luxury is the absence of restriction. It is the skin breathing in absolute silence.',
    collectionLink: {
      text: 'Explore the Core collection',
      category: 'bralettes' as const
    }
  },
  {
    id: 'sustainability-at-our-seams',
    handle: 'sustainability-at-our-seams',
    title: 'Where It Matters: Our Materials & Origin',
    subtitle: 'A transparent breakdown of our European supply chain.',
    date: 'May 12, 2026',
    readTime: '4 min read',
    author: 'Tashu',
    excerpt: 'We trace our fabrics from beechwood forests in Austria to our women-led atelier in Northern Italy. This is what second-skin sustainability looks like.',
    content: [
      'Most intimate wear is crafted from cheap polyester—essentially wearing oil-based plastic against our most sensitive skin. PYNCH is entirely different. We partner with family-owned mills that prioritize the earth as much as the hand-feel.',
      'Our primary material, Micro-Modal, is sourced from Lenzing in Austria. It is harvested from sustainably managed beechwood forests, processed using closed-loop systems that recycle 99% of wastewater and chemical solvents. The result is a fiber twice as soft as cotton, that biodegradable under natural conditions.',
      'Our Mulberry silk is sand-washed in a carbon-neutral mill, removing the high-shine synthetic sheen to expose a dusty, velvet-like luxury. This organic approach preserves the native proteins, keeping the silk highly hypoallergenic and breathable.',
      'When you wear PYNCH, you wear a continuous thread of respect. From the earth, to the hands that stitched it, to the skin it protects.'
    ],
    image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=800',
    quote: 'If a garment is made in a way that exploits the earth or its makers, it can never feel comfortable against your skin.',
    collectionLink: {
      text: 'Shop Organic Lounge Pieces',
      category: 'loungewear' as const
    }
  }
];
