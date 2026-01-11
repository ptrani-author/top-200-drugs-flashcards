// FILE: src/types/drug.ts
export type Drug = {
  id: number;
  slug: string;
  brandName: string;
  genericName: string;
  drugClass: string;
  primaryUse: string;
  keyRedFlag: string;
  category: string;
};

export type DrugsData = Drug[];
