import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ActividadService } from '../../services/Activity/actividad-service';
import { ActividadDto } from '../../dto/actividadDto';

@Component({
  selector: 'app-modificar-actividad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modificar-actividad.html',
  styleUrls: ['./modificar-actividad.css'],
})
export class ModificarActividad {
  form: FormGroup;
  loading = false;
  errorMessage = '';
  id!: number;

  tipos = ['manual', 'automática', 'sistema'];

  constructor(
    private fb: FormBuilder,
    private actividades: ActividadService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      type: ['', Validators.required],
      description: [''],
      x: [0, [Validators.required]],
      y: [0, [Validators.required]],
    });

    this.id = Number(this.route.snapshot.queryParamMap.get('id') || 0);
    if (this.id) this.cargar();
  }

  c(ctrl: string) {
    return this.form.get(ctrl)!;
  }

  cargar() {
    this.loading = true;
    this.actividades.get(this.id).subscribe({
      next: (dto) => {
        if (dto) this.form.patchValue(dto);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'No se pudo cargar la actividad.';
      },
    });
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const dto: ActividadDto = { id: this.id, ...(this.form.value as ActividadDto) };
    this.loading = true;
    this.errorMessage = '';

    this.actividades.update(this.id, dto).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/consultar-actividad']);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'No se pudo actualizar la actividad.';
      },
    });
  }

  cancelar() {
    this.router.navigate(['/consultar-actividad']);
  }
}
