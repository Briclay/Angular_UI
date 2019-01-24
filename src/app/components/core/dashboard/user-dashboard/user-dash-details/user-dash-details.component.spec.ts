import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashDetailsComponent } from './user-dash-details.component';

describe('UserDashDetailsComponent', () => {
  let component: UserDashDetailsComponent;
  let fixture: ComponentFixture<UserDashDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
