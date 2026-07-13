import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(value: number, currency: 'PEN' = 'PEN') {
  const symbol = currency === 'PEN' ? 'S/ ' : '$';
  return `${symbol}${value.toLocaleString('es-PE')}`;
}

export function formatDate(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatShortDate(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'short',
  });
}

export function daysUntil(iso: string) {
  const target = new Date(`${iso}T00:00:00`).getTime();
  const now = Date.now();
  return Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24)));
}
