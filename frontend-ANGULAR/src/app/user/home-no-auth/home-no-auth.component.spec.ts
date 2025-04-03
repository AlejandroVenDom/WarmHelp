import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNoAuthComponent } from './home-no-auth.component';

describe('HomeNoAuthComponent', () => {
  let component: HomeNoAuthComponent;
  let fixture: ComponentFixture<HomeNoAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeNoAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeNoAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
