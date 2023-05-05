import React from 'react';
import { If } from 'common/If';
import {
  IncomeEntry,
  removeIncome,
  selectIncome,
  selectIncomeList,
  selectIncomeSortOrder,
  setSelectedIncome,
  sortIncomesByValue,
} from 'redux/incomeSlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { SortOrder } from 'common/SortOrder';

export const IncomeList = () => {
  const dispatch = useAppDispatch();
  const incomeList = useAppSelector(selectIncomeList);
  const sortOrder = useAppSelector(selectIncomeSortOrder);
  const selectedIncome = useAppSelector(selectIncome);

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 700 }}>
      <If true={incomeList?.length > 0}>
        <Table size="small" aria-label="income table">
          <TableHead>
            <TableRow>
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
                  <span
                    style={{
                      cursor: 'pointer',
                      fontWeight:
                        income.value === selectedIncome ? 'bold' : 'normal',
                    }}
                  >
                    {income.value}
                  </span>
                </TableCell>
                <TableCell
                  align="right"
                  onClick={() => dispatch(removeIncome(index))}
                  style={{ cursor: 'pointer' }}
                >
                  X
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </If>
    </TableContainer>
  );
};
