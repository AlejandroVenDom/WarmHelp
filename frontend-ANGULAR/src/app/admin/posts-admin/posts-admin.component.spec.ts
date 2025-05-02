import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsAdminComponent } from './posts-admin.component';

describe('PostsAdminComponent', () => {
  let component: PostsAdminComponent;
  let fixture: ComponentFixture<PostsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
