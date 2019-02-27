import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueTrackerCreateComponent } from './issue-tracker-create.component';

describe('IssueTrackerCreateComponent', () => {
  let component: IssueTrackerCreateComponent;
  let fixture: ComponentFixture<IssueTrackerCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueTrackerCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueTrackerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
