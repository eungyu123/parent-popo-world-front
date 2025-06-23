export interface SavingsHistory {
  date: string;
  name: string;
  amount: number;
  total: number;
}

export interface SavingsAccount {
  id: number;
  current: number;
  goal: number;
  start: string;
  end: string;
  reward: number;
  history: SavingsHistory[];
}
