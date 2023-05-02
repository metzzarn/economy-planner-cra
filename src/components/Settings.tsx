import { useAppDispatch, useAppSelector } from 'hooks';
import {
  selectCurrency,
  selectDecimalPlaces,
  setCurrency,
  setDecimalPlaces,
} from 'redux/settingsSlice';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React from 'react';

export const Settings = () => {
  const dispatch = useAppDispatch();
  const decimalPlaces = useAppSelector(selectDecimalPlaces);
  const currency = useAppSelector(selectCurrency);

  const handleDecimalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDecimalPlaces(parseInt(event.target.value)));
  };

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currency =
      event.target.value === 'SEK'
        ? { currency: 'SEK', locale: 'sv-SE' }
        : { currency: 'USD', locale: 'en-US' };
    dispatch(setCurrency(currency));
  };

  return (
    <div>
      <h2>Settings</h2>
      <FormControl>
        <FormLabel id={'decimal-places-radio-group'}>Decimal Places</FormLabel>
        <RadioGroup
          row
          aria-labelledby={'decimal-places-radio-group'}
          name={'decimal-places-radio-group'}
          value={decimalPlaces}
          onChange={handleDecimalChange}
        >
          <FormControlLabel
            labelPlacement={'top'}
            value={'0'}
            control={<Radio />}
            label={'0'}
          />
          <FormControlLabel
            labelPlacement={'top'}
            value={'1'}
            control={<Radio />}
            label={'1'}
          />
          <FormControlLabel
            labelPlacement={'top'}
            value={'2'}
            control={<Radio />}
            label={'2'}
          />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel id={'currency-radio-group'}>Currency</FormLabel>
        <RadioGroup
          aria-labelledby={'currency-radio-group'}
          name={'currency-radio-group'}
          value={currency.currency}
          onChange={handleCurrencyChange}
        >
          <FormControlLabel
            labelPlacement={'top'}
            value={'SEK'}
            control={<Radio />}
            label={'Svenska kronor'}
          />
          <FormControlLabel
            labelPlacement={'top'}
            value={'USD'}
            control={<Radio />}
            label={'Dollar'}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};
