import { convertToNumber, currencySymbol } from 'utils/numberUtils';
import React, { FormEvent, useState } from 'react';
import { isValidNumber, validNumberPattern } from 'utils/validation';
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useAppSelector } from 'hooks';
import { selectLanguage } from 'redux/settingsSlice';
import { getTax } from 'utils/skatteverket';
import { useTranslation } from 'react-i18next';

interface Props {
  action: (value: number, tax: number) => void;
}

export const IncomeEntryForm = (props: Props) => {
  const [taxErrorText, setTaxErrorText] = useState<string>('');
  const [incomeErrorText, setIncomeErrorText] = useState<string>('');
  const [column, setColumn] = useState<number>(1);
  const [tableNumber, setTableNumber] = useState<number>(32);
  const [taxYear, setTaxYear] = useState<number>(new Date().getFullYear());
  const [useSkatteverket, setUseSkatteverket] = useState<boolean>(true);
  const { t } = useTranslation();

  const language = useAppSelector(selectLanguage);

  const handleSkatteverketToggle = () => {
    setUseSkatteverket(!useSkatteverket);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const income = formData.get('value') as string;
    const userDefinedTax = formData.get('tax') as string;

    if (
      !isValidNumber(income) ||
      (!useSkatteverket &&
        (userDefinedTax === '' || !isValidNumber(userDefinedTax)))
    ) {
      setTaxErrorText('Must be set if not using Skatteverket');
      return;
    }

    await getTax(
      income,
      userDefinedTax,
      tableNumber,
      column,
      taxYear,
      useSkatteverket,
    ).then((tax) =>
      props.action(convertToNumber(income), convertToNumber(tax)),
    );
  };

  return (
    <Box component={'form'} sx={{ mt: 1 }} onSubmit={handleSubmit}>
      <TextField
        sx={{ m: 1 }}
        required
        label={t('Gross income')}
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
        label={t('Tax')}
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
      <FormGroup sx={{ m: 1 }}>
        <FormControlLabel
          control={
            <Checkbox onChange={handleSkatteverketToggle} defaultChecked />
          }
          label={t('Get tax from Skattverket')}
        />
      </FormGroup>
      <Collapse in={useSkatteverket}>
        <Box sx={{ display: 'flex' }}>
          <TextField
            sx={{ m: 1 }}
            label={t('Table number')}
            name={'table-number'}
            variant={'outlined'}
            size={'small'}
            placeholder={'32'}
            onChange={(event) => setTableNumber(Number(event.target.value))}
          />
          <TextField
            sx={{ m: 1 }}
            label={t('Column')}
            name={'column'}
            variant={'outlined'}
            size={'small'}
            placeholder={'1'}
            onChange={(event) => setColumn(Number(event.target.value))}
          />
          <TextField
            sx={{ m: 1 }}
            label={t('Year')}
            name={'year'}
            variant={'outlined'}
            size={'small'}
            placeholder={'2023'}
            onChange={(event) => setTaxYear(Number(event.target.value))}
          />
        </Box>
      </Collapse>
      <Button sx={{ m: 1 }} variant="contained" type={'submit'}>
        {t('Add income')}
      </Button>
    </Box>
  );
};
