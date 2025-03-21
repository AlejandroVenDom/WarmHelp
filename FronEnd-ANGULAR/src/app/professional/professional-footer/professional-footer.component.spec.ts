import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalFooterComponent } from './professional-footer.component';

describe('ProfessionalFooterComponent', () => {
  let component: ProfessionalFooterComponent;
  let fixture: ComponentFixture<ProfessionalFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
