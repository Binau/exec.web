import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VignetteFormationComponent } from './vignette-formation.component';

describe('FormationComponent', () => {
  let component: VignetteFormationComponent;
  let fixture: ComponentFixture<VignetteFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VignetteFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VignetteFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
