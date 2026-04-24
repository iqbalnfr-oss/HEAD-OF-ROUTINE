import React, { useRef } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  AreaChart, Area
} from 'recharts';
import { Download, TrendingUp, Award, Zap, FileDown } from 'lucide-react';
import { motion } from 'motion/react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PERFORMANCE_HISTORY, SKILL_SCORES } from '../constants';
import { cn } from '../lib/utils';

export default function Performance() {
  const chartRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!chartRef.current) return;
    
    const canvas = await html2canvas(chartRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#F4F5F7'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('Head_of_Design_Performance_Report.pdf');
  };

  return (
    <div className="space-y-8 pb-20" ref={chartRef}>
      <header className="flex justify-between items-end bg-white p-8 border border-gray-200 rounded-xl shadow-sm">
        <div>
          <div className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.3em] mb-2">Performance Analytics</div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-primary">Growth Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Monitoring kepemimpinan dan efisiensi operasional tim.</p>
        </div>
        <button 
          onClick={downloadPDF}
          className="flex items-center gap-2 bg-brand-primary text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
        >
          <FileDown className="w-4 h-4" /> Export PDF Report
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* WEEKLY TREND */}
        <section className="architectural-card p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" /> Tren Kinerja Mingguan
            </h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] font-bold text-gray-500">Closing Rate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-brand-accent"></div>
                <span className="text-[10px] font-bold text-gray-500">Efficiency</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PERFORMANCE_HISTORY}>
                <defs>
                  <linearGradient id="colorClosing" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="closingRate" stroke="#10b981" fillOpacity={1} fill="url(#colorClosing)" strokeWidth={2} />
                <Area type="monotone" dataKey="efficiency" stroke="#c5a059" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* SKILL RADAR */}
        <section className="architectural-card p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-accent" /> Skill Growth Matrix
            </h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SKILL_SCORES}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Current"
                  dataKey="current"
                  stroke="#1A1A1A"
                  fill="#1A1A1A"
                  fillOpacity={0.5}
                />
                <Radar
                  name="Previous"
                  dataKey="previous"
                  stroke="#c5a059"
                  fill="#c5a059"
                  fillOpacity={0.1}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* RECENT IMPROVEMENTS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="architectural-card p-5 bg-emerald-500 text-white">
          <Zap className="w-8 h-8 mb-4 opacity-50" />
          <h3 className="text-xl font-bold mb-1">92%</h3>
          <p className="text-xs font-bold uppercase tracking-widest opacity-80">Closing Accuracy</p>
          <p className="text-[10px] mt-2">+12% vs last month</p>
        </div>
        <div className="md:col-span-2 architectural-card p-6 divide-y divide-gray-100">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Pencapaian Utama Pekan Ini</h3>
          <div className="py-3 flex justify-between items-center">
            <div>
              <p className="text-sm font-bold">Inovasi Alur Revisi 3D</p>
              <p className="text-[10px] text-gray-500">Mengurangi waktu tunggu klien sebesar 15%</p>
            </div>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">NEW RECORD</span>
          </div>
          <div className="py-3 flex justify-between items-center">
            <div>
              <p className="text-sm font-bold">Sinkronisasi RAB-Design</p>
              <p className="text-[10px] text-gray-500">Zero error dalam perhitungan material awal</p>
            </div>
            <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">PASSED</span>
          </div>
        </div>
      </section>
    </div>
  );
}
