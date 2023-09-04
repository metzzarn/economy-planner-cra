import React from 'react';
import { Box, IconButton, Tab, Tabs, useTheme } from '@mui/material';
import { Home } from 'components/Home';
import { Settings } from 'components/setting/Settings';
import { StateManagement } from 'components/setting/StateManagement';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { ColorModeContext } from 'App';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const Menu = () => {
  const colorMode = React.useContext(ColorModeContext);
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

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
        <Box sx={{ display: 'flex' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Home" />
            <Tab label="Settings" />
            <Tab label="Save/Load" />
          </Tabs>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Box>
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
