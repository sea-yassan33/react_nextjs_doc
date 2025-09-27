// 筋力トレーニング一覧
export interface ExerciseRow {
  id: number;
  name: string;
  eventKey: string;
  eventLabel: string;
  exerciseTime?: string;
  overveiew?: string;
  videoUrl?: string;
  created_at: string;
  updated_at: string;
};
export type EventKey = 'all'|'walking' | 'running' | 'stretch' | 'circit' | 'dance' | 'yoga';

export interface ExerciseDetail {
  id: number;
  name: string;
  eventKey: string;
  eventLabel: string;
  exerciseTime?: string;
  overveiew?: string;
  videoUrl?: string;
  created_at: string;
  updated_at: string;
};