import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDropDownComponent } from './project-drop-down.component';

describe('ProjectDropDownComponent', () => {
  let component: ProjectDropDownComponent;
  let fixture: ComponentFixture<ProjectDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDropDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
