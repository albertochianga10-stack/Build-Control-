
import React from 'react';
import { SavingGoal } from '../types';

interface SavingsGoalsProps {
  goals: SavingGoal[];
}

export const SavingsGoals: React.FC<SavingsGoalsProps> = ({ goals }) => {
  const formatKz = (val: number) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(val).replace('AOA', 'Kz');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Minhas Metas</h2>
          <p className="text-slate-500">Planos para o futuro.</p>
        </div>
        <button className="bg-yellow-500 text-slate-900 p-3 rounded-full shadow-lg hover:rotate-90 transition-transform">
          <span className="text-xl font-bold">+</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          return (
            <div key={goal.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-800">{goal.title}</h3>
                <span className="text-xs font-bold text-slate-400 uppercase">Faltam {Math.ceil((new Date(goal.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} dias</span>
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
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-right text-xs font-bold text-yellow-600 mt-2">{progress.toFixed(1)}% Completo</p>

              <div className="mt-6 flex space-x-2">
                <button className="flex-1 py-2 bg-slate-50 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-100">
                  Reforçar
                </button>
                <button className="flex-1 py-2 bg-slate-50 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-100">
                  Editar
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-xl shadow-blue-100 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold mb-1">Projeção de Longo Prazo</h3>
          <p className="text-blue-100 text-sm max-w-sm">Se poupares 20.000 Kz todos os meses num DP de 12%, terás cerca de <span className="font-bold">285.000 Kz</span> no final de um ano.</p>
        </div>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:scale-105 transition-transform">
          Simular Investimento
        </button>
      </div>
    </div>
  );
};
