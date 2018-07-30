import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheCycleFormationComponent } from './recherche-cycle-formation.component';

describe('AccueilFormationComponent', () => {
  let component: RechercheCycleFormationComponent;
  let fixture: ComponentFixture<RechercheCycleFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechercheCycleFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercheCycleFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
