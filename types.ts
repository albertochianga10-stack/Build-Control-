
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  SAVING = 'SAVING'
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
}

export interface SavingGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
}

export interface UserProfile {
  name: string;
  role: 'Estudante' | 'Trabalhador' | 'Empreendedor';
  monthlyGoal: number;
}

export interface BankAccount {
  id: string;
  bankName: 'BAI' | 'BCI' | 'BIC' | 'BFA' | 'Standard Bank' | 'Outro';
  balance: number;
  updatedAt: string;
}

// Added BankProduct interface to fix the import error in components/Investments.tsx
export interface BankProduct {
  id: string;
  bank: string;
  name: string;
  type: string;
  rate: string;
  minAmount: number;
  description: string;
}
