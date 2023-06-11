import { useAppDispatch, useAppSelector } from 'hooks';
import {
  selectSavings,
  selectStartAmount,
  updateStartAmount,
} from 'redux/savingsSlice';
import { Line } from 'react-chartjs-2';
import { FinancialEntry } from 'redux/common';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { selectLanguage } from 'redux/settingsSlice';
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { currencySymbol } from 'utils/numberUtils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const SavingsGraphs = () => {
  const dispatch = useAppDispatch();

  const savings = useAppSelector(selectSavings);
  const language = useAppSelector(selectLanguage);
  const startAmount = useAppSelector(selectStartAmount);

  const [timeline, setTimeline] = useState(12);
  const [interestRate, setInterestRate] = useState(8);

  const options = {
    locale: language.locale,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const date = new Date();
  const months: string[] = [];
  for (let i = 0; i < timeline; i++) {
    const firstDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    firstDateOfMonth.setMonth(firstDateOfMonth.getMonth() + i);
    const month = firstDateOfMonth.toLocaleString(language.locale, {
      month: 'long',
    });
    months.push(month.charAt(0).toUpperCase() + month.slice(1));
  }

  const data = {
    labels: months,
    datasets: savings.map((saving: FinancialEntry, index: number) => {
      const random = Math.floor(Math.random() * (20 - -20 + 1)) + -20;
      const number = Math.floor((360 / savings.length) * (index + 1) + random);
      const borderColor = 'hsl(' + number + ', 80%, 60%)';
      const backgroundColor = 'hsl(' + number + ', 80%, 35%)';

      const savingValue = saving.value ? saving.value : 0;
      let sum = startAmount;
      const accumulatedSavingsPerMonth = months.map(() => {
        sum *= 1 + interestRate / 100 / 12;
        sum += savingValue;
        return sum;
      });

      return {
        label: saving.name,
        data: accumulatedSavingsPerMonth,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
      };
    }),
  };

  return (
    <Box sx={{ maxWidth: '700px', my: 2 }}>
      <h3>Savings Graphs</h3>

      <Box sx={{ my: 2 }}>
        <FormControl size={'small'}>
          <TextField
            sx={{ width: 120, m: 1 }}
            label={'Start amount'}
            name={'start-amount'}
            variant={'outlined'}
            type={'number'}
            size={'small'}
            placeholder={'8'}
            defaultValue={startAmount}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position={'end'}>
                  {currencySymbol(language).symbol}
                </InputAdornment>
              ),
            }}
            onChange={(event) =>
              dispatch(updateStartAmount(Number(event.target.value)))
            }
          />
        </FormControl>
        <FormControl sx={{ width: 120, m: 1 }} size={'small'}>
          <InputLabel>Timeline</InputLabel>
          <Select
            labelId="timeline-label"
            id="timeline"
            value={timeline.toString()}
            label="Timeline"
            onChange={(event: SelectChangeEvent) =>
              setTimeline(parseInt(event.target.value))
            }
          >
            <MenuItem value={3}>3 månader</MenuItem>
            <MenuItem value={6}>6 månader</MenuItem>
            <MenuItem value={12}>1 år</MenuItem>
            <MenuItem value={2 * 12}>2 år</MenuItem>
            <MenuItem value={3 * 12}>3 år</MenuItem>
            <MenuItem value={4 * 12}>4 år</MenuItem>
            <MenuItem value={5 * 12}>5 år</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <TextField
            sx={{ width: 90, m: 1 }}
            label={'Interest'}
            name={'interest'}
            variant={'outlined'}
            type={'number'}
            size={'small'}
            placeholder={'8'}
            defaultValue={interestRate}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: <InputAdornment position={'end'}>%</InputAdornment>,
            }}
            onChange={(event) => setInterestRate(Number(event.target.value))}
          />
        </FormControl>
      </Box>

      <Box sx={{ minHeight: '400px' }}>
        <Line data={data} options={options} />
      </Box>
    </Box>
  );
};
