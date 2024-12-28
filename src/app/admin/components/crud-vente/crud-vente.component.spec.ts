import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudVenteComponent } from './crud-vente.component';

describe('CrudVenteComponent', () => {
  let component: CrudVenteComponent;
  let fixture: ComponentFixture<CrudVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudVenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
