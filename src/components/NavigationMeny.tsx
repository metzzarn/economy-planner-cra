import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { Home } from 'components/Home';
import { Settings } from 'components/setting/Settings';
import { StateManagement } from 'components/setting/StateManagement';

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
          <Tab label="Save/Load" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Home />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Settings />
        </TabPanel>
        <TabPanel index={value} value={2}>
          <StateManagement />
        </TabPanel>
      </Box>
    </nav>
  );
};
