import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { SavingsGoals } from './components/SavingsGoals';
import { TransactionForm } from './components/TransactionForm';
import { BankAccounts } from './components/BankAccounts';
import { GoalForm } from './components/GoalForm';
import { TransactionHistory } from './components/TransactionHistory';
import { Investments } from './components/Investments';
import { Transaction, TransactionType, UserProfile, SavingGoal, BankAccount } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'goals' | 'add' | 'accounts' | 'addGoal' | 'history' | 'investments'>('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [goals, setGoals] = useState<SavingGoal[]>([]);
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
      setTransactions([
        { id: '1', description: 'Venda de produtos', amount: 80000, type: TransactionType.INCOME, category: 'Vendas', date: new Date().toISOString() },
        { id: '2', description: 'Almoço no Candando', amount: 5500, type: TransactionType.EXPENSE, category: 'Alimentação', date: new Date().toISOString() },
      ]);
    }

    const savedA = localStorage.getItem('kwanza_accounts');
    if (savedA) setBankAccounts(JSON.parse(savedA));
    else {
      setBankAccounts([
        { id: 'bai', bankName: 'BAI', balance: 125000, updatedAt: new Date().toISOString() },
        { id: 'bci', bankName: 'BCI', balance: 45000, updatedAt: new Date().toISOString() },
        { id: 'bic', bankName: 'BIC', balance: 12000, updatedAt: new Date().toISOString() },
      ]);
    }

    const savedG = localStorage.getItem('kwanza_goals');
    if (savedG) setGoals(JSON.parse(savedG));
    else {
      setGoals([
        { id: '1', title: 'Comprar Computador', targetAmount: 250000, currentAmount: 45000, deadline: '2025-12-31' }
      ]);
    }
  }, []);

  // Persistence
  useEffect(() => { localStorage.setItem('kwanza_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('kwanza_accounts', JSON.stringify(bankAccounts)); }, [bankAccounts]);
  useEffect(() => { localStorage.setItem('kwanza_goals', JSON.stringify(goals)); }, [goals]);

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newT = { ...t, id: Math.random().toString(36).substr(2, 9) };
    setTransactions([newT, ...transactions]);
    setView('dashboard');
  };

  const addGoal = (g: Omit<SavingGoal, 'id'>) => {
    const newG = { ...g, id: Math.random().toString(36).substr(2, 9) };
    setGoals([...goals, newG]);
    setView('goals');
  };

  const updateGoalProgress = (id: string, amount: number) => {
    setGoals(prev => prev.map(g => 
      g.id === id ? { ...g, currentAmount: g.currentAmount + amount } : g
    ));
    addTransaction({
      description: `Reforço para: ${goals.find(g => g.id === id)?.title}`,
      amount: amount,
      type: TransactionType.SAVING,
      category: 'Meta Específica',
      date: new Date().toISOString()
    });
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
      if (t.type === TransactionType.SAVING) return acc - t.amount;
      return acc;
    }, 0);
  };

  return (
    <Layout currentView={view} setView={setView} profile={profile}>
      <div className="animate-fadeIn">
        {view === 'dashboard' && (
          <Dashboard 
            transactions={transactions} 
            balance={calculateBalance()} 
            bankAccounts={bankAccounts}
            profile={profile}
            onSeeAll={() => setView('history')}
          />
        )}
        {view === 'goals' && (
          <SavingsGoals 
            goals={goals} 
            onAddClick={() => setView('addGoal')} 
            onReinforce={updateGoalProgress}
          />
        )}
        {view === 'accounts' && (
          <BankAccounts accounts={bankAccounts} onUpdate={updateBankAccount} />
        )}
        {view === 'investments' && (
          <Investments />
        )}
        {view === 'add' && (
          <TransactionForm onSubmit={addTransaction} onCancel={() => setView('dashboard')} />
        )}
        {view === 'addGoal' && (
          <GoalForm onSubmit={addGoal} onCancel={() => setView('goals')} />
        )}
        {view === 'history' && (
          <TransactionHistory transactions={transactions} />
        )}
      </div>
    </Layout>
  );
};

export default App;