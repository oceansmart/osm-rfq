export interface SuggestedOceanFreight {
  id: string;
  cargoType: string; // 'DRY' | 'REFFER' | 'DG' | 'OOG'
  price20: number;
  price40: number;
  priceHC: number;
  price45: number;
  isSelected: boolean;
}

export interface ReferenceOceanFreight {
  id: string;
  kind: string; // 'MIN' | 'MAX' | 'AVG' | 'MEDIAN' | 'VOLUME RATE'
  cargoType: string; // 'DRY' | 'REFFER' | 'DG' | 'OOG'
  price20: number;
  price40: number;
  priceHC: number;
  price45: number;
  isSelected: boolean;
}

export interface SuggestedSurcharge {
  id: string;
  cargoType: string; // 'DRY' | 'REFFER' | 'DG' | 'OOG'
  item: string; // 'LTHC' | 'DTHC' | 'FAF/BAF' | 'EBS' | 'LSS'
  inc: boolean;
  currency: string; // 'KRW' | 'USD'
  price20: number;
  price40: number;
  priceHC: number;
  price45: number;
  isSelected: boolean;
}

export interface KeyRequirement {
  id: string;
  cargoType: string; // 'DRY' | 'REFFER' | 'DG' | 'OOG'
  dem: number;
  det: number;
  direct: string; // 'Direct' | 'T/S'
  freq: string; // 'Weekly' | ...
  isSelected: boolean;
}

export interface OceanFreight {
  id: string;
  cargoType: string; // 'DRY' | 'REFFER' | 'DG' | 'OOG'
  price20: number;
  price40: number;
  priceHC: number;
  price45: number;
  isSelected: boolean;
}

export interface Surcharge {
  id: string;
  cargoType: string; // 'DRY' | 'REFFER' | 'DG' | 'OOG'
  item: string; // 'LTHC' | 'DTHC' | 'FAF/BAF' | 'EBS' | 'LSS'
  inc: boolean;
  currency: string; // 'KRW' | 'USD'
  price20: number;
  price40: number;
  priceHC: number;
  price45: number;
  isSelected: boolean;
}
