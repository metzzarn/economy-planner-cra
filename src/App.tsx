import React from 'react';
import './App.css';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { Menu } from 'components/NavigationMeny';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/economy-planner-cra'} element={<Layout />}>
          {/*<Route index element={<Home />} />*/}
          {/*<Route path="dashboard" element={<Dashboard />} />*/}
          {/*<Route path="settings" element={<Settings />} />*/}

          {/* Using path="*"" means "match anything", so this route
                    acts like a catch-all for URLs that we don't have explicit
                    routes for. */}
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

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

const NoMatch = () => {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
};
