import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicTerceraCajaComponent } from './graphic-tercera-caja.component';

describe('GraphicTerceraCajaComponent', () => {
  let component: GraphicTerceraCajaComponent;
  let fixture: ComponentFixture<GraphicTerceraCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicTerceraCajaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicTerceraCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
