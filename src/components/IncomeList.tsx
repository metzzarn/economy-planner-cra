import React, { FormEvent, useState } from 'react';
import { If } from 'common/If';
import {
  addIncome,
  removeIncome,
  selectIncome,
  selectIncomeList,
  selectIncomeSortOrder,
  setSelectedIncome,
  sortIncomesByValue,
} from 'redux/incomeSlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  Box,
  Button,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from '@mui/material';
import { SortOrder } from 'common/SortOrder';
import { IncomeEntry } from 'redux/common';
import { convertToNumber, currencySymbol } from 'utils/numberUtils';
import { isValidNumber, validNumberPattern } from 'utils/validation';
import { selectCurrency } from 'redux/settingsSlice';

export const IncomeList = () => {
  const dispatch = useAppDispatch();
  const incomeList = useAppSelector(selectIncomeList);
  const sortOrder = useAppSelector(selectIncomeSortOrder);
  const selectedIncome = useAppSelector(selectIncome);
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
    <div>
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
      <TableContainer component={Paper} sx={{ maxWidth: 700 }}>
        <If true={incomeList?.length > 0}>
          <Table size="small" aria-label="income table">
            <TableHead>
              <TableRow>
                <Tooltip title={'Click to sort'} enterDelay={700}>
                  <TableCell
                    onClick={() =>
                      dispatch(
                        sortIncomesByValue(
                          sortOrder === SortOrder.Descending
                            ? SortOrder.Ascending
                            : SortOrder.Descending
                        )
                      )
                    }
                    style={{ cursor: 'pointer' }}
                  >
                    Net income
                  </TableCell>
                </Tooltip>
                <TableCell align="left" width={'5%'} />
              </TableRow>
            </TableHead>
            <TableBody>
              {incomeList.map((income: IncomeEntry, index: number) => (
                <TableRow
                  key={income.value}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    onClick={() => dispatch(setSelectedIncome(index))}
                  >
                    <Tooltip title={'Select income'} enterDelay={700}>
                      <span
                        style={{
                          cursor: 'pointer',
                          fontWeight:
                            income.value === selectedIncome ? 'bold' : 'normal',
                        }}
                      >
                        {income.value}
                      </span>
                    </Tooltip>
                  </TableCell>
                  <Tooltip title={'Remove income'} enterDelay={700}>
                    <TableCell
                      align="right"
                      onClick={() => dispatch(removeIncome(index))}
                      style={{ cursor: 'pointer' }}
                    >
                      X
                    </TableCell>
                  </Tooltip>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </If>
      </TableContainer>
    </div>
  );
};
