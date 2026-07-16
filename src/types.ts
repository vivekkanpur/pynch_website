export interface ProductColor {
  name: string;
  hex: string;
  images: string[]; // At least 2 images for hover effect: 0 = lifestyle/front, 1 = detail/texture
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: 'bralettes' | 'briefs' | 'bodysuits' | 'sets' | 'loungewear';
  colors: ProductColor[];
  sizes: string[];
  materials: string;
  details: string[];
  features: string[];
  fitInfo: string;
  story: string;
  mood?: string;
  videos?: string[];
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface JournalArticle {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  content: string[];
  image: string;
  quote?: string;
  collectionLink?: {
    text: string;
    category: 'bralettes' | 'briefs' | 'bodysuits' | 'sets' | 'loungewear' | 'all';
  };
}
