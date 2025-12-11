import products from '@/data/products.json';
import cases from '@/data/cases.json';
import downloads from '@/data/downloads.json';
import type { Product, Case, Download } from './types';

export const allProducts = products as Product[];
export const allCases = cases as Case[];
export const allDownloads = downloads as Download[];

export const findProduct = (slug: string) => allProducts.find(p => p.slug === slug);
export const findCase = (slug: string) => allCases.find(c => c.slug === slug);
