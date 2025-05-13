import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioProfesionalPublicoComponent } from './servicio-profesional-publico.component';

describe('ServicioProfesionalPublicoComponent', () => {
  let component: ServicioProfesionalPublicoComponent;
  let fixture: ComponentFixture<ServicioProfesionalPublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicioProfesionalPublicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioProfesionalPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
