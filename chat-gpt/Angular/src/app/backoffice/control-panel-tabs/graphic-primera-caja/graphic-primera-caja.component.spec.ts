import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicPrimeraCajaComponent } from './graphic-primera-caja.component';

describe('GraphicPrimeraCajaComponent', () => {
  let component: GraphicPrimeraCajaComponent;
  let fixture: ComponentFixture<GraphicPrimeraCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicPrimeraCajaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicPrimeraCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
