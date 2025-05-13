import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDeniedComponent } from './payment-denied.component';

describe('PaymentDeniedComponent', () => {
  let component: PaymentDeniedComponent;
  let fixture: ComponentFixture<PaymentDeniedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentDeniedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentDeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
