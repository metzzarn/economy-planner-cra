import { Currency } from 'redux/settingsSlice';

export const convertToNumber = (value: string): number =>
  +value
    .replace(/,(?=.*,)/g, '')
    .replace(',', '.')
    .replace(/[^0-9.-]/g, '');

export const formatPrice = (
  value: string,
  decimalPlaces: number,
  currency: Currency
) =>
  value !== undefined
    ? convertToNumber(value).toLocaleString(currency.locale, {
        currency: currency.currency,
        style: 'currency',
        maximumFractionDigits: decimalPlaces,
      })
    : '';
