export interface SavingsHistory {
  date: string;
  name: string;
  amount: number;
  total: number;
}

export interface SavingsDeposit {
  depositAmount: number;
  depositDate: string;
  depositTime: string;
  accountPointAfter: number;
  childName: string;
  profileImage: string | null;
}

export interface SavingsAccount {
  goalAmount: number;
  currentAccountPoint: number;
  currentPercent: number;
  createdDate: string;
  endDate: string;
  status: "ACTIVE" | "COMPLETED" | "EXPIRED";
  totalDepositCount: number;
  deposits: SavingsDeposit[];
}

export interface SavingsState {
  accounts: SavingsAccount[];
  isLoading: boolean;
  error: string | null;
}
 