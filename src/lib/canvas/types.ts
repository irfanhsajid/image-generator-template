export interface ProductTemplate {
  id: string;
  name: string;
  edition: string;
  volume: string;
  canvas: {
    width: number;
    height: number;
  };
  assets: {
    bottle: string;
    oilMask: string;
    logo: string;
  };
  label: {
    x: number;
    y: number;
    width: number;
    height: number;
    fontSize: number;
    fontFamily?: string;
    fontWeight?: string;
    fontColor?: string;
  };
  oil: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  disabled?: boolean;
}

export interface RenderOptions {
  template: ProductTemplate;
  productName: string;
  oilColor: string;
}

export interface ColorPreset {
  name: string;
  hex: string;
  description: string;
}
