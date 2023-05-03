import { convertToNumber, currencySymbol } from 'utils/numberUtils';
import React, { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { addIncome } from 'redux/incomeSlice';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { isValidNumber, validNumberPattern } from 'utils/validation';
import { selectCurrency } from 'redux/settingsSlice';

export const IncomeForm = () => {
  const dispatch = useAppDispatch();
  const currency = useAppSelector(selectCurrency);

  const [errorText, setErrorText] = useState<string>(' ');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const netIncome = formData.get('netIncome') as string;
    dispatch(addIncome({ value: convertToNumber(netIncome) }));
    setErrorText(' ');
  };

  return (
    <Box component={'form'} sx={{ mt: 1 }} onSubmit={handleSubmit}>
      <TextField
        sx={{ m: 1 }}
        required
        label={'Net income'}
        name={'netIncome'}
        variant={'outlined'}
        size={'small'}
        placeholder={'0,0'.replace(',', currencySymbol(currency).decimal)}
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
              {currencySymbol(currency).symbol}
            </InputAdornment>
          ),
          inputProps: {
            inputMode: 'decimal',
            pattern: validNumberPattern,
          },
        }}
        onChange={(event) =>
          isValidNumber(event.target.value)
            ? setErrorText(' ')
            : setErrorText('Must be a valid number')
        }
        helperText={errorText}
      />
      <Button sx={{ m: 1 }} variant="contained" type={'submit'}>
        Add income
      </Button>
    </Box>
  );
};
