export interface ReportServiceInterface {
  id: number;
  type: string;
  description: string;
  createdAt: string;
  state: string;
  userName: string;

  // Para reportes de servicio
  serviceTitle?: string;
  serviceId?: number;

  // Para reportes de post
  postTitle?: string;
  postId?: number;
}
