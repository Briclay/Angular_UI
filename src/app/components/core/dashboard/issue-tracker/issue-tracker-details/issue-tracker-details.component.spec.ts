import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueTrackerDetailsComponent } from './issue-tracker-details.component';

describe('IssueTrackerDetailsComponent', () => {
  let component: IssueTrackerDetailsComponent;
  let fixture: ComponentFixture<IssueTrackerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueTrackerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueTrackerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
