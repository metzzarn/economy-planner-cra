import { Language } from 'redux/common';

export const convertToNumber = (value: string): number =>
  +value
    .replace(/,(?=.*,)/g, '')
    .replace(',', '.')
    .replace(/[^0-9.-]/g, '');

export const formatPrice = (
  value: string,
  decimalPlaces: number,
  currency: Language
) =>
  value !== undefined
    ? convertToNumber(value).toLocaleString(currency.locale, {
        currency: currency.currency,
        style: 'currency',
        maximumFractionDigits: decimalPlaces,
      })
    : '';

export const currencySymbol = (currency: Language) => {
  const symbol = Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currency.currency,
  })
    .formatToParts(1.1)
    .find((part) => part.type === 'currency')?.value;

  const decimal = Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currency.currency,
  })
    .formatToParts(1.1)
    .find((part) => part.type === 'decimal')?.value;

  return { symbol: symbol ? symbol : '', decimal: decimal ? decimal : '' };
};
