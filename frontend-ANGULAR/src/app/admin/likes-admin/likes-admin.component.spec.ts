import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesAdminComponent } from './likes-admin.component';

describe('LikesAdminComponent', () => {
  let component: LikesAdminComponent;
  let fixture: ComponentFixture<LikesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LikesAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
