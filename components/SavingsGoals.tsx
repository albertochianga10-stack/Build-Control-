
import React from 'react';
import { SavingGoal } from '../types';

interface SavingsGoalsProps {
  goals: SavingGoal[];
  onAddClick: () => void;
  onReinforce: (id: string, amount: number) => void;
}

export const SavingsGoals: React.FC<SavingsGoalsProps> = ({ goals, onAddClick, onReinforce }) => {
  const formatKz = (val: number) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(val).replace('AOA', 'Kz');
  };

  const handleReinforce = (id: string) => {
    const amountStr = prompt("Quanto queres reforçar nesta meta? (Kz)");
    if (amountStr) {
      const amount = parseFloat(amountStr);
      if (!isNaN(amount) && amount > 0) {
        onReinforce(id, amount);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Minhas Metas</h2>
          <p className="text-slate-500">Planos para o futuro.</p>
        </div>
        <button 
          onClick={onAddClick}
          className="bg-yellow-500 text-slate-900 w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        >
          <span className="text-2xl font-bold">+</span>
        </button>
      </div>

      {goals.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl border-2 border-dashed border-slate-200 text-center">
          <p className="text-slate-400 font-medium">Não tens metas criadas. Clica no botão acima para começar!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
            
            return (
              <div key={goal.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-800">{goal.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${daysLeft < 0 ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-400'}`}>
                    {daysLeft < 0 ? 'Expirado' : `Faltam ${daysLeft} dias`}
                  </span>
                </div>
                
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <p className="text-xs text-slate-400 uppercase mb-1">Acumulado</p>
                    <p className="text-xl font-bold text-slate-800">{formatKz(goal.currentAmount)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 uppercase mb-1">Objetivo</p>
                    <p className="text-lg font-semibold text-slate-500">{formatKz(goal.targetAmount)}</p>
                  </div>
                </div>

                <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden mt-4">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-right text-xs font-bold text-yellow-600 mt-2">{progress.toFixed(1)}% Completo</p>

                <div className="mt-6 flex space-x-2">
                  <button 
                    onClick={() => handleReinforce(goal.id)}
                    className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 active:scale-95 transition-all"
                  >
                    Reforçar
                  </button>
                  <button className="flex-1 py-3 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-100 active:scale-95 transition-all">
                    Editar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-xl shadow-blue-100 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold mb-1">Projeção de Longo Prazo</h3>
          <p className="text-blue-100 text-sm max-w-sm">Sabias que guardar 10.000 Kz por mês durante 1 ano rende cerca de 120.000 Kz? Começa hoje!</p>
        </div>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:scale-105 transition-transform">
          Simular Investimento
        </button>
      </div>
    </div>
  );
};
