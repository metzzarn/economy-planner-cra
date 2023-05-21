import { SortOrder } from 'common/SortOrder';

export interface FinancialEntry {
  index?: number;
  name?: string;
  value?: number;
  description?: string;
}

export interface SavingsState {
  title: string;
  savings: FinancialEntry[];
}

export interface IncomeState {
  incomeList: IncomeEntry[];
  selectedIncome: number;
  sortOrder: SortOrder;
}

export interface IncomeEntry {
  index?: number;
  value: number;
}

export interface ExpensesState {
  title: string;
  expenses: FinancialEntry[];
}

export interface SettingsState {
  decimalPlaces: number;
  currency: Currency;
  saveTab: boolean;
  savedTab: {
    home: number;
  };
}

export interface Currency {
  currency: string;
  locale: string;
}

export interface EconomyState {
  income: IncomeState;
  expenses: UndoableState<ExpensesState>;
  savings: UndoableState<SavingsState>;
  settings: SettingsState;
  version?: string;
}

export interface UndoableState<T> {
  past: T[];
  present: T;
  future: T[];
}
