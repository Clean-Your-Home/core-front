import {
  Blinds,
  Building,
  Calendar,
  Clock,
  Clock3,
  Droplets,
  Eraser,
  Grid,
  Home,
  PanelTop,
  Repeat,
  Shirt,
  Sparkles,
  WashingMachine as Washing,
  Wind,
} from 'lucide-react';
import React from 'react';

import { AdditionalService } from './types';

export const BASE_PRICES: Record<string, number> = {
  'Поддерживающая уборка': 80,
  'Генеральная уборка': 120,
  'Уборка после ремонта': 150,
  'Мойка окон': 300,
  'Химчистка мебели и ковров': 500,
  'Уборка офисов': 60,
};

export const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'Поддерживающая уборка': <Repeat className='h-6 w-6' />,
  'Генеральная уборка': <Sparkles className='h-6 w-6' />,
  'Уборка после ремонта': <Home className='h-6 w-6' />,
  'Мойка окон': <Wind className='h-6 w-6' />,
  'Химчистка мебели и ковров': <Droplets className='h-6 w-6' />,
  'Уборка офисов': <Building className='h-6 w-6' />,
};

export const FREQUENCY_COEFFICIENTS: Record<string, number> = {
  Разовая: 1,
  Ежедневная: 0.7,
  Еженедельная: 0.8,
  Ежемесячная: 0.9,
};

export const FREQUENCY_ICONS: Record<string, React.ReactNode> = {
  Разовая: <Calendar className='h-4 w-4' />,
  Ежедневная: <Clock className='h-4 w-4' />,
  Еженедельная: <Repeat className='h-4 w-4' />,
  Ежемесячная: <Calendar className='h-4 w-4' />,
};

export const EXTRA_COSTS = {
  noMop: 300,
  noVacuum: 500,
  hasPet: 300,
};

export const URGENCY_COEFFICIENT = 1.5;

export const ADDITIONAL_SERVICES_LIST: AdditionalService[] = [
  {
    id: 'ironing',
    name: 'Глажка белья',
    icon: <Shirt className='h-5 w-5' />,
    price: 500,
    unit: 'час',
    description: 'Стоимость за 1 час',
  },
  {
    id: 'laundry',
    name: 'Стирка белья',
    icon: <Washing className='h-5 w-5' />,
    price: 300,
    unit: 'загрузка',
    description: 'Стоимость за 1 загрузку',
  },
  {
    id: 'hourly',
    name: 'Почасовая работа',
    icon: <Clock3 className='h-5 w-5' />,
    price: 400,
    unit: 'час',
    description: 'Стоимость за 1 час',
  },
  {
    id: 'balcony',
    name: 'Уборка балкона',
    icon: <Grid className='h-5 w-5' />,
    price: 500,
    unit: 'балкон',
    description: 'Стоимость за 1 балкон',
  },
  {
    id: 'blinds',
    name: 'Мытьё жалюзи',
    icon: <Blinds className='h-5 w-5' />,
    price: 250,
    unit: 'окно',
    description: 'Стоимость за 1 окно',
  },
  {
    id: 'grills',
    name: 'Оконные решётки',
    icon: <Grid className='h-5 w-5' />,
    price: 300,
    unit: 'окно',
    description: 'Стоимость за 1 окно',
  },
  {
    id: 'siding',
    name: 'Мытьё сайдинга',
    icon: <PanelTop className='h-5 w-5' />,
    price: 150,
    unit: 'м²',
    description: 'Стоимость за 1 м²',
  },
  {
    id: 'paint',
    name: 'Удаление краски и скотча',
    icon: <Eraser className='h-5 w-5' />,
    price: 200,
    unit: 'м²',
    description: 'Стоимость за 1 м²',
  },
];
