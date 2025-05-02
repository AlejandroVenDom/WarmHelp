export type IncidentType = 'TECNICA' | 'FINANCIERA' | 'OTROS';
export type IncidentState = 'PENDIENTE' | 'EN_PROGRESO' | 'RESUELTA' | 'CERRADA';

export interface Incident {
  id: number;
  title: string;
  description: string;
  type: IncidentType;
  state: IncidentState;
  userName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
