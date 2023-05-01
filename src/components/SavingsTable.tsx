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
import {
  Editable,
  EditableArea,
  EditableInput,
  EditablePreview,
} from '@ark-ui/react';
import { FinancialEntryForm } from 'components/FinancialEntryForm';

export const SavingsTable = () => {
  const dispatch = useAppDispatch();
  const savings = useAppSelector(selectSavings);
  const title = useAppSelector(selectSavingsTitle) || 'Savings';

  return (
    <div>
      <h2>
        <Editable
          name={'expensesTitle'}
          placeholder={title}
          defaultValue={title}
          onSubmit={(value) => editSavingsTitle(value.value)}
          maxLength={25}
          selectOnFocus={false}
        >
          <EditableArea>
            <EditableInput />
            <EditablePreview />
          </EditableArea>
        </Editable>
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
              value: amount,
              description: description,
            })
          );
        }}
        removeRow={(index) => dispatch(removeSaving(Number(index)))}
      />
    </div>
  );
};
