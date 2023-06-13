import React from 'react';
import { addIncome, removeIncome, selectIncomeList } from 'redux/incomeSlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { IncomeEntryForm } from 'components/IncomeEntryForm';
import { IncomeTable } from 'components/IncomeTable';

export const IncomeList = () => {
  const dispatch = useAppDispatch();
  const incomeList = useAppSelector(selectIncomeList);

  return (
    <div>
      <IncomeEntryForm
        action={(value, tax) => dispatch(addIncome({ value, tax }))}
        namePlaceholder={'Car'}
        descriptionPlaceholder={'Autogiro - den 25e'}
        buttonText={'Add saving'}
      />
      <IncomeTable
        data={incomeList}
        removeRow={(index) => dispatch(removeIncome(Number(index)))}
      />
    </div>
  );
};
