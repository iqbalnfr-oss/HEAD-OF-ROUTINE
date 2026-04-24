/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BarChart3, 
  CheckSquare, 
  PanelLeft, 
  Search, 
  Bell, 
  Settings,
  Menu,
  X,
  Compass,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Dashboard from './components/Dashboard';
import Checklist from './components/Checklist';
import Performance from './components/Performance';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'checklist' | 'performance'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { id: 'dashboard', label: 'Command Dashboard', icon: BarChart3 },
    { id: 'checklist', label: 'Leader Rituals', icon: CheckSquare },
    { id: 'performance', label: 'Performance Analytics', icon: Compass },
  ];

  return (
    <div className="min-h-screen flex bg-brand-bg text-brand-primary overflow-hidden h-screen">
      {/* SIDEBAR MOBILE OVERLAY */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="fixed top-4 left-4 z-50 p-2 bg-white shadow-xl rounded-full lg:hidden border border-gray-100"
          >
            <Menu className="w-5 h-5 text-brand-primary" />
          </button>
        )}
      </AnimatePresence>

      {/* MAIN SIDEBAR */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-72 bg-brand-primary text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 shrink-0",
        !isSidebarOpen && "-translate-x-full lg:hidden"
      )}>
        <div className="flex flex-col h-full p-8">
          {/* LOGO */}
          <div className="mb-12">
            <div className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold mb-2">DIARSITEKI</div>
            <h1 className="text-xl font-bold leading-tight tracking-tight">
              Head of Design<br />
              <span className="text-brand-accent">& Planning</span>
            </h1>
          </div>

          {/* NAV */}
          <nav className="flex-grow space-y-10">
            {/* MAIN NAVIGATION */}
            <div>
              <div className="text-[10px] uppercase text-gray-500 mb-4 tracking-[0.2em] font-bold">Main Console</div>
              <div className="space-y-2">
                {navItems.slice(0, 3).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-widest transition-all text-left rounded-md",
                      activeTab === item.id 
                        ? "bg-white/10 text-brand-accent border-l-2 border-brand-accent pl-6" 
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* QUICK MONITORING */}
            <div>
              <div className="text-[10px] uppercase text-gray-500 mb-4 tracking-[0.2em] font-bold">Quick Insight</div>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-1">
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Target Closing</div>
                <div className="text-2xl font-bold text-emerald-400 tracking-tighter">Rp 245jt</div>
                <div className="text-[9px] text-gray-500 font-bold uppercase">Minggu ini</div>
              </div>
            </div>
          </nav>

          {/* SIDEBAR FOOTER */}
          <div className="mt-auto space-y-4 pt-8 border-t border-white/5">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent font-bold text-xs border border-brand-accent/30">H</div>
               <div className="leading-tight">
                 <p className="text-xs font-bold text-white">Iqbal N.</p>
                 <p className="text-[10px] text-gray-500 font-medium">Head of Design</p>
               </div>
             </div>
             <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
               <X className="w-4 h-4" /> Close Sidebar
             </button>
          </div>
        </div>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-grow min-h-screen overflow-y-auto flex flex-col relative">
        {/* TOP BAR */}
        <header className="sticky top-0 z-30 bg-brand-bg/80 backdrop-blur-md px-8 py-6 flex items-center justify-between">
          <div>
             <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400">
               {activeTab === 'dashboard' ? 'Executive Dashboard' : activeTab === 'checklist' ? 'Operational Routines' : 'Performance Analytics'}
             </h2>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-brand-primary relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-brand-primary">
                <Search className="w-4 h-4" />
              </button>
            </div>
            <div className="h-6 w-[1px] bg-gray-200"></div>
            <div className="flex items-center gap-3">
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{new Date().toLocaleDateString('id-ID', { weekday: 'long' })}</span>
               <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="p-8 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {activeTab === 'dashboard' && <Dashboard />}
              {activeTab === 'checklist' && <Checklist />}
              {activeTab === 'performance' && <Performance />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

