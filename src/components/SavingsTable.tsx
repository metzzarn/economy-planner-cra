import React from 'react';
import {
  addSaving,
  editSavingsTitle,
  removeSaving,
  selectSavings,
  selectSavingsTitle,
  updateSaving,
} from 'redux/savingsSlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { FinanceTable } from 'components/FinanceTable';
import { FinancialEntryForm } from 'components/FinancialEntryForm';
import { convertToNumber } from 'utils/numberUtils';
import { EditableText } from 'common/EditableText';

export const SavingsTable = () => {
  const dispatch = useAppDispatch();
  const savings = useAppSelector(selectSavings);
  const title = useAppSelector(selectSavingsTitle) || 'Savings';

  return (
    <div>
      <h2>
        <EditableText
          title={title}
          action={(value) => dispatch(editSavingsTitle(value))}
        />
      </h2>
      <FinancialEntryForm
        action={(name, value, description) =>
          dispatch(addSaving({ name, value, description }))
        }
        namePlaceholder={'Car'}
        descriptionPlaceholder={'Autogiro - den 25e'}
        buttonText={'Add saving'}
      />
      <FinanceTable
        data={savings}
        updateRow={(id, name, amount, description) => {
          dispatch(
            updateSaving({
              index: id,
              name: name,
              value: convertToNumber(amount),
              description: description,
            })
          );
        }}
        removeRow={(index) => dispatch(removeSaving(Number(index)))}
      />
    </div>
  );
};
