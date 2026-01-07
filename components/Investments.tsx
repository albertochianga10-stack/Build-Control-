
import React from 'react';
import { BankProduct } from '../types';

export const Investments: React.FC = () => {
  const products: BankProduct[] = [
    {
      id: '1',
      bank: 'BAI',
      name: 'Poupança Objectivo',
      type: 'Poupança',
      rate: '12% TANB',
      minAmount: 50000,
      description: 'Ideal para jovens que querem juntar dinheiro para um plano específico. Flexibilidade total.'
    },
    {
      id: '2',
      bank: 'BPC',
      name: 'DP Crescente',
      type: 'DP',
      rate: '15% TANB',
      minAmount: 100000,
      description: 'Depósito a prazo com taxas que aumentam ao longo do tempo. Segurança estatal.'
    },
    {
      id: '3',
      bank: 'FNB',
      name: 'Money Market',
      type: 'Investimento',
      rate: '10.5% TANB',
      minAmount: 25000,
      description: 'Liquidez diária. Podes tirar o dinheiro a qualquer momento se houver "barulho".'
    },
    {
      id: '4',
      bank: 'Standard Bank',
      name: 'Poupança Blue',
      type: 'Poupança',
      rate: '11% TANB',
      minAmount: 10000,
      description: 'Baixa barreira de entrada. Perfeito para estudantes que estão a começar agora.'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h2 className="text-3xl font-bold text-slate-900">Oportunidades Locais</h2>
        <p className="text-slate-500">Faz o teu Kwanza trabalhar por ti nos bancos de Angola.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                  p.bank === 'BAI' ? 'bg-orange-100 text-orange-700' :
                  p.bank === 'BPC' ? 'bg-red-100 text-red-700' :
                  p.bank === 'FNB' ? 'bg-blue-100 text-blue-700' : 'bg-blue-900 text-white'
                }`}>
                  {p.bank}
                </span>
                <h3 className="text-xl font-bold text-slate-800 mt-2">{p.name}</h3>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">{p.rate}</p>
                <p className="text-xs text-slate-400">{p.type}</p>
              </div>
            </div>
            
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              {p.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="text-xs text-slate-400">
                Min: <span className="font-semibold text-slate-700">{p.minAmount.toLocaleString()} Kz</span>
              </div>
              <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold group-hover:bg-yellow-500 group-hover:text-slate-900 transition-colors">
                Saber Mais
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2">Dica do Especialista</h3>
          <p className="text-slate-300 text-sm max-w-md">
            Antes de investir em DPs de longa duração, garante que tens o teu Fundo de Maneio no Multicaixa Express. Em Angola, a inflação é real, por isso procura sempre taxas acima de 12%.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-4 text-6xl opacity-20">💰</div>
      </div>
    </div>
  );
};
