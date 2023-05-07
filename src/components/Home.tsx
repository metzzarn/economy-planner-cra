import { IncomeForm } from 'components/IncomeForm';
import React from 'react';
import { formatPrice } from 'utils/numberUtils';
import { ExpensesTable } from 'components/ExpensesTable';
import { SavingsTable } from 'components/SavingsTable';
import { useAppSelector } from 'hooks';
import { Summary } from 'components/Summary';
import { selectIncome } from 'redux/incomeSlice';
import { IncomeList } from 'components/IncomeList';
import { selectCurrency, selectDecimalPlaces } from 'redux/settingsSlice';
import { Box, Tab, Tabs } from '@mui/material';
import { TabPanel } from 'common/TabPanel';

export const Home = () => {
  const income = useAppSelector(selectIncome);
  const decimalPlaces = useAppSelector(selectDecimalPlaces);
  const currency = useAppSelector(selectCurrency);

  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <h2>Home</h2>
      <div style={{ marginBottom: '10px' }}>
        {`Your salary is ${formatPrice(
          income.toString(),
          decimalPlaces,
          currency
        )}`}
      </div>
      <Box>
        <Tabs value={tabValue} onChange={handleChange}>
          <Tab label="Income" />
          <Tab label="Expenses" />
          <Tab label="Savings" />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <IncomeForm />
          <IncomeList />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <ExpensesTable />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <SavingsTable />
        </TabPanel>
      </Box>
      <Summary />
    </div>
  );
};
