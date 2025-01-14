import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteDemoComponent } from './vente-demo.component';

describe('VenteDemoComponent', () => {
  let component: VenteDemoComponent;
  let fixture: ComponentFixture<VenteDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenteDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenteDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
