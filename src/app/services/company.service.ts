import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CompanyDto {
  id?: number;
  nombre: string;
  nit: string;
  telefono: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseUrl = '/api/companies';

  constructor(private http: HttpClient) {}

  listar(): Observable<CompanyDto[]> {
    return this.http.get<CompanyDto[]>(`${this.baseUrl}/list`);
  }

  obtener(id: number): Observable<CompanyDto> {
    return this.http.get<CompanyDto>(`${this.baseUrl}/get/${id}`);
  }

  crear(company: CompanyDto): Observable<CompanyDto> {
    return this.http.post<CompanyDto>(`${this.baseUrl}/create`, company);
  }

  actualizar(id: number, company: CompanyDto): Observable<CompanyDto> {
    return this.http.put<CompanyDto>(`${this.baseUrl}/update/${id}`, company);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
