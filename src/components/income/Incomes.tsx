import React from 'react';
import { addIncome, removeIncome, selectIncomeList } from 'redux/incomeSlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { IncomeEntryForm } from 'components/income/IncomeEntryForm';
import { IncomeTable } from 'components/income/IncomeTable';
import { Box } from '@mui/material';

export const Incomes = () => {
  const dispatch = useAppDispatch();
  const incomeList = useAppSelector(selectIncomeList);

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <IncomeEntryForm
          action={(value, tax) => dispatch(addIncome({ value, tax }))}
        />
      </Box>
      <IncomeTable
        data={incomeList}
        removeRow={(index) => dispatch(removeIncome(Number(index)))}
      />
    </div>
  );
};
