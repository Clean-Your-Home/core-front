import { ReactNode } from "react";

export type CleaningServiceType = string;

export interface AdditionalService {
    id: string;
    name: string;
    icon: ReactNode;
    price: number;
    unit: string;
    description: string;
}

export interface ServiceState {
    selected: boolean;
    quantity: number;
}

export type AdditionalServicesState = Record<string, ServiceState>;

export interface CleaningOrderSummary {
    serviceType: string;
    area: number;
    frequency: string;
    isUrgent: boolean;
    noMop: boolean;
    noVacuum: boolean;
    hasPet: boolean;
    additionalServices: { id: string; quantity: number }[];
}
