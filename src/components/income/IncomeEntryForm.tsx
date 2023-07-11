import { convertToNumber, currencySymbol } from 'utils/numberUtils';
import React, { FormEvent, useState } from 'react';
import { isValidNumber, validNumberPattern } from 'utils/validation';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { useAppSelector } from 'hooks';
import { selectLanguage } from 'redux/settingsSlice';

interface Props {
  action: (value: number, tax: number) => void;
  namePlaceholder: string;
  descriptionPlaceholder?: string;
  buttonText?: string;
}

export const IncomeEntryForm = (props: Props) => {
  const [taxErrorText, setTaxErrorText] = useState<string>('');
  const [incomeErrorText, setIncomeErrorText] = useState<string>('');

  const language = useAppSelector(selectLanguage);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const income = formData.get('value') as string;
    const tax = formData.get('tax') as string;

    if (!isValidNumber(income) || (tax !== '' && !isValidNumber(tax))) {
      return;
    }

    props.action(convertToNumber(income), convertToNumber(tax));
  };

  return (
    <Box component={'form'} sx={{ mt: 1 }} onSubmit={handleSubmit}>
      <TextField
        sx={{ m: 1 }}
        required
        label={'Gross income'}
        name={'value'}
        variant={'outlined'}
        size={'small'}
        placeholder={'0,0'.replace(',', currencySymbol(language).decimal)}
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
              {currencySymbol(language).symbol}
            </InputAdornment>
          ),
          inputProps: {
            inputMode: 'decimal',
            pattern: validNumberPattern,
          },
        }}
        onChange={(event) =>
          isValidNumber(event.target.value)
            ? setIncomeErrorText(' ')
            : setIncomeErrorText('Must be a valid number')
        }
        helperText={incomeErrorText}
      />
      <TextField
        sx={{ m: 1 }}
        label={'Tax'}
        name={'tax'}
        variant={'outlined'}
        size={'small'}
        placeholder={'0,0'.replace(',', currencySymbol(language).decimal)}
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
              {currencySymbol(language).symbol}
            </InputAdornment>
          ),
          inputProps: {
            inputMode: 'decimal',
            pattern: validNumberPattern,
          },
        }}
        onChange={(event) =>
          isValidNumber(event.target.value)
            ? setTaxErrorText(' ')
            : setTaxErrorText('Must be a valid number')
        }
        helperText={taxErrorText}
      />
      <Button sx={{ m: 1 }} variant="contained" type={'submit'}>
        Add income
      </Button>
    </Box>
  );
};
