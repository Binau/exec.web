import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoExecComponent } from './demo-exec.component';

describe('TestsComponent', () => {
  let component: DemoExecComponent;
  let fixture: ComponentFixture<DemoExecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoExecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoExecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
