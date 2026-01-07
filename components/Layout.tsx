
import React from 'react';
import { UserProfile } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  setView: (view: any) => void;
  profile: UserProfile;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, setView, profile }) => {
  const navItems = [
    { id: 'dashboard', label: 'Início', icon: '🏠' },
    { id: 'accounts', label: 'Contas', icon: '🏦' },
    { id: 'goals', label: 'Metas', icon: '🎯' },
    { id: 'add', label: 'Lançar', icon: '➕' },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pl-64 flex flex-col transition-all duration-300">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-slate-900 text-white flex-col p-6 z-50">
        <div className="mb-10">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">
            Build Control
          </h1>
          <p className="text-xs text-slate-400">Finanças para a banda</p>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                currentView === item.id ? 'bg-slate-800 text-yellow-500' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-slate-900">
              {profile.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold">{profile.name}</p>
              <p className="text-xs text-slate-400">{profile.role}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b px-4 py-4 flex justify-between items-center sticky top-0 z-40">
        <h1 className="text-xl font-bold text-slate-900">Build Control</h1>
        <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-xs font-bold">
          {profile.name.charAt(0)}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-16 px-2 z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center justify-center space-y-1 ${
              currentView === item.id ? 'text-yellow-600' : 'text-slate-400'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
