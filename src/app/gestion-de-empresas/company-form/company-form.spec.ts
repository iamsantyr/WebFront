import { TestBed } from '@angular/core/testing';
import { CompanyForm } from './company-form';
import { CompanyService } from '../../services/company.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('CompanyForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CompanyForm],
      providers: [
        { provide: CompanyService, useValue: { crear: () => of(true), actualizar: () => of(true), obtener: () => of({}) } },
        { provide: ActivatedRoute, useValue: { queryParams: of({}) } }
      ],
    });
  });

  it('debería crearse', () => {
    const fixture = TestBed.createComponent(CompanyForm);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    expect(comp).toBeTruthy();
  });
});
