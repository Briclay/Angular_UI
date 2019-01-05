import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPhasesComponent } from './project-phases.component';

describe('ProjectPhasesComponent', () => {
  let component: ProjectPhasesComponent;
  let fixture: ComponentFixture<ProjectPhasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPhasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPhasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
