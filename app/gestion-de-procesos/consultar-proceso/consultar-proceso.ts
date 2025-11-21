import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProcesoService } from '../../services/proceso.service';
import { ProcesoDto } from '../../dto/procesoDto';

@Component({
  selector: 'app-mostrar-procesos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultar-proceso.html',
  styleUrls: ['./consultar-proceso.css'],
})
export class ConsultarProceso implements OnInit {
  procesos: ProcesoDto[] = [];
  loading = false;
  errorMessage = '';

  constructor(private procesoService: ProcesoService, private router: Router) {}

  ngOnInit() {
    this.cargarProcesos();
  }

  cargarProcesos() {
    this.loading = true;
    this.errorMessage = '';

    this.procesoService.listar().subscribe({
      next: (data) => {
        this.procesos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'No se pudieron cargar los procesos.';
        this.loading = false;
      },
    });
  }

  eliminarProceso(id?: number) {
    if (!id) return;

    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este proceso?');
    if (!confirmacion) return;

    this.loading = true;
    this.procesoService.eliminar(id).subscribe({
      next: () => {
        alert('Proceso eliminado con éxito.');
        this.procesos = this.procesos.filter((p) => p.id !== id);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al eliminar proceso:', err);
        alert('No se pudo eliminar el proceso. Intenta nuevamente.');
        this.loading = false;
      },
    });
  }

  volver() {
    this.router.navigate(['/home']);
  }
}
