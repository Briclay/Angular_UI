import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcmDashboardComponent } from './ncm-dashboard.component';

describe('NcmDashboardComponent', () => {
  let component: NcmDashboardComponent;
  let fixture: ComponentFixture<NcmDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcmDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcmDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
