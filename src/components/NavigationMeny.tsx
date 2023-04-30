import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { Home } from 'components/Home';
import { Settings } from 'components/Settings';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const Menu = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
      <div {...other}>
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  };

  return (
    <nav>
      <Box>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Home" />
          <Tab label="Settings" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Home />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Settings />
        </TabPanel>
      </Box>
    </nav>
  );
};
