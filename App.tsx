
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { SavingsGoals } from './components/SavingsGoals';
import { TransactionForm } from './components/TransactionForm';
import { BankAccounts } from './components/BankAccounts';
import { Transaction, TransactionType, UserProfile, SavingGoal, BankAccount } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'goals' | 'add' | 'accounts'>('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [goals, setGoals] = useState<SavingGoal[]>([
    { id: '1', title: 'Comprar Computador', targetAmount: 250000, currentAmount: 45000, deadline: '2024-12-31' },
    { id: '2', title: 'Fundo de Emergência', targetAmount: 100000, currentAmount: 20000, deadline: '2024-06-30' }
  ]);
  const [profile] = useState<UserProfile>({
    name: 'Mário Silva',
    role: 'Empreendedor',
    monthlyGoal: 50000
  });

  // Load from local storage on mount
  useEffect(() => {
    const savedT = localStorage.getItem('kwanza_transactions');
    if (savedT) setTransactions(JSON.parse(savedT));
    else {
      const mock: Transaction[] = [
        { id: '1', description: 'Venda de produtos', amount: 80000, type: TransactionType.INCOME, category: 'Vendas', date: new Date().toISOString() },
        { id: '2', description: 'Almoço', amount: 5500, type: TransactionType.EXPENSE, category: 'Alimentação', date: new Date().toISOString() },
        { id: '3', description: 'Transporte Girabairro', amount: 1500, type: TransactionType.EXPENSE, category: 'Transporte', date: new Date().toISOString() },
      ];
      setTransactions(mock);
    }

    const savedA = localStorage.getItem('kwanza_accounts');
    if (savedA) setBankAccounts(JSON.parse(savedA));
    else {
      setBankAccounts([
        { id: 'bai', bankName: 'BAI', balance: 0, updatedAt: new Date().toISOString() },
        { id: 'bci', bankName: 'BCI', balance: 0, updatedAt: new Date().toISOString() },
        { id: 'bic', bankName: 'BIC', balance: 0, updatedAt: new Date().toISOString() },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kwanza_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('kwanza_accounts', JSON.stringify(bankAccounts));
  }, [bankAccounts]);

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newT = { ...t, id: Math.random().toString(36).substr(2, 9) };
    setTransactions([newT, ...transactions]);
    setView('dashboard');
  };

  const updateBankAccount = (id: string, balance: number) => {
    setBankAccounts(prev => prev.map(acc => 
      acc.id === id ? { ...acc, balance, updatedAt: new Date().toISOString() } : acc
    ));
  };

  const calculateBalance = () => {
    return transactions.reduce((acc, t) => {
      if (t.type === TransactionType.INCOME) return acc + t.amount;
      if (t.type === TransactionType.EXPENSE) return acc - t.amount;
      return acc;
    }, 0);
  };

  const totalBankBalance = bankAccounts.reduce((acc, bank) => acc + bank.balance, 0);

  return (
    <Layout currentView={view} setView={setView} profile={profile}>
      {view === 'dashboard' && (
        <Dashboard 
          transactions={transactions} 
          balance={calculateBalance()} 
          bankAccounts={bankAccounts}
          profile={profile} 
        />
      )}
      {view === 'goals' && <SavingsGoals goals={goals} />}
      {view === 'accounts' && <BankAccounts accounts={bankAccounts} onUpdate={updateBankAccount} />}
      {view === 'add' && <TransactionForm onSubmit={addTransaction} onCancel={() => setView('dashboard')} />}
    </Layout>
  );
};

export default App;
