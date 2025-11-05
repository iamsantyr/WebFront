import { TestBed } from '@angular/core/testing';
import { CompaniesList } from './companies-list';
import { CompanyService } from '../../services/company.service';
import { of } from 'rxjs';

describe('CompaniesList', () => {
  let component: CompaniesList;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CompaniesList],
      providers: [
        {
          provide: CompanyService,
          useValue: {
            listar: () => of([]),
            eliminar: () => of(true),
          },
        },
      ],
    });

    const fixture = TestBed.createComponent(CompaniesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });
});
