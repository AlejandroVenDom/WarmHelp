import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosAdminComponent } from './servicios-admin.component';

describe('ServiciosAdminComponent', () => {
  let component: ServiciosAdminComponent;
  let fixture: ComponentFixture<ServiciosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiciosAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
