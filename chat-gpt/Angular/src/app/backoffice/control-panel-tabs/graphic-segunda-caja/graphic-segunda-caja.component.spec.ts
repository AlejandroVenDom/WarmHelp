import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicSegundaCajaComponent } from './graphic-segunda-caja.component';

describe('GraphicSegundaCajaComponent', () => {
  let component: GraphicSegundaCajaComponent;
  let fixture: ComponentFixture<GraphicSegundaCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicSegundaCajaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicSegundaCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
