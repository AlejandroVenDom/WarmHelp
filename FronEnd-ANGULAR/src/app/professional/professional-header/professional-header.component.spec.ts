import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalHeaderComponent } from './professional-header.component';

describe('ProfessionalHeaderComponent', () => {
  let component: ProfessionalHeaderComponent;
  let fixture: ComponentFixture<ProfessionalHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
