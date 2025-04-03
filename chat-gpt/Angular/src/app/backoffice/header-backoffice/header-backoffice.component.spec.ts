import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBackofficeComponent } from './header-backoffice.component';

describe('HeaderBackofficeComponent', () => {
  let component: HeaderBackofficeComponent;
  let fixture: ComponentFixture<HeaderBackofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderBackofficeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
