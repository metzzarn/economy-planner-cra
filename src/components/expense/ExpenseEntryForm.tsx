import { convertToNumber, currencySymbol } from 'utils/numberUtils';
import React, { FormEvent, useRef, useState } from 'react';
import {
  isValidNumber,
  maxLength,
  requiredMaxLength,
  validNumberPattern,
} from 'utils/validation';
import {
  Box,
  Button,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from '@mui/material';
import { useAppSelector } from 'hooks';
import { selectLanguage } from 'redux/settingsSlice';

interface Props {
  action: (
    name: string,
    value: number,
    description: string,
    priority: string,
  ) => void;
  namePlaceholder: string;
  descriptionPlaceholder?: string;
  buttonText?: string;
}

export const ExpenseEntryForm = (props: Props) => {
  const priorities = ['Must', 'Need', 'Want'];

  const [nameErrorText, setNameErrorText] = useState<string>('');
  const [amountErrorText, setAmountErrorText] = useState<string>('');
  const [descriptionErrorText, setDescriptionErrorText] = useState<string>('');
  const [priority, setPriority] = useState<string>(priorities[0]);
  const nameRef = useRef<HTMLInputElement>();

  const language = useAppSelector(selectLanguage);

  const handlePriorityChange = (event: any) => {
    setPriority(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const value = formData.get('value') as string;
    const description = formData.get('description') as string;

    if (!name || !isValidNumber(value)) {
      return;
    }

    nameRef?.current?.focus();
    nameRef?.current?.select();
    props.action(name, convertToNumber(value), description, priority);
  };

  return (
    <Box component={'form'} sx={{ mt: 1 }} onSubmit={handleSubmit}>
      <TextField
        sx={{ m: 1 }}
        required
        label={'Name'}
        name={'name'}
        variant={'outlined'}
        size={'small'}
        placeholder={props.namePlaceholder}
        onChange={(event) =>
          setNameErrorText(requiredMaxLength(event.target.value))
        }
        inputRef={nameRef}
        helperText={nameErrorText}
      />
      <TextField
        sx={{ m: 1 }}
        required
        label={'Amount'}
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
            : setAmountErrorText('Must be a valid number')
        }
        helperText={amountErrorText}
      />
      <TextField
        sx={{ m: 1 }}
        label={'Description'}
        name={'description'}
        variant={'outlined'}
        size={'small'}
        placeholder={
          props.descriptionPlaceholder ? props.descriptionPlaceholder : ''
        }
        onChange={(event) =>
          setDescriptionErrorText(maxLength(event.target.value))
        }
        helperText={descriptionErrorText}
      />
      <Tooltip title={'Set priority of the expense'} enterDelay={700}>
        <div>
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            id="priority"
            defaultValue={priorities[0]}
            label={'Priority'}
            name={'priority'}
            onChange={handlePriorityChange}
          >
            {priorities.map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}
          </Select>
        </div>
      </Tooltip>
      <Button sx={{ m: 1 }} variant="contained" type={'submit'}>
        Add
      </Button>
    </Box>
  );
};
