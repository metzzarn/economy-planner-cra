import { Language } from 'redux/common';

export const convertToNumber = (value: string): number =>
  +value
    .replace(/,(?=.*,)/g, '')
    .replace(',', '.')
    .replace(/[^0-9.-]/g, '');

export const formatAmount = (
  value: string,
  decimalPlaces: number,
  language: Language
) =>
  value !== undefined
    ? convertToNumber(value).toLocaleString(language.locale, {
        currency: language.currency,
        style: 'currency',
        maximumFractionDigits: decimalPlaces,
      })
    : '';

export const currencySymbol = (language: Language) => {
  const symbol = Intl.NumberFormat(language.locale, {
    style: 'currency',
    currency: language.currency,
  })
    .formatToParts(1.1)
    .find((part) => part.type === 'currency')?.value;

  const decimal = Intl.NumberFormat(language.locale, {
    style: 'currency',
    currency: language.currency,
  })
    .formatToParts(1.1)
    .find((part) => part.type === 'decimal')?.value;

  return { symbol: symbol ? symbol : '', decimal: decimal ? decimal : '' };
};
