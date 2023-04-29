import React from 'react';
import { Table } from 'common/table/Table';
import { TableHeader } from 'common/table/TableHeader';
import { TableRow } from 'common/table/TableRow';
import { TableRowItem } from 'common/table/TableRowItem';
import { formatPrice } from 'utils/numberUtils';
import { If } from 'common/If';
import {
  IncomeEntry,
  removeIncome,
  selectIncomeList,
  selectIncomeSortOrder,
  setSelectedIncome,
  sortIncomesByValue,
} from 'redux/incomeSlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { SortOrder } from 'common/SortOrder';
import { selectDecimalPlaces } from 'redux/settingsSlice';

export const IncomeList = () => {
  const dispatch = useAppDispatch();
  const incomeList = useAppSelector(selectIncomeList);
  const sortOrder = useAppSelector(selectIncomeSortOrder);
  const decimalPlaces = useAppSelector(selectDecimalPlaces);

  const rows = () => {
    return incomeList.map((income: IncomeEntry, index: number) => (
      <TableRow key={index}>
        <TableRowItem
          value={formatPrice(income.value.toString(), decimalPlaces)}
          onClick={() => dispatch(setSelectedIncome(index))}
          style={{ cursor: 'pointer' }}
        />
        <TableRowItem
          style={{ cursor: 'pointer' }}
          value={'X'}
          onClick={() => dispatch(removeIncome(index))}
        />
      </TableRow>
    ));
  };

  return (
    <div style={{ width: '700px' }}>
      <If true={incomeList?.length > 0}>
        <Table rows={rows()}>
          <TableHeader
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
          </TableHeader>
          <TableHeader width={'5%'}></TableHeader>
        </Table>
      </If>
    </div>
  );
};
