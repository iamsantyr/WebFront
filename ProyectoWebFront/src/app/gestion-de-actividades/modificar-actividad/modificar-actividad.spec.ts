import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ModificarActividad } from './modificar-actividad';
import { ActividadService } from '../../services/actividad.service';
import { ActivatedRoute } from '@angular/router';

describe('ModificarActividad', () => {
  let component: ModificarActividad;
  let fixture: ComponentFixture<ModificarActividad>;

  const mockSvc = {
    obtenerPorId: jasmine.createSpy('obtenerPorId').and.returnValue(of({
      id: 7,
      nombre: 'Diseñar UI',
      descripcion: 'Pantallas principales',
      categoria: 'diseño',
      estado: 'activo',
    })),
    actualizar: jasmine.createSpy('actualizar').and.returnValue(of(void 0)),
  } as unknown as ActividadService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarActividad],
      providers: [
        { provide: ActividadService, useValue: mockSvc },
        { provide: ActivatedRoute, useValue: { queryParams: of({ id: 7 }) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarActividad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('carga la actividad y llena el formulario', () => {
    expect(component.c('nombre').value).toBe('Diseñar UI');
  });

  it('no guarda si el formulario es inválido', () => {
    component.form.patchValue({ nombre: '' });
    component.guardarCambios();
    expect(mockSvc.actualizar).not.toHaveBeenCalled();
  });

  it('llama actualizar cuando es válido', () => {
    component.form.patchValue({
      nombre: 'Diseñar UI (v2)',
      descripcion: 'Pantallas principales actualizadas',
      categoria: 'diseño',
      estado: 'activo',
    });
    component.guardarCambios();
    expect(mockSvc.actualizar).toHaveBeenCalledWith(7, jasmine.any(Object));
  });

  it('muestra error cuando actualizar falla', () => {
    (mockSvc.actualizar as any).and.returnValue(throwError(() => new Error('fail')));
    component.form.patchValue({
      nombre: 'Diseñar UI (v3)',
      descripcion: 'Pantallas',
      categoria: 'diseño',
      estado: 'activo',
    });
    component.guardarCambios();
    expect(component.errorMessage).toBeTruthy();
  });
});
