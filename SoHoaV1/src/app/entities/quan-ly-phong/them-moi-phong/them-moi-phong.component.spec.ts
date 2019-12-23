import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemMoiPhongComponent } from './them-moi-phong.component';

describe('ThemMoiPhongComponent', () => {
  let component: ThemMoiPhongComponent;
  let fixture: ComponentFixture<ThemMoiPhongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemMoiPhongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemMoiPhongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
