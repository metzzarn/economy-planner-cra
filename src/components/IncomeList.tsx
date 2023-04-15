import React from 'react';
import { Table } from 'common/table/Table';
import { TableHeader } from 'common/table/TableHeader';
import { useSelector } from 'react-redux';
import { TableRow } from 'common/table/TableRow';
import { TableRowItem } from 'common/table/TableRowItem';
import { formatPrice } from 'utils/numberUtils';
import { If } from 'common/If';
import { selectIncomeList } from 'redux/incomeSlice';

export const IncomeList = () => {
  const incomeList = useSelector(selectIncomeList);

  const rows = () => {
    return incomeList.map((income, index) => {
      return (
        <TableRow key={index}>
          <TableRowItem
            index={index}
            value={formatPrice(income.value.toString())}
          />
        </TableRow>
      );
    });
  };

  return (
    <div style={{ width: '700px' }}>
      <If true={incomeList?.length > 0}>
        <Table rows={rows()}>
          <TableHeader>Net income</TableHeader>
        </Table>
      </If>
    </div>
  );
};
