import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecSvgComponent } from './exec-svg.component';

describe('ExecSvgComponent', () => {
  let component: ExecSvgComponent;
  let fixture: ComponentFixture<ExecSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
