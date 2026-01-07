
import React from 'react';
import { Transaction, TransactionType } from '../types';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const formatKz = (val: number) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(val).replace('AOA', 'Kz');
  };

  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-slate-900">Histórico</h2>
        <p className="text-slate-500">Todos os teus movimentos financeiros.</p>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {sortedTransactions.length === 0 ? (
          <div className="p-10 text-center text-slate-400 font-medium">Nenhum movimento registado ainda.</div>
        ) : (
          <div className="divide-y divide-slate-50">
            {sortedTransactions.map((t) => (
              <div key={t.id} className="p-4 md:p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${
                    t.type === TransactionType.INCOME ? 'bg-green-100 text-green-600' : 
                    t.type === TransactionType.EXPENSE ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {t.type === TransactionType.INCOME ? '↑' : t.type === TransactionType.EXPENSE ? '↓' : '⚓'}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{t.description}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs px-2 py-0.5 bg-slate-100 rounded text-slate-500 uppercase font-semibold">{t.category}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{new Date(t.date).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className={`text-lg font-black ${
                  t.type === TransactionType.INCOME ? 'text-green-600' : 'text-slate-800'
                }`}>
                  {t.type === TransactionType.EXPENSE || t.type === TransactionType.SAVING ? '- ' : '+ '}
                  {formatKz(t.amount)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
