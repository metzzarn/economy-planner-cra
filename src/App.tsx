import React, { useState } from "react";
import "./App.css";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSalary, set } from "./salarySlice";
import { useAppDispatch } from "./hooks";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Using path="*"" means "match anything", so this route
                    acts like a catch-all for URLs that we don't have explicit
                    routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <Menu />
      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

const Menu = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/nothing-here">Nothing Here</Link>
      </li>
    </ul>
  </nav>
);

const Home = () => {
  const salary = useSelector(selectSalary);
  const dispatch = useAppDispatch();
  const [salaryIncrease, setSalaryIncrease] = useState<number>(0);

  const increaseSalary = () => {
    dispatch(set(salary + salaryIncrease));
  };

  return (
    <div>
      <h2>Home</h2>
      {`Your salary is ${salary} kr`}
      <div>
        <input
          type={"number"}
          id={"salary"}
          value={salaryIncrease}
          onChange={(e) => setSalaryIncrease(+e.target.value)}
        />
      </div>
      <div onClick={() => increaseSalary()}>Increase salary by number</div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
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
