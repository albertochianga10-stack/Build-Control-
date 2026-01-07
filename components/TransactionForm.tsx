
import React, { useState } from 'react';
import { TransactionType } from '../types';

interface TransactionFormProps {
  onSubmit: (t: any) => void;
  onCancel: () => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, onCancel }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [category, setCategory] = useState('Alimentação');

  const categories = {
    [TransactionType.INCOME]: ['Salário', 'Vendas', 'Freela', 'Mesada', 'Outros'],
    [TransactionType.EXPENSE]: ['Alimentação', 'Transporte', 'Net/Saldo', 'Lazer', 'Renda', 'Outros'],
    [TransactionType.SAVING]: ['Investimento', 'Fundo de Emergência', 'Meta Específica'],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;
    
    onSubmit({
      description,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString()
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-slate-100">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Lançar Movimento</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Transação</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: TransactionType.INCOME, label: 'Ganho', color: 'bg-green-100 text-green-700' },
              { id: TransactionType.EXPENSE, label: 'Gasto', color: 'bg-red-100 text-red-700' },
              { id: TransactionType.SAVING, label: 'Poupe', color: 'bg-blue-100 text-blue-700' }
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setType(t.id);
                  setCategory(categories[t.id][0]);
                }}
                className={`py-3 rounded-xl text-sm font-bold transition-all border-2 ${
                  type === t.id ? `border-slate-900 ${t.color}` : 'border-transparent bg-slate-50 text-slate-400'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">O que foi? (Descrição)</label>
          <input
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Almoço no Candando"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Valor (Kz)</label>
            <input
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 font-bold text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Categoria</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
            >
              {categories[type].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-6 flex space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};
