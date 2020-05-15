import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraCuuComponent } from './tra-cuu.component';

describe('TraCuuComponent', () => {
  let component: TraCuuComponent;
  let fixture: ComponentFixture<TraCuuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraCuuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraCuuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
