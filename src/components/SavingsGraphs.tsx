import { useAppSelector } from 'hooks';
import { selectSavings } from 'redux/savingsSlice';
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
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { useState } from 'react';

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
  const savings = useAppSelector(selectSavings);
  const language = useAppSelector(selectLanguage);

  const [timeline, setTimeline] = useState(12);

  const options = {
    responsive: true,
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

      let sum = 0;
      const accumulatedSavingsPerMonth = months.map((month, index) => {
        sum *= 1 + 8 / 100 / 12;
        sum += saving.value;
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

      <FormControl sx={{ display: 'inline-block', my: 2 }}>
        <div>
          <InputLabel id="default-home-tab-label">Timeline</InputLabel>
          <Select
            labelId="timeline-tab-label"
            id="timeline-tab"
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
        </div>
      </FormControl>

      <Line data={data} options={options} />
    </Box>
  );
};
