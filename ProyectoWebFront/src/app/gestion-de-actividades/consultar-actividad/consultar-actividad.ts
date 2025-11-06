import { Component, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ActividadService } from '../../services/Activity/actividad-service';
import { ActividadDto } from '../../dto/actividadDto';
import { PLATFORM_ID } from '@angular/core';

type ActividadView = ActividadDto;

@Component({
  selector: 'app-consultar-actividad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consultar-actividad.html',
  styleUrls: ['./consultar-actividad.css'],
})
export class ConsultarActividad {
  form: FormGroup;

  loading = false;
  errorMessage = '';

  actividades: ActividadView[] = [];
  todas: ActividadView[] = [];

  // modal
  modalOpen = false;
  seleccionada: ActividadView | null = null;

  private readonly isBrowser: boolean;

  constructor(
    private fb: FormBuilder,
    private actividadesSrv: ActividadService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    this.form = this.fb.group({
      q: [''],
      type: [''],
    });

    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.errorMessage = '';
    this.actividadesSrv.list().subscribe({
      next: (lista) => {
        this.todas = Array.isArray(lista) ? lista : [];
        // fallback si viene vacío (te deja ver botones)
        if (this.todas.length === 0) {
          this.errorMessage = 'No hay actividades. Usando datos de ejemplo.';
          this.todas = [
            {
              id: 1,
              name: 'Revisión inicial',
              type: 'manual',
              description: 'Primera revisión',
              x: 100,
              y: 200,
            },
          ];
        }
        this.actividades = [...this.todas];
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Error al cargar actividades. Usando datos de ejemplo.';
        this.todas = [
          {
            id: 1,
            name: 'Revisión inicial',
            type: 'manual',
            description: 'Primera revisión',
            x: 100,
            y: 200,
          },
        ];
        this.actividades = [...this.todas];
        this.loading = false;
      },
    });
  }

  aplicarBusqueda(): void {
    const { q, type } = this.form.value as { q?: string; type?: string };
    const term = (q || '').toLowerCase().trim();
    const t = (type || '').toLowerCase().trim();

    this.actividades = this.todas.filter((a) => {
      const byQ =
        !term ||
        (a.name && a.name.toLowerCase().includes(term)) ||
        (a.description && a.description.toLowerCase().includes(term)) ||
        (String(a.id || '')).includes(term);
      const byType = !t || (a.type && a.type.toLowerCase() === t);
      return byQ && byType;
    });
  }

  trackById(_i: number, it: ActividadView) {
    return it.id!;
  }

  abrirModal(a: ActividadView) {
    this.seleccionada = a;
    this.modalOpen = true;
    if (this.isBrowser) document.body.style.overflow = 'hidden';
  }

  cerrarModal() {
    this.modalOpen = false;
    this.seleccionada = null;
    if (this.isBrowser) document.body.style.overflow = '';
  }

  irCrear() {
    this.router.navigate(['/crear-actividad']);
  }

  irModificar(a: ActividadView) {
    this.router.navigate(['/modificar-actividad'], { queryParams: { id: a.id } });
  }

  eliminar(a: ActividadView) {
    if (!a.id) return;
    if (!confirm(`¿Eliminar la actividad "${a.name}" (id ${a.id})?`)) return;
    this.actividadesSrv.delete(a.id).subscribe({
      next: () => this.cargar(),
      error: () => alert('Error al eliminar.'),
    });
  }
}
