import React, { useEffect } from 'react';
import './App.css';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { Menu } from 'components/NavigationMeny';
import {
  createTheme,
  ThemeProvider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks';
import { selectLanguage } from 'redux/settingsSlice';
import { TFunction } from 'i18next';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export default () => {
  const [mode, setMode] = React.useState<'light' | 'dark'>();
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode !== undefined ? mode : prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [mode, prefersDarkMode],
  );

  const language = useAppSelector(selectLanguage);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language.language);
  }, [language.language]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App t={t} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

interface Props {
  t: TFunction;
}

const App = (props: Props) => {
  const theme = useTheme();
  return (
    <div className={`App ${theme.palette.mode}`}>
      <Routes>
        <Route path={'/'} element={<Layout />}>
          {/*<Route index element={<Home />} />*/}
          {/*<Route path="dashboard" element={<Dashboard />} />*/}
          {/*<Route path="settings" element={<Settings />} />*/}

          {/* Using path="*"" means "match anything", so this route
                    acts like a catch-all for URLs that we don't have explicit
                    routes for. */}
        </Route>
        <Route path="*" element={<NoMatch t={props.t} />} />
      </Routes>
    </div>
  );
};

const Layout = () => {
  return (
    <div>
      <Menu />
      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
};

const NoMatch = (props: Props) => {
  return (
    <div>
      <h2>{props.t('Nothing to see here!')}</h2>
      <p>
        <Link to="/economy-planner">{props.t('Go to the home page')}</Link>
      </p>
    </div>
  );
};
