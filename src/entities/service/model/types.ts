import { Icon } from '@/@types';
import { StaticImageData } from 'next/image';

export interface ServiceDetails {
  title: string;
  description: string;
  features: string[];
  price: string;
  image?: StaticImageData | string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: Icon;
  serviceId: string;
  details: ServiceDetails;
}
