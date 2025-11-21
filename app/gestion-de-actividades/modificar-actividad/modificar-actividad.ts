import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  tipos = ['manual', 'automática', 'sistema'];

  constructor(
    private fb: FormBuilder,
    private actividades: ActividadService,
    private router: Router
  ) {
    this.form = this.fb.group({
      id: [null, [Validators.required, Validators.min(1)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      type: ['', Validators.required],
      description: [''],
      x: [0, [Validators.required]],
      y: [0, [Validators.required]],
    });
  }

  c(ctrl: string) {
    return this.form.get(ctrl)!;
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto: ActividadDto = this.form.value as ActividadDto;
    const id = dto.id!;
    this.loading = true;
    this.errorMessage = '';

    this.actividades.update(id, dto).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/mostrar-actividades']);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'No se pudo actualizar la actividad.';
      },
    });
  }

  cancelar() {
    this.router.navigate(['/home']);
  }
}
