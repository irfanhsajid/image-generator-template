import { ProductTemplate, ColorPreset } from './types';

export const TEMPLATES: Record<string, ProductTemplate> = {
  'regular-3ml': {
    id: 'regular-3ml',
    name: 'Regular Edition 3ml',
    edition: 'Regular',
    volume: '3ml',
    canvas: {
      width: 1024,
      height: 1024,
    },
    assets: {
      bottle: '/templates/regular-3ml/bottle.png',
      oilMask: '/templates/regular-3ml/oil-mask.png',
      logo: '/templates/regular-3ml/logo.png',
    },
    label: {
      x: 412,
      y: 314,
      width: 206,
      height: 52,
      fontSize: 25,
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      fontWeight: '700',
      fontColor: '#000000',
    },
    oil: {
      x: 410,
      y: 405,
      width: 212,
      height: 442,
    },
    disabled: false,
  },
  'regular-6ml': {
    id: 'regular-6ml',
    name: 'Regular Edition 6ml',
    edition: 'Regular',
    volume: '6ml',
    canvas: {
      width: 1024,
      height: 1024,
    },
    assets: {
      bottle: '/templates/regular-6ml/bottle.png',
      oilMask: '/templates/regular-6ml/oil-mask.png',
      logo: '/templates/regular-6ml/logo.png',
    },
    label: {
      x: 398,
      y: 330,
      width: 235,
      height: 52,
      fontSize: 25,
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      fontWeight: '700',
      fontColor: '#000000',
    },
    oil: {
      x: 295,
      y: 395,
      width: 440,
      height: 395,
    },
    disabled: false,
  },
  'luxury-3ml': {
    id: 'luxury-3ml',
    name: 'Luxury Edition 3ml',
    edition: 'Luxury',
    volume: '3ml',
    canvas: {
      width: 1024,
      height: 1024,
    },
    assets: {
      bottle: '/templates/luxury-3ml/bottle.png',
      oilMask: '/templates/luxury-3ml/oil-mask.png',
      logo: '/templates/luxury-3ml/logo.png',
    },
    label: {
      x: 383,
      y: 338,
      width: 261,
      height: 63,
      fontSize: 25,
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      fontWeight: '700',
      fontColor: '#000000',
    },
    oil: {
      x: 376,
      y: 428,
      width: 284,
      height: 382,
    },
    disabled: false,
  },
  'luxury-6ml': {
    id: 'luxury-6ml',
    name: 'Luxury Edition 6ml',
    edition: 'Luxury',
    volume: '6ml',
    canvas: {
      width: 1024,
      height: 1024,
    },
    assets: {
      bottle: '/templates/luxury-6ml/bottle.png',
      oilMask: '/templates/luxury-6ml/oil-mask.png',
      logo: '/templates/luxury-6ml/logo.png',
    },
    label: {
      x: 381,
      y: 313,
      width: 262,
      height: 54,
      fontSize: 25,
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      fontWeight: '700',
      fontColor: '#000000',
    },
    oil: {
      x: 371,
      y: 392,
      width: 281,
      height: 419,
    },
    disabled: false,
  },
};

export const DEFAULT_TEMPLATE_ID = 'regular-3ml';

export function getTemplateById(id: string): ProductTemplate {
  const t = TEMPLATES[id];
  if (!t) {
    return TEMPLATES[DEFAULT_TEMPLATE_ID];
  }
  return t;
}

export const COLOR_PRESETS: ColorPreset[] = [
  { name: 'Mask Rizali', hex: '#C58B42', description: 'Warm Golden Amber' },
  { name: 'Royal Oudh', hex: '#703816', description: 'Deep Woody Oudh' },
  { name: 'Red African', hex: '#941B0C', description: 'Rich Garnet Red' },
  { name: 'Eden Juicy Apple', hex: '#8EA604', description: 'Vibrant Green Olive' },
  { name: 'White Musk / Tahara', hex: '#E8DCB8', description: 'Soft Champagne Silk' },
  { name: 'Baccarat Amber', hex: '#B84A14', description: 'Bright Amber Saffron' },
  { name: 'Rose & Jasmine', hex: '#A8201A', description: 'Velvet Crimson Rose' },
  { name: 'Dark Tobacco Oud', hex: '#441C09', description: 'Dark Roast Agarwood' },
];
