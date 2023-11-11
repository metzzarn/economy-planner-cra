import { useAppDispatch, useAppSelector } from 'hooks';
import {
  selectInterestRate,
  selectSavings,
  updateInterestRate,
} from 'redux/savingsSlice';
import { Line } from 'react-chartjs-2';
import { SavingEntry } from 'redux/common';
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
import { selectDecimalPlaces, selectLanguage } from 'redux/settingsSlice';
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
import { formatAmount } from 'utils/numberUtils';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const SavingsGraphs = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const savings = useAppSelector(selectSavings);
  const language = useAppSelector(selectLanguage);
  const decimalPlaces = useAppSelector(selectDecimalPlaces);
  const interestRate = useAppSelector(selectInterestRate);

  const [timeline, setTimeline] = useState(12);

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
  for (let i = 0; i < timeline + 1; i++) {
    const firstDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    firstDateOfMonth.setMonth(firstDateOfMonth.getMonth() + i);
    const month = firstDateOfMonth.toLocaleString(language.locale, {
      month: 'long',
    });
    months.push(month.charAt(0).toUpperCase() + month.slice(1));
  }

  const dataset = savings.map((saving: SavingEntry, index: number) => {
    const random = Math.floor(Math.random() * (20 - -20 + 1)) + -20;
    const number = Math.floor((360 / savings.length) * (index + 1) + random);
    const borderColor = 'hsl(' + number + ', 80%, 60%)';
    const backgroundColor = 'hsl(' + number + ', 80%, 35%)';

    const savingValue = saving.value ? saving.value : 0;
    const savedMonths = dayjs().diff(
      dayjs(saving.totalSavingsAmountDate),
      'month',
    );
    let sum = saving.totalSavingsAmount
      ? saving.totalSavingsAmount + savedMonths * savingValue
      : 0;
    const accumulatedSavingsPerMonth = months.map((month, index) => {
      if (index > 0) {
        sum *= 1 + interestRate / 100 / 12;
        sum += savingValue;
      }
      return sum;
    });

    return {
      label: saving.name,
      data: accumulatedSavingsPerMonth,
      borderColor: borderColor,
      backgroundColor: backgroundColor,
    };
  });

  const totalSavings = dataset.reduce(
    (acc: number, saving: any) => acc + saving.data[timeline - 1],
    0,
  );

  const formattedTotalSavings =
    totalSavings &&
    t('Total savings during period', {
      amount: formatAmount(totalSavings.toString(), decimalPlaces, language),
    });

  const data = {
    labels: months,
    datasets: dataset,
  };

  return (
    <Box sx={{ maxWidth: '700px', my: 2 }}>
      <h3>{t('Savings Graphs')}</h3>

      <Box sx={{ my: 2 }}>
        <FormControl sx={{ width: 120, m: 1 }} size={'small'}>
          <InputLabel>{t('Timeline')}</InputLabel>
          <Select
            labelId="timeline-label"
            id="timeline"
            value={timeline.toString()}
            label={t('Timeline')}
            onChange={(event: SelectChangeEvent) =>
              setTimeline(parseInt(event.target.value))
            }
          >
            <MenuItem value={3}>3 {t('months')}</MenuItem>
            <MenuItem value={6}>6 {t('months')}</MenuItem>
            <MenuItem value={12}>1 {t('years')}</MenuItem>
            <MenuItem value={2 * 12}>2 {t('years')}</MenuItem>
            <MenuItem value={3 * 12}>3 {t('years')}</MenuItem>
            <MenuItem value={4 * 12}>4 {t('years')}</MenuItem>
            <MenuItem value={5 * 12}>5 {t('years')}</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <TextField
            sx={{ width: 90, m: 1 }}
            label={t('Interest')}
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
            onChange={(event) =>
              dispatch(updateInterestRate(Number(event.target.value)))
            }
          />
        </FormControl>
      </Box>
      {formattedTotalSavings}

      <Box sx={{ my: 2, minHeight: '400px' }}>
        <Line data={data} options={options} />
      </Box>
    </Box>
  );
};
