import { Icon } from '@/@types';

export interface Advantage {
  id: number;
  title: string;
  description: string;
  icon: Icon;
}

export interface CompanyInfo {
  name: string;
  description: string;
  yearsExperience: number;
  values: string[];
}
