
import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType, UserProfile, BankAccount } from '../types';
import { getFinancialAdvice } from '../services/geminiService';

interface DashboardProps {
  transactions: Transaction[];
  balance: number;
  bankAccounts: BankAccount[];
  profile: UserProfile;
  onSeeAll: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ transactions, balance, bankAccounts, profile, onSeeAll }) => {
  const [aiData, setAiData] = useState<{tips: string[], alert: string, projection: string} | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    const fetchAI = async () => {
      setLoadingAI(true);
      const data = await getFinancialAdvice(profile, transactions, balance);
      setAiData(data);
      setLoadingAI(false);
    };
    fetchAI();
  }, [transactions.length, profile, balance]);

  const formatKz = (val: number) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(val).replace('AOA', 'Kz');
  };

  const totalBankBalance = bankAccounts.reduce((acc, b) => acc + b.balance, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg border-b-4 border-yellow-500">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Património Líquido (Bancos)</p>
          <h2 className="text-3xl font-bold">{formatKz(totalBankBalance)}</h2>
          <div className="mt-4 flex items-center text-xs text-yellow-500">
            <span>Soma de BAI, BCI e BIC</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Fluxo Mensal (Transações)</p>
          <h2 className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-500'}`}>
            {formatKz(balance)}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Meta de Poupança</p>
          <h2 className="text-2xl font-bold text-blue-600">{formatKz(profile.monthlyGoal)}</h2>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
             <div className="bg-blue-600 h-full rounded-full" style={{ width: '40%' }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold mb-4 text-slate-800">Saldos Bancários</h3>
          <div className="space-y-4">
            {bankAccounts.map(acc => (
              <div key={acc.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                    {acc.bankName}
                  </div>
                  <span className="font-semibold text-slate-700">{acc.bankName}</span>
                </div>
                <span className="font-bold text-slate-900">{formatKz(acc.balance)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-50 p-6 rounded-2xl shadow-sm border border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-yellow-900 flex items-center">
              <span className="mr-2">💡</span> Build Bot (IA)
            </h3>
            {loadingAI && <div className="animate-spin rounded-full h-4 w-4 border-2 border-yellow-600 border-t-transparent"></div>}
          </div>
          
          {aiData ? (
            <div className="space-y-4">
              {aiData.alert && (
                <div className="bg-red-100 text-red-800 p-3 rounded-xl text-sm font-medium border border-red-200">
                  ⚠️ {aiData.alert}
                </div>
              )}
              <div className="space-y-3">
                {aiData.tips.map((tip, i) => (
                  <p key={i} className="text-sm text-yellow-900 flex items-start">
                    <span className="mr-2 mt-1 block w-1.5 h-1.5 rounded-full bg-yellow-600 flex-shrink-0"></span>
                    {tip}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-yellow-700 animate-pulse">A analisar o teu mambo... aguenta aí um pouco.</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Últimos Movimentos</h3>
          <button onClick={onSeeAll} className="text-sm text-yellow-600 font-bold hover:underline">Ver tudo</button>
        </div>
        <div className="divide-y divide-slate-50">
          {transactions.length === 0 ? (
            <p className="p-8 text-center text-slate-400">Nenhum movimento recente.</p>
          ) : (
            transactions.slice(0, 5).map((t) => (
              <div key={t.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                    t.type === TransactionType.INCOME ? 'bg-green-100 text-green-600' : 
                    t.type === TransactionType.EXPENSE ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {t.type === TransactionType.INCOME ? '+' : t.type === TransactionType.EXPENSE ? '-' : '⚓'}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{t.description}</p>
                    <p className="text-xs text-slate-400">{t.category} • {new Date(t.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className={`font-bold ${t.type === TransactionType.INCOME ? 'text-green-600' : 'text-slate-800'}`}>
                  {t.type === TransactionType.EXPENSE || t.type === TransactionType.SAVING ? '- ' : '+ '}{formatKz(t.amount)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
