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
  icon: React.ComponentType<{ className?: string }>;

  serviceId: string;
  details: ServiceDetails;
}
