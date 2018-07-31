import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenuCycleFormationComponent } from './contenu-cycle-formation.component';

describe('CycleFormationComponent', () => {
  let component: ContenuCycleFormationComponent;
  let fixture: ComponentFixture<ContenuCycleFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenuCycleFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenuCycleFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
