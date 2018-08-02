import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleFormationComponent } from './cycle-formation.component';

describe('CycleFormationComponent', () => {
  let component: CycleFormationComponent;
  let fixture: ComponentFixture<CycleFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CycleFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CycleFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
