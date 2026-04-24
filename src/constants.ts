import { Task, Project, TeamMember, Risk } from './types';

export const INITIAL_TASKS: Task[] = [
  // DAILY (SENIN s/d SABTU)
  { id: 'd1', text: 'Briefing: Menyampaikan prioritas hari ini (max 3 fokus)', completed: false, category: 'Daily' },
  { id: 'd2', text: 'Briefing: Menanyakan hambatan utama tim', completed: false, category: 'Daily' },
  { id: 'd3', text: 'Briefing: Menegaskan target harian (output, bukan aktivitas)', completed: false, category: 'Daily' },
  { id: 'd4', text: 'Kontrol Progres: Cek progres real vs rencana (bukan sekadar %)', completed: false, category: 'Daily' },
  { id: 'd5', text: 'Kontrol Progres: Minta bukti output (gambar, file, dokumen)', completed: false, category: 'Daily' },
  { id: 'd6', text: 'Kontrol Progres: Identifikasi proyek stagnan (>3 hari)', completed: false, category: 'Daily' },
  { id: 'd7', text: 'Revisi & Klien: Cek proyek dengan revisi >2x', completed: false, category: 'Daily' },
  { id: 'd8', text: 'Revisi & Klien: Cek klien yang belum respon (>3 hari)', completed: false, category: 'Daily' },
  { id: 'd9', text: 'Revisi & Klien: Tentukan: lanjut / lock / eskalasi', completed: false, category: 'Daily' },
  { id: 'd10', text: 'Intervensi: Pilih 1–2 proyek paling bermasalah', completed: false, category: 'Daily' },
  { id: 'd11', text: 'Intervensi: Masuk langsung (bukan menunggu laporan)', completed: false, category: 'Daily' },
  { id: 'd12', text: 'Intervensi: Ambil keputusan cepat (stop / lanjut / ubah arah)', completed: false, category: 'Daily' },
  
  // MONDAY - SETTING ARAH & PRIORITAS
  { id: 'mon1', text: 'Menentukan 3 proyek prioritas minggu ini', completed: false, category: 'Monday' },
  { id: 'mon2', text: 'Menentukan target closing (proyek mana siap ST)', completed: false, category: 'Monday' },
  { id: 'mon3', text: 'Mapping beban kerja tim', completed: false, category: 'Monday' },
  { id: 'mon4', text: 'Identifikasi risiko utama minggu ini', completed: false, category: 'Monday' },
  
  // TUESDAY - KONTROL DESAIN & KUALITAS
  { id: 'tue1', text: 'Review output desain (3D, layout, konsep)', completed: false, category: 'Tuesday' },
  { id: 'tue2', text: 'Pastikan arah desain tidak berubah-ubah', completed: false, category: 'Tuesday' },
  { id: 'tue3', text: 'Cek sinkronisasi awal 3D – RAB – kebutuhan klien', completed: false, category: 'Tuesday' },
  { id: 'tue4', text: 'Identifikasi potensi revisi besar', completed: false, category: 'Tuesday' },
  
  // WEDNESDAY - KONTROL PROGRES & TIM
  { id: 'wed1', text: 'Review progres detail tiap proyek', completed: false, category: 'Wednesday' },
  { id: 'wed2', text: 'Cek beban kerja per individu', completed: false, category: 'Wednesday' },
  { id: 'wed3', text: 'Identifikasi bottleneck (orang / proses)', completed: false, category: 'Wednesday' },
  { id: 'wed4', text: 'Redistribusi kerja jika perlu', completed: false, category: 'Wednesday' },
  
  // THURSDAY - KONTROL KLIEN & KOMUNIKASI
  { id: 'thu1', text: 'Cek semua komunikasi ke klien', completed: false, category: 'Thursday' },
  { id: 'thu2', text: 'Pastikan tidak ada pending tanpa follow-up', completed: false, category: 'Thursday' },
  { id: 'thu3', text: 'Evaluasi hasil meeting / presentasi', completed: false, category: 'Thursday' },
  { id: 'thu4', text: 'Tentukan strategi untuk klien yang “diam”', completed: false, category: 'Thursday' },
  
  // FRIDAY - QUALITY CONTROL & CLOSING
  { id: 'fri1', text: 'Review QC produk yang mendekati akhir', completed: false, category: 'Friday' },
  { id: 'fri2', text: 'Pastikan output siap serah terima', completed: false, category: 'Friday' },
  { id: 'fri3', text: 'Cek kesiapan dokumen (DED, RAB, dll)', completed: false, category: 'Friday' },
  { id: 'fri4', text: 'Push proyek >90% untuk closing', completed: false, category: 'Friday' },
  
  // SATURDAY - EVALUASI & PERBAIKAN SISTEM
  { id: 'sat1', text: 'Review capaian minggu ini (target vs real)', completed: false, category: 'Saturday' },
  { id: 'sat2', text: 'Identifikasi masalah berulang', completed: false, category: 'Saturday' },
  { id: 'sat3', text: 'Evaluasi: masalah orang atau sistem', completed: false, category: 'Saturday' },
  { id: 'sat4', text: 'Tentukan 1–2 improvement untuk minggu depan', completed: false, category: 'Saturday' },

  // PRIORITIES (ALWAYS THERE)
  { id: 'p1', text: 'Ada proyek yang mendekati closing', completed: false, category: 'Priority' },
  { id: 'p2', text: 'Tidak ada revisi liar', completed: false, category: 'Priority' },
  { id: 'p3', text: 'Tidak ada proyek stagnan', completed: false, category: 'Priority' },
  { id: 'p4', text: 'Tim bekerja berdasarkan prioritas', completed: false, category: 'Priority' },
];

export const INITIAL_PROJECTS: Project[] = [
  { 
    id: '1', name: 'IJ House', progress: 97, deviation: -3, revisions: 3, 
    clientStatus: 'Pasif', pic: 'Designer A', status: 'Waspada', notes: 'Revisi tinggi', isClosingTarget: true 
  },
  { 
    id: '2', name: 'IW House', progress: 99, deviation: -1, revisions: 1, 
    clientStatus: 'Aktif', pic: 'Designer B', status: 'Aman', notes: 'Siap ST', isClosingTarget: true 
  },
  { 
    id: '3', name: 'SF House', progress: 63, deviation: -15, revisions: 4, 
    clientStatus: 'Pasif', pic: 'Designer C', status: 'Bahaya', notes: 'Stagnan', isClosingTarget: false 
  },
];

export const INITIAL_TEAM: TeamMember[] = [
  { id: 't1', name: 'Designer A', projects: 3, workload: 'Overload', notes: 'Turunkan beban' },
  { id: 't2', name: 'Designer B', projects: 2, workload: 'Normal', notes: 'OK' },
  { id: 't3', name: 'Drafter X', projects: 1, workload: 'Underload', notes: 'Tambah tugas' },
];

export const INITIAL_RISKS: Risk[] = [
  { id: 'r1', type: 'Revisi >2x', impactedProjects: 2, level: 'Bahaya', action: 'Lock design' },
  { id: 'r2', type: 'Klien tidak respon', impactedProjects: 5, level: 'Waspada', action: 'Follow-up / eskalasi' },
];

export const PERFORMANCE_HISTORY: PerformanceMetric[] = [
  { week: 'W1', closingRate: 65, efficiency: 70, skillGrowth: 60 },
  { week: 'W2', closingRate: 72, efficiency: 75, skillGrowth: 65 },
  { week: 'W3', closingRate: 70, efficiency: 82, skillGrowth: 75 },
  { week: 'W4', closingRate: 85, efficiency: 88, skillGrowth: 80 },
];

export const SKILL_SCORES: SkillScore[] = [
  { subject: 'Planning', current: 85, previous: 75, fullMark: 100 },
  { subject: 'Leadership', current: 90, previous: 80, fullMark: 100 },
  { subject: 'Tech Design', current: 75, previous: 70, fullMark: 100 },
  { subject: 'QC Standards', current: 80, previous: 65, fullMark: 100 },
  { subject: 'Risk Mgmt', current: 70, previous: 50, fullMark: 100 },
];
