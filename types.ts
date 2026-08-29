export enum Page {
  HOME = 'HOME',
  CATALOG = 'CATALOG',
  PLANT_DETAIL = 'PLANT_DETAIL',
  SERVICES = 'SERVICES',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  MAIL_ORDER = 'MAIL_ORDER',
  WHOLESALE = 'WHOLESALE',
  CONSULTATION = 'CONSULTATION',
  CHECKOUT = 'CHECKOUT',
  NEWSLETTER = 'NEWSLETTER',
  DROUGHT_RESISTANCE = 'DROUGHT_RESISTANCE',
  PLANTING_CALENDAR = 'PLANTING_CALENDAR',
  NATIVE_SPECIES_MAP = 'NATIVE_SPECIES_MAP',
  SUSTAINABILITY_POLICY = 'SUSTAINABILITY_POLICY',
  AVAILABILITY = 'AVAILABILITY',
  EVENTS_CALENDAR = 'EVENTS_CALENDAR',
}

export enum PlantCategory {
  NATIVES = 'Natives',
  TREES = 'Trees',
  SHRUBS = 'Shrubs',
  PERENNIALS = 'Perennials',
  EDIBLES = 'Edibles',
}

export interface Plant {
  id: string;
  name: string;
  botanicalName: string;
  commonName?: string;
  category: PlantCategory;
  price: number;
  description: string;
  imageUrl: string;
  galleryImages?: string[];
  sunNeeds: 'Full Sun' | 'Part Shade' | 'Shade';
  waterNeeds: 'Low' | 'Moderate' | 'High';
  tag?: string;
  matureSize?: string;
  hardinessZone?: string;
  bloomTime?: string;
  soilNeeds?: string;
  foliage?: string;
  growthHabit?: string;
  origin?: string;
  landscapeUses?: string[];
  features?: string[];
}

export interface FloralArrangement {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  page: Page;
}

export interface NewsletterIssue {
  month: string;
  title: string;
  url: string;
}

export interface NewsletterArchive {
  year: number;
  issues: NewsletterIssue[];
}

export interface AvailabilityItem {
  name: string;
  price1g?: string;
  price2g?: string;
  price5g?: string;
  condition: string;
}
