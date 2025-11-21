import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProcesoDto } from '../../dto/procesoDto';
import { ProcesoService } from '../../services';
import { ActividadService } from '../../services/Activity/actividad-service';

type ProcessStatus = 'DRAFT' | 'ACTIVE' | 'INACTIVE';

@Component({
  selector: 'app-registro-procesos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-procesos.html',
  styleUrls: ['./registro-procesos.css'],
})
export class RegistroProcesos implements OnInit {

   constructor(
    private router: Router,
    private procesoService: ProcesoService,
    private actividadService: ActividadService
  ) {}
  
  statuses: ProcessStatus[] = ['DRAFT', 'ACTIVE', 'INACTIVE'];
  procesoDto: ProcesoDto = new ProcesoDto();

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

  // Inputs “rápidos” (agregar por ID)
  quick = {
    activityId: null as number | null,
    archId: null as number | null,
    gatewayId: null as number | null,
  };

 
  ngOnInit(): void {
    this.actividadService.list().subscribe(r => this.activitiesCatalogo = r);
    // this.actividadService.getArches().subscribe(r => this.archsCatalogo = r);
    // this.actividadService.getGateways().subscribe(r => this.gatewaysCatalogo = r);

  }

  // ----- Acciones del formulario -----
  onRegistrarProceso() {
    this.crearProceso();
  }

  crearProceso() {
 
  }

}
