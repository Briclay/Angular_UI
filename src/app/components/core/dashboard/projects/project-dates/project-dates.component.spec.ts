import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDatesComponent } from './project-dates.component';

describe('ProjectDatesComponent', () => {
  let component: ProjectDatesComponent;
  let fixture: ComponentFixture<ProjectDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
