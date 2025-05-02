import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsAdminComponent } from './reports-admin.component';

describe('ReportsAdminComponent', () => {
  let component: ReportsAdminComponent;
  let fixture: ComponentFixture<ReportsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
