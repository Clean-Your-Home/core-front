export type GalleryItem = {
  id: number;
  category: string;
  title: string;
  before: string;
  after: string;
  description: string;
};

export type Category = 'Все' | 'Квартиры' | 'Офисы' | 'Мебель' | 'Окна';
