import React from 'react';
import {
  editExpensesTitle,
  removeExpense,
  selectExpenses,
  selectExpensesSortOrder,
  selectExpensesTitle,
  sortExpensesByName,
  sortExpensesByValue,
  updateExpense,
} from 'redux/expensesSlice';
import { convertToNumber } from 'utils/numberUtils';
import { If } from 'common/If';
import { useAppDispatch, useAppSelector } from 'hooks';
import { FinancialEntry } from 'redux/common';
import {
  Editable,
  EditableArea,
  EditableInput,
  EditablePreview,
} from '@ark-ui/react';
import { SortOrder } from 'common/SortOrder';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export const ExpensesTable = () => {
  const dispatch = useAppDispatch();
  const expenses = useAppSelector(selectExpenses);
  const sortOrder = useAppSelector(selectExpensesSortOrder);
  const title = useAppSelector(selectExpensesTitle) || 'Expenses';

  return (
    <div style={{ width: '700px' }}>
      <h2>
        <Editable
          name={'expensesTitle'}
          placeholder={title}
          defaultValue={title}
          onSubmit={(value) => dispatch(editExpensesTitle(value.value))}
          maxLength={25}
          selectOnFocus={false}
        >
          <EditableArea>
            <EditableInput />
            <EditablePreview />
          </EditableArea>
        </Editable>
      </h2>
      <TableContainer component={Paper} sx={{ maxWidth: 700 }}>
        <If true={expenses?.length > 0}>
          <Table size="small" aria-label="income table">
            <TableHead>
              <TableRow>
                <TableCell
                  onClick={() =>
                    dispatch(
                      sortExpensesByName(
                        sortOrder === SortOrder.Descending
                          ? SortOrder.Ascending
                          : SortOrder.Descending
                      )
                    )
                  }
                  style={{ cursor: 'pointer' }}
                >
                  Name
                </TableCell>
                <TableCell
                  onClick={() =>
                    dispatch(
                      sortExpensesByValue(
                        sortOrder === SortOrder.Descending
                          ? SortOrder.Ascending
                          : SortOrder.Descending
                      )
                    )
                  }
                  style={{ cursor: 'pointer' }}
                >
                  Amount (kr)
                </TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="left" width={'5%'} />
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense: FinancialEntry, index: number) => {
                const updateName = (value: string) => {
                  return dispatch(
                    updateExpense({
                      name: value,
                      value: expense.value,
                      description: expense.description,
                      index,
                    })
                  );
                };
                const updateValue = (value: string) => {
                  return dispatch(
                    updateExpense({
                      name: expense.name,
                      value: convertToNumber(value),
                      description: expense.description,
                      index,
                    })
                  );
                };
                const updateDescription = (description: string) => {
                  return dispatch(
                    updateExpense({
                      name: expense.name,
                      value: expense.value,
                      description: description,
                      index,
                    })
                  );
                };
                return (
                  <TableRow
                    key={expense.value}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={() => updateName}
                    >
                      <span style={{ cursor: 'pointer' }}>{expense.name}</span>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={() => updateValue}
                    >
                      <span style={{ cursor: 'pointer' }}>{expense.value}</span>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={() => updateDescription}
                    >
                      <span style={{ cursor: 'pointer' }}>
                        {expense.description}
                      </span>
                    </TableCell>
                    <TableCell
                      align="right"
                      onClick={() => dispatch(removeExpense(index))}
                      style={{ cursor: 'pointer' }}
                    >
                      X
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </If>
      </TableContainer>
    </div>
  );
  //
  // const rows = () => {
  //   return expenses.map((expense: FinancialEntry, index: number) => {
  //     const updateName = (value: string) => {
  //       return dispatch(
  //         updateExpense({
  //           name: value,
  //           value: expense.value,
  //           description: expense.description,
  //           index,
  //         })
  //       );
  //     };
  //     const updateValue = (value: string) => {
  //       return dispatch(
  //         updateExpense({
  //           name: expense.name,
  //           value: convertToNumber(value),
  //           description: expense.description,
  //           index,
  //         })
  //       );
  //     };
  //     const updateDescription = (description: string) => {
  //       return dispatch(
  //         updateExpense({
  //           name: expense.name,
  //           value: expense.value,
  //           description: description,
  //           index,
  //         })
  //       );
  //     };
  //     return (
  //       <TableRow key={index}>
  //         <TableRowItem allowEdit action={updateName} value={expense.name} />
  //         <TableRowItem
  //           allowEdit
  //           action={updateValue}
  //           value={formatPrice(expense.value.toString(), decimalPlaces)}
  //         />
  //         <TableRowItem
  //           allowEdit
  //           action={updateDescription}
  //           value={expense.description}
  //         />
  //         <TableRowItem
  //           style={{ cursor: 'pointer' }}
  //           value={'X'}
  //           onClick={() => dispatch(removeExpense(index))}
  //         />
  //       </TableRow>
  //     );
  //   });
  // };
  //
  // const footer = () => {
  //   return (
  //     <TableFooter>
  //       <TableFooterItem>
  //         <span style={{ fontWeight: 'bold' }}>Total</span>
  //       </TableFooterItem>
  //       <TableFooterItem>
  //         {formatPrice(
  //           expenses
  //             .reduce(
  //               (acc: number, curr: FinancialEntry) => acc + curr.value,
  //               0
  //             )
  //             .toString(),
  //           decimalPlaces
  //         )}
  //       </TableFooterItem>
  //     </TableFooter>
  //   );
  // };
  //
  // return (
  //   <div style={{ width: '700px' }}>
  //     <h2>
  //       <Editable
  //         name={'expensesTitle'}
  //         placeholder={title}
  //         defaultValue={title}
  //         onSubmit={(value) => dispatch(editExpensesTitle(value.value))}
  //         maxLength={25}
  //         selectOnFocus={false}
  //       >
  //         <EditableArea>
  //           <EditableInput />
  //           <EditablePreview />
  //         </EditableArea>
  //       </Editable>
  //     </h2>
  //     <If true={expenses?.length > 0}>
  //       <Table rows={rows()} footer={footer()}>
  //         <TableHeader
  //           onClick={() =>
  //             dispatch(
  //               sortExpensesByName(
  //                 sortOrder === SortOrder.Descending
  //                   ? SortOrder.Ascending
  //                   : SortOrder.Descending
  //               )
  //             )
  //           }
  //           style={{ cursor: 'pointer' }}
  //         >
  //           Name
  //         </TableHeader>
  //         <TableHeader
  //           width={'20%'}
  //           onClick={() =>
  //             dispatch(
  //               sortExpensesByValue(
  //                 sortOrder === SortOrder.Descending
  //                   ? SortOrder.Ascending
  //                   : SortOrder.Descending
  //               )
  //             )
  //           }
  //           style={{ cursor: 'pointer' }}
  //         >
  //           Amount
  //         </TableHeader>
  //         <TableHeader>Description</TableHeader>
  //         <TableHeader width={'5%'}></TableHeader>
  //       </Table>
  //     </If>
  //   </div>
  // );
};
