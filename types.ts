export enum Page {
  HOME = 'HOME',
  CATALOG = 'CATALOG',
  PLANT_DETAIL = 'PLANT_DETAIL',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  WHOLESALE = 'WHOLESALE',
  CONSULTATION = 'CONSULTATION',
  NEWSLETTER = 'NEWSLETTER',
  AVAILABILITY = 'AVAILABILITY',
  PRICED_AVAILABILITY = 'PRICED_AVAILABILITY',
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
  qty1g?: number;
  price1g?: string;
  qty2g?: number;
  price2g?: string;
  sizeNote2g?: string;
  qty5g?: number;
  price5g?: string;
  sizeNote5g?: string;
  description: string;
}
