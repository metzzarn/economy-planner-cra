import { convertToNumber, currencySymbol } from 'utils/numberUtils';
import React, { FormEvent, useRef, useState } from 'react';
import {
  isValidNumber,
  maxLength,
  requiredMaxLength,
  validNumberPattern,
} from 'utils/validation';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { useAppSelector } from 'hooks';
import { selectLanguage } from 'redux/settingsSlice';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '@mui/x-date-pickers';

interface Props {
  action: (
    name: string,
    value: number,
    totalSavingsAmount: number,
    totalSavingsAmountDate: string,
    description: string,
  ) => void;
}

export const SavingEntryForm = (props: Props) => {
  const [nameErrorText, setNameErrorText] = useState<string>('');
  const [amountErrorText, setAmountErrorText] = useState<string>('');
  const [totalSavingsAmountErrorText, setTotalSavingsAmountErrorText] =
    useState<string>('');
  const [totalSavingsAmountDateErrorText, setTotalSavingsAmountDateErrorText] =
    useState<string>('');
  const [descriptionErrorText, setDescriptionErrorText] = useState<string>('');
  const nameRef = useRef<HTMLInputElement>();
  const { t } = useTranslation();

  const language = useAppSelector(selectLanguage);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const value = formData.get('value') as string;
    const totalSavingsAmount = formData.get('totalSavingsAmount') as string;
    const totalSavingsAmountDate = formData.get(
      'totalSavingsAmountDate',
    ) as string;
    const description = formData.get('description') as string;

    if (!name || !isValidNumber(value)) {
      return;
    }

    if (
      (totalSavingsAmount && !totalSavingsAmountDate) ||
      (!totalSavingsAmount && totalSavingsAmountDate)
    ) {
      totalSavingsAmount
        ? setTotalSavingsAmountErrorText(' ')
        : setTotalSavingsAmountErrorText(t('Required when setting a date'));
      totalSavingsAmountDate
        ? setTotalSavingsAmountDateErrorText(' ')
        : setTotalSavingsAmountDateErrorText(
            t('Required when setting saved amount'),
          );
      return;
    }

    nameRef?.current?.focus();
    nameRef?.current?.select();
    props.action(
      name,
      convertToNumber(value),
      convertToNumber(totalSavingsAmount),
      totalSavingsAmountDate,
      description,
    );
  };

  return (
    <Box component={'form'} sx={{ mt: 1 }} onSubmit={handleSubmit}>
      <TextField
        sx={{ m: 1 }}
        required
        label={t('Name')}
        name={'name'}
        variant={'outlined'}
        size={'small'}
        placeholder={t('Car')}
        onChange={(event) =>
          setNameErrorText(requiredMaxLength(t, event.target.value))
        }
        inputRef={nameRef}
        helperText={nameErrorText}
      />
      <TextField
        sx={{ m: 1 }}
        required
        label={t('Amount')}
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
            ? setAmountErrorText(' ')
            : setAmountErrorText(t('Must be a valid number'))
        }
        helperText={amountErrorText}
      />
      <TextField
        sx={{ m: 1 }}
        label={t('Start amount')}
        name={'totalSavingsAmount'}
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
        onInvalid={(event) =>
          setTotalSavingsAmountErrorText(t('Must be a valid number'))
        }
        onChange={(event) =>
          isValidNumber(event.target.value) || !event.target.value
            ? setTotalSavingsAmountErrorText(' ')
            : setTotalSavingsAmountErrorText(t('Must be a valid number'))
        }
        helperText={totalSavingsAmountErrorText}
      />
      <DatePicker
        sx={{ m: 1 }}
        slotProps={{
          textField: {
            size: 'small',
            name: 'totalSavingsAmountDate',
            helperText: totalSavingsAmountDateErrorText,
          },
        }}
        label={t('Start date')}
        format={'YYYY-MM-DD'}
        disableFuture
      />
      <TextField
        sx={{ m: 1 }}
        label={t('Description')}
        name={'description'}
        variant={'outlined'}
        size={'small'}
        placeholder={t('Autogiro - den 25e')}
        onChange={(event) =>
          setDescriptionErrorText(maxLength(event.target.value))
        }
        helperText={descriptionErrorText}
      />
      <Button sx={{ m: 1 }} variant="contained" type={'submit'}>
        {t('Add saving')}
      </Button>
    </Box>
  );
};
