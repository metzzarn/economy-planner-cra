import React, { useEffect, useState } from 'react';
import { formatAmount } from 'utils/numberUtils';
import { Expenses } from 'components/expense/Expenses';
import { Savings } from 'components/saving/Savings';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Summary } from 'components/Summary';
import { selectIncome } from 'redux/incomeSlice';
import { Incomes } from 'components/income/Incomes';
import {
  selectDecimalPlaces,
  selectLanguage,
  selectSavedTabHome,
  selectSaveTab,
  setSavedTabHome,
} from 'redux/settingsSlice';
import { Box, Tab, Tabs } from '@mui/material';
import { TabPanel } from 'components/common/TabPanel';
import { Events } from 'components/event/Events';

export const Home = () => {
  const dispatch = useAppDispatch();
  const income = useAppSelector(selectIncome);
  const decimalPlaces = useAppSelector(selectDecimalPlaces);
  const language = useAppSelector(selectLanguage);
  const savedTabHome = useAppSelector(selectSavedTabHome);
  const saveTab = useAppSelector(selectSaveTab);
  const [currentTab, setCurrentTab] = useState<number>(0);

  useEffect(() => {
    setCurrentTab(savedTabHome);
  }, [savedTabHome]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    !saveTab && dispatch(setSavedTabHome(newValue));
    setCurrentTab(newValue);
  };

  const netIncome = income ? income.value - income.tax : 0;

  return (
    <div>
      <h2>Home</h2>
      <div style={{ marginBottom: '10px' }}>
        {`Your salary is ${formatAmount(
          netIncome.toString(),
          decimalPlaces,
          language,
        )}`}
      </div>
      <Box>
        <Tabs value={currentTab} onChange={handleChange}>
          <Tab label="Income" />
          <Tab label="Expenses" />
          <Tab label="Savings" />
          <Tab label="Events" />
        </Tabs>
        <TabPanel value={currentTab} index={0}>
          <Incomes />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <Expenses />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <Savings />
        </TabPanel>
        <TabPanel value={currentTab} index={3}>
          <Events />
        </TabPanel>
      </Box>
      <Summary />
    </div>
  );
};
