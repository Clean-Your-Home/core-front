export interface NavItem {
  name: string;
  href: string;
  type: 'page' | 'section';
}

export interface SectionNavItem extends NavItem {
  type: 'section';
  sectionId: string;
}
