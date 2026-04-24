export type ProjectStatus = 'Aman' | 'Waspada' | 'Bahaya';
export type ClientStatus = 'Aktif' | 'Pasif';
export type WorkloadStatus = 'Underload' | 'Normal' | 'Overload';

export interface Project {
  id: string;
  name: string;
  progress: number;
  deviation: number;
  revisions: number;
  clientStatus: ClientStatus;
  pic: string;
  status: ProjectStatus;
  notes: string;
  isClosingTarget: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  projects: number;
  workload: WorkloadStatus;
  notes: string;
}

export interface DashboardMetric {
  label: string;
  value: number;
  target: number;
  status: ProjectStatus;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  category: 'Daily' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Priority';
}

export interface PerformanceMetric {
  week: string;
  closingRate: number;
  efficiency: number;
  skillGrowth: number;
}

export interface SkillScore {
  subject: string;
  current: number;
  previous: number;
  fullMark: number;
}

export interface AgendaItem {
  id: string;
  text: string;
  completed: boolean;
  date: string; // ISO string YYYY-MM-DD
}
