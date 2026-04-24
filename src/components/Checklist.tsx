import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Calendar, 
  AlertCircle, 
  Flame,
  Plus,
  Trash2,
  CalendarDays
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Task, AgendaItem } from '../types';
import { INITIAL_TASKS } from '../constants';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getDayFocusText(day: string): string {
  switch (day) {
    case 'Monday': return 'SETTING ARAH & PRIORITAS';
    case 'Tuesday': return 'KONTROL DESAIN & KUALITAS';
    case 'Wednesday': return 'KONTROL PROGRES & TIM';
    case 'Thursday': return 'KONTROL KLIEN & KOMUNIKASI';
    case 'Friday': return 'QUALITY CONTROL & CLOSING';
    case 'Saturday': return 'EVALUASI & PERBAIKAN SISTEM';
    default: return 'FOKUS ISTIRAHAT';
  }
}

function getDayOutputText(day: string): string {
  switch (day) {
    case 'Monday': return 'Output: Fokus minggu jelas';
    case 'Tuesday': return 'Output: Desain terkunci arah, tidak liar';
    case 'Wednesday': return 'Output: Tim tidak overload & tidak idle';
    case 'Thursday': return 'Output: Tidak ada proyek yang stuck karena klien';
    case 'Friday': return 'Output: Ada progres menuju penagihan';
    case 'Saturday': return 'Output: Sistem makin rapi, bukan masalah berulang';
    default: return '';
  }
}

export default function Checklist() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('diarsiteki_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [agendas, setAgendas] = useState<AgendaItem[]>(() => {
    const saved = localStorage.getItem('diarsiteki_agendas');
    return saved ? JSON.parse(saved) : [];
  });

  const [newAgenda, setNewAgenda] = useState('');
  
  const todayDate = new Date().toISOString().split('T')[0];
  const todayName = DAY_NAMES[new Date().getDay()];
  const [currentDay, setCurrentDay] = useState<string>(todayName);

  // Sync with current day on mount
  useEffect(() => {
    setCurrentDay(todayName);
  }, [todayName]);

  useEffect(() => {
    localStorage.setItem('diarsiteki_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('diarsiteki_agendas', JSON.stringify(agendas));
  }, [agendas]);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const toggleAgenda = (id: string) => {
    setAgendas(prev => prev.map(a => a.id === id ? { ...a, completed: !a.completed } : a));
  };

  const addAgenda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgenda.trim()) return;
    
    const item: AgendaItem = {
      id: crypto.randomUUID(),
      text: newAgenda,
      completed: false,
      date: todayDate
    };
    
    setAgendas(prev => [item, ...prev]);
    setNewAgenda('');
  };

  const deleteAgenda = (id: string) => {
    setAgendas(prev => prev.filter(a => a.id !== id));
  };

  const dayTasks = tasks.filter(t => t.category === currentDay);
  const dailyTasks = tasks.filter(t => t.category === 'Daily');
  const priorityTasks = tasks.filter(t => t.category === 'Priority');
  const itemsToday = agendas.filter(a => a.date === todayDate);

  const totalPossible = tasks.length + itemsToday.length;
  const totalCompleted = tasks.filter(t => t.completed).length + itemsToday.filter(a => a.completed).length;
  const progress = totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;

  const TaskItem = ({ task }: { task: Task }) => (
    <motion.div 
      layout
      onClick={() => toggleTask(task.id)}
      className={cn(
        "flex items-center gap-4 py-4 px-6 cursor-pointer transition-all border-l-4 group",
        task.completed 
          ? "bg-gray-50 border-emerald-400 opacity-60" 
          : "bg-white border-transparent hover:border-brand-accent hover:bg-brand-bg"
      )}
    >
      <div className="flex-shrink-0">
        {task.completed ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        ) : (
          <Circle className="w-5 h-5 text-gray-300 group-hover:text-brand-accent" />
        )}
      </div>
      <p className={cn("text-sm font-semibold flex-grow tracking-tight", task.completed ? "line-through text-gray-400" : "text-gray-800")}>
        {task.text}
      </p>
      {task.category === 'Priority' && <Flame className="w-4 h-4 text-orange-500" />}
    </motion.div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      {/* HEADER SECTION */}
      <section className="bg-white p-10 architectural-card flex flex-col items-center text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-primary text-white rounded-full">
          <Calendar className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{currentDay}, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tighter text-brand-primary uppercase">Leader Routines</h1>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.4em]">Consistency is the key to excellence</p>
        </div>
        <div className="w-full max-w-md space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <span>Overall Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-emerald-500"
            />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* PRIORITIES */}
          <section className="architectural-card">
            <div className="px-6 py-4 bg-orange-500 text-white flex items-center gap-2">
              <Flame className="w-4 h-4" />
              <h2 className="text-[10px] font-bold uppercase tracking-widest">Checklist Prioritas</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {priorityTasks.map(task => <TaskItem key={task.id} task={task} />)}
            </div>
          </section>

          {/* AGENDA TAMBAHAN */}
          <section className="architectural-card">
            <div className="px-6 py-4 bg-emerald-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                <h2 className="text-[10px] font-bold uppercase tracking-widest">Agenda Tambahan Hari Ini</h2>
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <form onSubmit={addAgenda} className="flex gap-2">
                <input 
                  type="text" 
                  value={newAgenda}
                  onChange={(e) => setNewAgenda(e.target.value)}
                  placeholder="Tambah agenda baru..."
                  className="flex-grow bg-white border border-gray-200 px-4 py-2 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
                <button type="submit" className="bg-emerald-600 text-white p-2 hover:bg-emerald-700 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </form>
            </div>
            <div className="divide-y divide-gray-100">
              <AnimatePresence>
                {itemsToday.length > 0 ? (
                  itemsToday.map(agenda => (
                    <motion.div 
                      key={agenda.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={cn(
                        "flex items-center gap-4 py-4 px-6 group transition-colors",
                        agenda.completed ? "bg-gray-50/50" : "bg-white"
                      )}
                    >
                      <div className="cursor-pointer" onClick={() => toggleAgenda(agenda.id)}>
                        {agenda.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300 hover:text-emerald-500" />
                        )}
                      </div>
                      <p className={cn("text-sm font-semibold flex-grow tracking-tight transition-all", agenda.completed ? "line-through text-gray-400" : "text-gray-800")}>
                        {agenda.text}
                      </p>
                      <button 
                        onClick={() => deleteAgenda(agenda.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-gray-300 hover:text-red-500 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest italic">
                    Belum ada agenda tambahan untuk hari ini.
                  </div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* WARNINGS */}
          <section className="p-6 bg-red-600 text-white rounded-lg shadow-lg">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Do Not Do List
            </h2>
            <ul className="space-y-3 text-xs font-medium">
              <li className="flex items-center gap-2 opacity-90"><span className="w-1.5 h-1.5 bg-white rounded-full"></span> Terlalu masuk ke teknis</li>
              <li className="flex items-center gap-2 opacity-90"><span className="w-1.5 h-1.5 bg-white rounded-full"></span> Membiarkan revisi tanpa batas</li>
              <li className="flex items-center gap-2 opacity-90"><span className="w-1.5 h-1.5 bg-white rounded-full"></span> Menunggu klien tanpa aksi</li>
              <li className="flex items-center gap-2 opacity-90"><span className="w-1.5 h-1.5 bg-white rounded-full"></span> Tidak memaksa closing</li>
            </ul>
          </section>
        </div>

        <div className="space-y-8">
          {/* DAILY ROUTINE */}
          <section className="architectural-card">
            <div className="px-6 py-4 bg-brand-primary text-white flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <h2 className="text-[10px] font-bold uppercase tracking-widest">Setiap Hari (Sen - Sab)</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {dailyTasks.map(task => <TaskItem key={task.id} task={task} />)}
            </div>
          </section>

          {/* DYNAMIC DAY TASK */}
          <section className="architectural-card">
            <div className="px-6 py-4 bg-brand-accent text-white flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <h2 className="text-[10px] font-bold uppercase tracking-widest">{currentDay} Focus</h2>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex flex-col gap-1">
               <div className="font-bold text-[10px] text-brand-accent uppercase tracking-widest">
                {getDayFocusText(currentDay)}
               </div>
               {getDayOutputText(currentDay) && (
                 <div className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">
                   👉 {getDayOutputText(currentDay)}
                 </div>
               )}
            </div>
            <div className="divide-y divide-gray-100">
              {dayTasks.length > 0 ? (
                dayTasks.map(task => <TaskItem key={task.id} task={task} />)
              ) : (
                <div className="p-12 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                  Day off / General Focus
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
