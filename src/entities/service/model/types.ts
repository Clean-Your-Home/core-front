import { Icon } from '@/@types';

export interface ServiceDetails {
  title: string;
  description: string;
  features: string[];
  price: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: Icon;
  serviceId: string;
  details: ServiceDetails;
}
