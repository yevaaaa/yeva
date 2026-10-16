export interface Product {
  id: string;
  name: string;
  category: string;
  cnyPrice: number;
  rubPrice: number;
  oldCnyPrice?: number;
  oldRubPrice?: number;
  wholesaleCny?: number;
  wholesaleRub?: number;
  wholesaleMinQty?: number;
  moq: number;
  moqLabel: string;
  hub: string;
  rating: number;
  ordersCount: number;
  image: string;
  badge?: string;
  secondaryBadge?: string;
  factoryName: string;
  factoryYears?: number;
  isVerified?: boolean;
  samplePriceCny?: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  factoryName: string;
  hub: string;
  image: string;
  quantity: number;
  unitCny: number;
  unitRub: number;
  weightKg: number;
  specs: string[];
  isSample?: boolean;
  options?: {
    photoInspection?: boolean;
    laserLogo?: boolean;
  };
}

export interface GroupPool {
  id: string;
  poolNumber: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
  factoryName: string;
  factoryYears: number;
  discountBadge: string;
  timeLeft: string;
  minParticipation: number;
  targetQty: number;
  currentQty: number;
  participantsCount: number;
  retailPriceCny: number;
  retailPriceRub: number;
  currentPriceCny: number;
  currentPriceRub: number;
  tiers: {
    minQty: number;
    cny: number;
    rub: number;
    active?: boolean;
  }[];
}

export interface ShippingRoute {
  id: string;
  title: string;
  route: string;
  duration: string;
  ratePerKg: string;
  description: string;
  calculatedPriceRub: number;
  icon: string;
  badge?: string;
  accentColor?: string;
}

export type PageView = 
  | 'glavnaya' 
  | 'katalog' 
  | 'tovary-s-fabrik' 
  | 'kollektivnye-zakupki' 
  | 'korzina' 
  | 'oformlenie-zakaza' 
  | 'dlya-biznesa-b2b' 
  | 'logistika-i-treking' 
  | 'izbrannoe'
  | 'zakazy';
