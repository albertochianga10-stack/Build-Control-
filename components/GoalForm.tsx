
import React, { useState } from 'react';

interface GoalFormProps {
  onSubmit: (g: any) => void;
  onCancel: () => void;
}

export const GoalForm: React.FC<GoalFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !targetAmount || !deadline) return;
    
    onSubmit({
      title,
      targetAmount: parseFloat(targetAmount),
      currentAmount: 0,
      deadline
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Nova Meta</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">O que queres alcançar?</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Reserva de Emergência"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Quanto precisas? (Kz)</label>
          <input
            type="number"
            required
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="0,00"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black font-bold"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Até quando? (Data Limite)</label>
          <input
            type="date"
            required
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
          />
        </div>

        <div className="pt-6 flex space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-colors"
          >
            Voltar
          </button>
          <button
            type="submit"
            className="flex-1 py-4 bg-yellow-500 text-slate-900 font-bold rounded-xl shadow-lg shadow-yellow-100 hover:bg-yellow-400 transition-all active:scale-95"
          >
            Criar Meta
          </button>
        </div>
      </form>
    </div>
  );
};
