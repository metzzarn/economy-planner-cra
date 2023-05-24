import { useAppDispatch, useAppSelector } from 'hooks';
import {
  selectCurrency,
  selectDecimalPlaces,
  selectSavedTabHome,
  selectSaveTab,
  setCurrency,
  setDecimalPlaces,
  setSavedTabHome,
  setSaveTab,
} from 'redux/settingsSlice';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Tooltip,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

export const Settings = () => {
  const dispatch = useAppDispatch();
  const decimalPlaces = useAppSelector(selectDecimalPlaces);
  const currency = useAppSelector(selectCurrency);
  const savedTabHome = useAppSelector(selectSavedTabHome);
  const saveTab = useAppSelector(selectSaveTab);

  const [savedTabHomeState, setSavedTabHomeState] = useState('-1');

  useEffect(() => {
    setSavedTabHomeState(saveTab ? savedTabHome.toString() : '-1');
  }, [savedTabHome]);

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

  const handleSavedTabChange = (event: SelectChangeEvent) => {
    setSavedTabHomeState(event.target.value);

    if (parseInt(event.target.value) === -1) {
      dispatch(setSaveTab(false));
      return;
    }

    dispatch(setSaveTab(true));
    dispatch(setSavedTabHome(parseInt(event.target.value)));
  };

  return (
    <div>
      <h2>Settings</h2>
      <div>
        <FormControl sx={{ display: 'inline-block', my: 2 }}>
          <FormLabel id={'decimal-places-radio-group'}>
            Decimal Places
          </FormLabel>
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
      </div>

      <div>
        <FormControl sx={{ display: 'inline-block', my: 2 }}>
          <FormLabel id={'currency-radio-group'}>Currency</FormLabel>
          <RadioGroup
            row
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

      <div>
        <FormControl sx={{ display: 'inline-block', my: 2 }}>
          <Tooltip
            title={'Set default tab when opening the app'}
            enterDelay={700}
          >
            <div>
              <InputLabel id="default-home-tab-label">Tab</InputLabel>
              <Select
                labelId="default-home-tab-label"
                id="default-home-tab"
                value={savedTabHomeState}
                label="Tab"
                onChange={handleSavedTabChange}
              >
                <MenuItem value={-1}>--None--</MenuItem>
                <MenuItem value={0}>Income</MenuItem>
                <MenuItem value={1}>Expenses</MenuItem>
                <MenuItem value={2}>Savings</MenuItem>
              </Select>
            </div>
          </Tooltip>
        </FormControl>
      </div>
    </div>
  );
};
