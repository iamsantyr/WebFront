import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProcesoDto } from '../../dto/procesoDto';
import { ProcesoService } from '../../services';

type ProcessStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';

@Component({
  selector: 'app-editar-proceso',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-proceso.html',
  styleUrls: ['./editar-proceso.css'],
})
export class EditarProceso implements OnInit {
  procesoDto: ProcesoDto = new ProcesoDto();
  statuses: ProcessStatus[] = ['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED'];
  mensajeHistorialProceso: string | null = null;

  activitiesCatalogo = [
    { id: 1, name: 'Crear solicitud' },
    { id: 2, name: 'Validar datos' },
  ];

  archsCatalogo = [
    { id: 10, actividadI: 1, actividadD: 2 },
    { id: 11, actividadI: 2, actividadD: 3 },
  ];

  gatewaysCatalogo = [
    { id: 100, type: 'EXCLUSIVE' },
    { id: 101, type: 'PARALLEL' },
  ];

  constructor(
    private router: Router,
    private procesoService: ProcesoService
  ) {}

  ngOnInit(): void {
    // Aquí se cargaría el proceso actual desde el backend:
    // Ejemplo:
    // const id = this.route.snapshot.paramMap.get('id');
    // this.procesoService.obtenerPorId(id!).subscribe((data) => {
    //   this.procesoDto = data;
    // });
  }

  onActualizarProceso() {
    // Normaliza listas
    this.procesoDto.activityIds = (this.procesoDto.activityIds ?? []).map(Number);
    this.procesoDto.archIds = (this.procesoDto.archIds ?? []).map(Number);
    this.procesoDto.gatewayIds = (this.procesoDto.gatewayIds ?? []).map(Number);

    this.procesoService.actualizar(this.procesoDto).subscribe({
      next: (data) => {
        this.mensajeHistorialProceso = 'Proceso actualizado correctamente.';
        console.log('Proceso actualizado:', data);
        // this.router.navigate(['/procesos']);
      },
      error: (err) => {
        console.error('Error actualizando proceso', err);
        this.mensajeHistorialProceso = 'Ocurrió un error al actualizar el proceso.';
      },
    });
  }

  cancelar() {
    this.router.navigate(['/procesos']);
  }
}
