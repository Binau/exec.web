import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesEditorComponent } from './files-editor.component';

describe('FilesEditorComponent', () => {
  let component: FilesEditorComponent;
  let fixture: ComponentFixture<FilesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
