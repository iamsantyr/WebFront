// src/app/services/proceso.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProcesoDto } from '../dto/procesoDto';

export interface ProcessHistory {
  id: number;
  procesoId: number;
  accion: string;
  fecha: string;   // ISO-8601 desde backend
  actor: string;
  detalles?: string;
}

@Injectable({ providedIn: 'root' })
export class ProcesoService {
  private readonly baseUrl = 'http://10.43.102.198:8080/api/processes';

  constructor(private http: HttpClient) {}

  // ============= LISTAR PROCESOS =============
  listar(orgId?: number, status?: string): Observable<ProcesoDto[]> {
    let params = new HttpParams();
    if (orgId != null) params = params.set('orgId', String(orgId));
    if (status)       params = params.set('status', status);
    return this.http.get<ProcesoDto[]>(`${this.baseUrl}/list`, { params });
  }

  // ============= OBTENER POR ID =============
  obtener(id: number): Observable<ProcesoDto> {
    return this.http.get<ProcesoDto>(`${this.baseUrl}/get/${id}`);
  }

  // ============= CREAR =============
  crear(proceso: ProcesoDto, actorEmail?: string): Observable<ProcesoDto> {
    const headers = this.buildHeaders(actorEmail, true);
    return this.http.post<ProcesoDto>(`${this.baseUrl}/create`, proceso, { headers });
  }

  // ============= ACTUALIZAR =============
  actualizar(proceso: ProcesoDto, actorEmail?: string): Observable<ProcesoDto> {
    if (!('id' in proceso) || (proceso as any).id == null) {
      throw new Error('El proceso debe tener un ID para actualizarse.');
    }
    const headers = this.buildHeaders(actorEmail, true);
    return this.http.put<ProcesoDto>(`${this.baseUrl}/update/${(proceso as any).id}`, proceso, { headers });
  }

  // ============= ELIMINAR =============
  eliminar(id: number, hardDelete = false, actorEmail?: string): Observable<void> {
    const headers = this.buildHeaders(actorEmail, false);
    const params = new HttpParams().set('hardDelete', String(hardDelete));
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, { headers, params });
  }

  // ============= HISTORIAL =============
  historial(id: number): Observable<ProcessHistory[]> {
    return this.http.get<ProcessHistory[]>(`${this.baseUrl}/${id}/history`);
  }

  // ============= HELPERS =============
  private buildHeaders(actorEmail?: string, json = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (json) headers = headers.set('Content-Type', 'application/json');
    if (actorEmail) headers = headers.set('X-Actor-Email', actorEmail);
    return headers;
  }
}
