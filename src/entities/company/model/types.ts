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
  year: number;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: Icon;
}

export interface ServiceLink {
  name: string;
  href: string;
}
