
import React, { useState } from 'react';
import { BankAccount } from '../types';

interface BankAccountsProps {
  accounts: BankAccount[];
  onUpdate: (id: string, balance: number) => void;
}

export const BankAccounts: React.FC<BankAccountsProps> = ({ accounts, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newVal, setNewVal] = useState<string>('');

  const formatKz = (val: number) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(val).replace('AOA', 'Kz');
  };

  const handleSave = (id: string) => {
    onUpdate(id, parseFloat(newVal) || 0);
    setEditingId(null);
    setNewVal('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <header>
        <h2 className="text-3xl font-bold text-slate-900">Minhas Contas</h2>
        <p className="text-slate-500">Regista aqui o saldo atual do teu Multicaixa Express.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accounts.map((acc) => (
          <div key={acc.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-lg shadow-slate-200">
              {acc.bankName}
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-1">{acc.bankName}</h3>
            
            {editingId === acc.id ? (
              <div className="mt-2 w-full space-y-3">
                <input
                  type="number"
                  autoFocus
                  value={newVal}
                  onChange={(e) => setNewVal(e.target.value)}
                  className="w-full px-4 py-2 text-center rounded-xl border-2 border-yellow-500 focus:outline-none text-black font-bold"
                  placeholder="0,00"
                />
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setEditingId(null)}
                    className="flex-1 py-2 text-xs font-bold text-slate-400 hover:text-slate-600"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={() => handleSave(acc.id)}
                    className="flex-1 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-2xl font-bold text-slate-900 mt-2">{formatKz(acc.balance)}</p>
                <p className="text-[10px] text-slate-400 uppercase mt-4">Última atualização: {new Date(acc.updatedAt).toLocaleDateString()}</p>
                <button 
                  onClick={() => {
                    setEditingId(acc.id);
                    setNewVal(acc.balance.toString());
                  }}
                  className="mt-6 px-6 py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-full hover:bg-slate-100 transition-colors"
                >
                  Atualizar Saldo
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 p-8 rounded-3xl border border-yellow-200">
        <h4 className="text-lg font-bold text-yellow-900 mb-2">Porquê registar os saldos?</h4>
        <p className="text-yellow-800 text-sm leading-relaxed max-w-2xl">
          Ter os saldos dos teus bancos (BAI, BCI, BIC) atualizados ajuda o <strong>Build Control</strong> a dar-te dicas mais precisas sobre como gerir o teu dinheiro em Angola e quanto podes realmente investir nas tuas metas.
        </p>
      </div>
    </div>
  );
};
