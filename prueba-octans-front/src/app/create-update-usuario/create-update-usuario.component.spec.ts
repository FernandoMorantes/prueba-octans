import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateUsuarioComponent } from './create-update-usuario.component';

describe('CreateUpdateUsuarioComponent', () => {
  let component: CreateUpdateUsuarioComponent;
  let fixture: ComponentFixture<CreateUpdateUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
