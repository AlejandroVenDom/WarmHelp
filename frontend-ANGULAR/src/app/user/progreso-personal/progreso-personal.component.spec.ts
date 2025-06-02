import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresoPersonalComponent } from './progreso-personal.component';

describe('ProgresoPersonalComponent', () => {
  let component: ProgresoPersonalComponent;
  let fixture: ComponentFixture<ProgresoPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgresoPersonalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgresoPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
