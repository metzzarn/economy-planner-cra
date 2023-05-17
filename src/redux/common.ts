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
  currentTab: {
    home: number;
  };
}

export interface Currency {
  currency: string;
  locale: string;
}

export interface EconomyState {
  income: IncomeState;
  expenses: ExpensesState;
  savings: SavingsState;
  settings: SettingsState;
  version?: string;
}
