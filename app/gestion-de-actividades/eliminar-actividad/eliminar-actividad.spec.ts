import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { EliminarActividad } from './eliminar-actividad';
import { ActividadService } from '../../services/actividad.service';
import { ActivatedRoute } from '@angular/router';

describe('EliminarActividad', () => {
  let component: EliminarActividad;
  let fixture: ComponentFixture<EliminarActividad>;

  const mockSvc = {
    obtenerPorId: jasmine.createSpy('obtenerPorId').and.returnValue(of({
      id: 9, nombre: 'Prueba', descripcion: 'x', categoria: 'tarea', estado: 'activo'
    })),
    eliminar: jasmine.createSpy('eliminar').and.returnValue(of(void 0)),
  } as unknown as ActividadService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarActividad],
      providers: [
        { provide: ActividadService, useValue: mockSvc },
        { provide: ActivatedRoute, useValue: { queryParams: of({ id: 9 }) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EliminarActividad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('carga detalle si existe obtenerPorId', () => {
    expect(component.actividad?.id).toBe(9);
  });

  it('invoca eliminar y navega', () => {
    component.confirmarEliminar();
    expect(mockSvc.eliminar).toHaveBeenCalledWith(9);
  });

  it('muestra error si eliminar falla', () => {
    (mockSvc.eliminar as any).and.returnValue(throwError(() => new Error('boom')));
    component.confirmarEliminar();
    expect(component.errorMessage).toBeTruthy();
  });
});
