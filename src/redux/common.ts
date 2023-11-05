import { EventStatus } from 'components/event/EventStatus';

export interface SavingEntry {
  index?: number;
  name?: string;
  value?: number;
  description?: string;
}
export interface ExpenseEntry {
  index?: number;
  name?: string;
  value?: number;
  description?: string;
  priority?: string;
}

export interface SavingsState {
  title: string;
  description: string;
  savings: SavingEntry[];
  calculations: {
    startAmount: number;
    interestRate: number;
  };
}

export interface IncomeState {
  incomeList: IncomeEntry[];
  selectedIncome: number;
}

export interface IncomeEntry {
  index?: number;
  value: number;
  tax?: number;
}

export interface ExpensesState {
  title: string;
  description: string;
  expenses: ExpenseEntry[];
}

export interface EventState {
  title: string;
  events: EventEntry[];
}

export interface EventEntry {
  id?: string;
  title?: string;
  description?: string;
  status?: EventStatus;
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
  language?: string;
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
