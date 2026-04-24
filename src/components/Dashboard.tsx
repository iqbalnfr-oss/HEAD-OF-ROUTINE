import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Target,
  ChevronRight,
  Plus,
  MoreVertical,
  Filter,
  Calendar,
  Clock,
  MessageSquare,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie
} from 'recharts';
import { cn } from '../lib/utils';
import { Project, TeamMember, Risk, Task, ProjectStatus } from '../types';
import { INITIAL_PROJECTS, INITIAL_TEAM, INITIAL_RISKS, INITIAL_TASKS } from '../constants';

const StatusBadge = ({ status }: { status: ProjectStatus }) => {
  const styles = {
    Aman: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Waspada: "bg-amber-50 text-amber-700 border-amber-100",
    Bahaya: "bg-red-50 text-red-700 border-red-100"
  };
  return (
    <span className={cn("status-badge border", styles[status])}>
      {status}
    </span>
  );
};

export default function Dashboard() {
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [team] = useState<TeamMember[]>(INITIAL_TEAM);
  const [risks] = useState<Risk[]>(INITIAL_RISKS);

  const stats = [
    { label: 'Total Proyek Aktif', value: 12, target: 15, status: 'Aman' as const, note: '+2 from last week' },
    { label: 'Proyek Closing', value: 2, target: 3, status: 'Waspada' as const, note: 'IW, IJ House' },
    { label: 'Proyek >90%', value: 5, target: 5, status: 'Aman' as const, note: 'Ready for closing' },
    { label: 'Proyek Stagnan', value: 3, target: 0, status: 'Bahaya' as const, note: '> 3 hari tanpa update' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-brand-primary">Dashboard Kontrol Mingguan</h1>
        <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> ON TRACK</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span> WARNING</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span> CRITICAL</span>
        </div>
      </header>

      {/* A. OVERVIEW MINGGUAN */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="architectural-card p-5 border-gray-200"
          >
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-baseline justify-between mb-1">
              <span className={cn("text-2xl font-bold tracking-tighter", 
                stat.status === 'Bahaya' ? 'text-red-600' : 'text-brand-primary'
              )}>{stat.value}</span>
            </div>
            <p className={cn("text-[9px] font-bold uppercase tracking-wider", 
              stat.status === 'Bahaya' ? 'text-red-400' : stat.status === 'Waspada' ? 'text-amber-500' : 'text-emerald-500'
            )}>{stat.note}</p>
          </motion.div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* B. STATUS PROYEK */}
        <section className="lg:col-span-8">
          <div className="architectural-card h-full">
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center text-sm font-bold tracking-tight uppercase">
              <span>Status Proyek Utama</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/30 border-b border-gray-100">
                  <tr className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                    <th className="px-5 py-3 text-left">Proyek</th>
                    <th className="px-5 py-3 text-left">Progres</th>
                    <th className="px-5 py-3 text-center">Revisi</th>
                    <th className="px-5 py-3 text-left">PIC</th>
                    <th className="px-5 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {projects.map((p) => (
                    <tr key={p.id} className={cn("hover:bg-gray-50/30 transition-colors font-medium text-xs", p.status === 'Bahaya' && "bg-red-50/30")}>
                      <td className="px-5 py-4">
                        <span className={cn("font-bold", p.status === 'Bahaya' ? "text-red-700" : "text-gray-900")}>{p.name}</span>
                      </td>
                      <td className="px-5 py-4">
                         <div className="flex items-center gap-2">
                           <span className={cn("font-mono font-bold", p.status === 'Bahaya' ? "text-red-500" : "text-gray-600")}>{p.progress}%</span>
                           {p.deviation < 0 && <span className="text-[9px] text-red-500">({p.deviation}%)</span>}
                         </div>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className={cn("font-bold", p.revisions > 2 ? "text-red-600" : "text-gray-900")}>{p.revisions}x</span>
                      </td>
                      <td className="px-5 py-4 text-gray-500 font-bold">{p.pic}</td>
                      <td className="px-5 py-4 text-center">
                        <span className={cn("status-badge", 
                          p.status === 'Aman' ? "bg-emerald-100 text-emerald-800 font-bold" : 
                          p.status === 'Waspada' ? "bg-amber-100 text-amber-800 font-bold" : 
                          "bg-red-100 text-red-800 font-bold"
                        )}>
                          {p.status === 'Aman' ? 'READY ST' : p.status === 'Waspada' ? 'PUSH QC' : 'STAGNANT'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="text-gray-400 italic">
                    <td colSpan={5} className="px-5 py-3 text-[10px] text-center bg-gray-50/20 underline cursor-pointer hover:text-brand-accent tracking-widest uppercase font-bold">+ 13 Proyek lainnya</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* C & D. RISK & TEAM */}
        <aside className="lg:col-span-4 space-y-6">
          <section className="architectural-card p-5">
            <h2 className="text-[10px] font-bold tracking-[0.2em] mb-5 text-gray-500 uppercase">Risk Monitoring</h2>
            <div className="space-y-4">
              {risks.map(risk => (
                <div key={risk.id} className="flex justify-between items-center pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  <span className="text-xs font-medium text-gray-700">{risk.type}</span>
                  <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded", 
                    risk.level === 'Bahaya' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                  )}>
                    {risk.impactedProjects} Proyek
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="architectural-card p-5">
            <h2 className="text-[10px] font-bold tracking-[0.2em] mb-5 text-gray-500 uppercase">Top 3 Fokus Minggu Ini</h2>
            <div className="space-y-4">
              <div className="p-3 border-l-4 border-emerald-500 bg-gray-50">
                <p className="text-[11px] font-bold">1. Closing IW & IJ House</p>
                <p className="text-[9px] text-gray-500 uppercase tracking-tighter">DED & RAB Finalization</p>
              </div>
              <div className="p-3 border-l-4 border-red-500 bg-gray-50">
                <p className="text-[11px] font-bold">2. Intervensi SF House</p>
                <p className="text-[9px] text-gray-500 uppercase tracking-tighter">Design Lock session today</p>
              </div>
              <div className="p-3 border-l-4 border-blue-500 bg-gray-50">
                <p className="text-[11px] font-bold">3. Mapping Beban Kerja</p>
                <p className="text-[9px] text-gray-500 uppercase tracking-tighter">Redistribusi task Drafter</p>
              </div>
            </div>
          </section>
        </aside>
      </div>

      <footer className="bg-brand-primary p-4 rounded-lg text-white flex flex-col md:flex-row justify-between items-center text-[10px] gap-4">
        <div className="flex gap-4">
          <span className="font-bold opacity-60 uppercase tracking-widest">EVALUASI SABTU:</span>
          <span className="italic text-gray-400 font-normal">"Sistem revisi perlu di-lock setelah 3D ACC..."</span>
        </div>
        <div className="font-bold flex gap-4 uppercase tracking-[0.15em] text-emerald-400">
          <span>PRIORITY: TARGET ST</span>
          <span className="opacity-30">/</span>
          <span>NO STAGNANT</span>
          <span className="opacity-30">/</span>
          <span>NO REVISI LIAR</span>
        </div>
      </footer>
    </div>
  );
}
