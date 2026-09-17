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
      x: 370,
      y: 300,
      width: 284,
      height: 60,
      fontSize: 22,
    },
    oil: {
      x: 280,
      y: 400,
      width: 464,
      height: 400,
    },
    disabled: true,
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
      x: 410,
      y: 360,
      width: 204,
      height: 55,
      fontSize: 20,
    },
    oil: {
      x: 400,
      y: 440,
      width: 224,
      height: 420,
    },
    disabled: true,
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
      x: 380,
      y: 350,
      width: 264,
      height: 55,
      fontSize: 20,
    },
    oil: {
      x: 300,
      y: 430,
      width: 424,
      height: 420,
    },
    disabled: true,
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
