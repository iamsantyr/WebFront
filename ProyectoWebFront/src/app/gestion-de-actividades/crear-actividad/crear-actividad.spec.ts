import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CrearActividad } from './crear-actividad';
import { ActividadService } from '../../services/actividad.service';

describe('CrearActividad', () => {
  let component: CrearActividad;
  let fixture: ComponentFixture<CrearActividad>;

  const mockSvc = {
    crear: jasmine.createSpy('crear').and.returnValue(of(void 0)),
  } as unknown as ActividadService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearActividad],
      providers: [{ provide: ActividadService, useValue: mockSvc }],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearActividad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('no guarda si el formulario es inválido', () => {
    component.form.reset(); // inválido
    component.guardar();
    expect(mockSvc.crear).not.toHaveBeenCalled();
  });

  it('llama al servicio cuando es válido', () => {
    component.form.setValue({
      nombre: 'Planificar sprint',
      descripcion: 'Reunión de planificación',
      categoria: 'tarea',
      estado: 'activo',
    });
    component.guardar();
    expect(mockSvc.crear).toHaveBeenCalled();
  });

  it('muestra error cuando el servicio falla', () => {
    (mockSvc.crear as any).and.returnValue(throwError(() => new Error('fail')));
    component.form.setValue({
      nombre: 'X',
      descripcion: 'abcd',
      categoria: 'tarea',
      estado: 'activo',
    });
    component.guardar();
    expect(component.errorMessage).toBeTruthy();
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearActividad } from './crear-actividad';

describe('CrearActividad', () => {
  let component: CrearActividad;
  let fixture: ComponentFixture<CrearActividad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearActividad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearActividad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
