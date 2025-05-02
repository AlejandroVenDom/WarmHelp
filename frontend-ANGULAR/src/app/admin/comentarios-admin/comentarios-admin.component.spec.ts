import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosAdminComponent } from './comentarios-admin.component';

describe('ComentariosAdminComponent', () => {
  let component: ComentariosAdminComponent;
  let fixture: ComponentFixture<ComentariosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComentariosAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentariosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
