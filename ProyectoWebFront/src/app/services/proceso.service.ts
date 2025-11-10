import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProcesoDto } from '../dto/procesoDto';

export interface ProcessHistory {
  id: number;
  procesoId: number;
  accion: string;
  fecha: string;
  actor: string;
  detalles?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {
  private baseUrl = 'http://localhost:8080/api/processes'; // <-- tu backend Spring Boot

  constructor(private http: HttpClient) {}

  // ============================
  // LISTAR PROCESOS
  // ============================
  listar(orgId?: number, estado?: string): Observable<ProcesoDto[]> {
    let params = new HttpParams();
    if (orgId) params = params.set('orgId', orgId);
    if (estado) params = params.set('status', estado);

    return this.http.get<ProcesoDto[]>(`${this.baseUrl}/list`, { params });
  }

  // ============================
  // OBTENER PROCESO POR ID
  // ============================
  obtener(id: number): Observable<ProcesoDto> {
    return this.http.get<ProcesoDto>(`${this.baseUrl}/get/${id}`);
  }

  // ============================
  // CREAR PROCESO
  // ============================
  crear(proceso: ProcesoDto, actorEmail?: string): Observable<ProcesoDto> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(actorEmail ? { 'X-Actor-Email': actorEmail } : {})
    });

    return this.http.post<ProcesoDto>(`${this.baseUrl}/create`, proceso, { headers });
  }

  // ============================
  // ACTUALIZAR PROCESO
  // ============================
  actualizar(proceso: ProcesoDto, actorEmail?: string): Observable<ProcesoDto> {
    if (!proceso.id) {
      throw new Error('El proceso debe tener un ID para actualizarse.');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(actorEmail ? { 'X-Actor-Email': actorEmail } : {})
    });

    return this.http.put<ProcesoDto>(
      `${this.baseUrl}/update/${proceso.id}`,
      proceso,
      { headers }
    );
  }

  // ============================
  // ELIMINAR PROCESO
  // ============================
  eliminar(id: number, hardDelete = false, actorEmail?: string): Observable<void> {
    const headers = new HttpHeaders({
      ...(actorEmail ? { 'X-Actor-Email': actorEmail } : {})
    });

    const params = new HttpParams().set('hardDelete', hardDelete);

    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, { headers, params });
  }

  // ============================
  // HISTORIAL DE PROCESO
  // ============================
  historial(id: number): Observable<ProcessHistory[]> {
    return this.http.get<ProcessHistory[]>(`${this.baseUrl}/${id}/history`);
  }
}
