import { FormatData } from './types';

// Standard 35mm (Full Frame) dimensions for reference
// Diagonal approx 43.27mm
export const FULL_FRAME_DIMENSIONS = { width: 36, height: 24 };

export const CAMERA_FORMATS: FormatData[] = [
  {
    id: '645',
    name: '6 x 4.5',
    commonName: '645',
    dimensions: { width: 41.5, height: 56 }, // Portrait (Vertical)
    description: '最經濟的中片幅格式，原生構圖為直幅，適合人像拍攝。',
    examples: 'Pentax 645, Mamiya 645, Contax 645',
  },
  {
    id: '6x6',
    name: '6 x 6 Square',
    commonName: '6x6',
    dimensions: { width: 56, height: 56 }, // Square
    description: '經典的方形構圖，無需旋轉相機。',
    examples: 'Hasselblad 500C/M, Rolleiflex',
  },
  {
    id: '6x7',
    name: '6 x 7',
    commonName: '6x7',
    dimensions: { width: 70, height: 56 }, // Landscape
    description: '理想格式 (Ideal Format)，放大照片時裁切最少。',
    examples: 'Pentax 67, Mamiya RB67/RZ67',
  },
  {
    id: '6x8',
    name: '6 x 8',
    commonName: '6x8',
    dimensions: { width: 76, height: 56 }, // Landscape
    description: '介於 6x7 與 6x9 之間的格式，常見於電動片盒。',
    examples: 'Fujifilm GX680',
  },
  {
    id: '6x9',
    name: '6 x 9',
    commonName: '6x9',
    dimensions: { width: 84, height: 56 }, // Landscape
    description: '被稱為「德州徠卡」，如同 135 格式的巨大版。',
    examples: 'Fujifilm GSW690, Voigtländer Bessa II',
  },
  {
    id: '6x12',
    name: '6 x 12 Panorama',
    commonName: '6x12',
    dimensions: { width: 112, height: 56 }, // Landscape
    description: '標準全景格式，約為 6x6 的兩倍寬。',
    examples: 'Horseman 612, Linhof Technorama 612',
  },
  {
    id: '6x17',
    name: '6 x 17 Panorama',
    commonName: '6x17',
    dimensions: { width: 168, height: 56 }, // Landscape
    description: '極致寬幅全景，單張底片寬度驚人。',
    examples: 'Linhof Technorama 617, Fujifilm GX617',
  }
];