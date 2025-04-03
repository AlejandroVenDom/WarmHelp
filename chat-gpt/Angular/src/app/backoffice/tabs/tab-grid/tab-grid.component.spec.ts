import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabGridComponent } from './tab-grid.component';

describe('TabGridComponent', () => {
  let component: TabGridComponent;
  let fixture: ComponentFixture<TabGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
