import { SortOrder } from 'common/SortOrder';

export interface FinancialEntry {
  index?: number;
  name?: string;
  value?: number;
  description?: string;
}

export interface SavingsState {
  title: string;
  description: string;
  savings: FinancialEntry[];
  startAmount: number;
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
  description: string;
  expenses: FinancialEntry[];
}

export interface SettingsState {
  decimalPlaces: number;
  language: Language;
  saveTab: boolean;
  savedTab: {
    home: number;
  };
}

export interface Language {
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
