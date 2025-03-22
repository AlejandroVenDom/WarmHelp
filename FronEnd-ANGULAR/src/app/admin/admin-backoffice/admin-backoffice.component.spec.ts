import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBackofficeComponent } from './admin-backoffice.component';

describe('AdminBackofficeComponent', () => {
  let component: AdminBackofficeComponent;
  let fixture: ComponentFixture<AdminBackofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBackofficeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
