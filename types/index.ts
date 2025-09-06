export interface UserProfile {
  name: string;
  deploymentStateId: string;
  deploymentLgaId: string;
}

export interface State {
  name: string;
}

export interface LGA {
  name: string;
  stateId: string;
}

export interface Category {
  name: string;
  icon?: string;
  color?: string;
}

export interface Listing {
  name: string;
  address: string;
  description: string;
  categoryId: string;
  lgaId?: string;
  latitude?: number;
  longitude?: number;
  contactInfo: string;
  phone?: string;
  email?: string;
  website?: string;
  hours?: string;
  imageUrls?: string[];
  rating?: number;
}

export interface Review {
  listingId: string;
  userId: string;
  rating: number;
  comment: string;
  userName?: string;
  createdAt?: string;
}
  