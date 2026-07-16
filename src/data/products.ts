import { Product } from '../types';

import imgBralette from '../data/images/products/prod_tascher_bralette.webp';
import imgBrief from '../data/images/products/prod_essence_brief.webp';
import imgSupport from '../data/images/products/prod_performance_support.webp';

export const PYNCH_PRODUCTS: Product[] = [
  {
    id: 'tascher-bralette',
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
  }
];

export const EDITORIAL_ARTICLES = [
  {
    id: 'philosophical-unbuttoning',
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
