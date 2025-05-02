import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsPostsAdminComponent } from './reports-posts-admin.component';

describe('ReportsPostsAdminComponent', () => {
  let component: ReportsPostsAdminComponent;
  let fixture: ComponentFixture<ReportsPostsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsPostsAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsPostsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
