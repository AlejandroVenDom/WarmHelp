import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisIncidenciasComponent } from './mis-incidencias.component';

describe('MisIncidenciasComponent', () => {
  let component: MisIncidenciasComponent;
  let fixture: ComponentFixture<MisIncidenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MisIncidenciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisIncidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
