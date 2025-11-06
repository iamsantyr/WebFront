import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ActividadService } from '../../services/Activity/actividad-service';
import { ActividadDto } from '../../dto/actividadDto';

@Component({
  selector: 'app-eliminar-actividad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eliminar-actividad.html',
  styleUrls: ['./eliminar-actividad.css'],
})
export class EliminarActividad {
  loading = false;
  errorMessage = '';
  actividades: ActividadDto[] = [];

  constructor(private actividadesSrv: ActividadService, private router: Router) {
    this.cargar();
  }

  cargar() {
    this.loading = true;
    this.actividadesSrv.list().subscribe({
      next: (lista) => {
        this.actividades = Array.isArray(lista) ? lista : [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'No se pudo cargar la lista.';
      },
    });
  }

  eliminar(a: ActividadDto) {
    if (!a.id) return;
    if (!confirm(`¿Eliminar la actividad "${a.name}" (id ${a.id})?`)) return;
    this.actividadesSrv.delete(a.id).subscribe({
      next: () => this.cargar(),
      error: () => alert('Error al eliminar'),
    });
  }

  volver() {
    this.router.navigate(['/consultar-actividad']);
  }
}
