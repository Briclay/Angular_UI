import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcmDashDetailsComponent } from './ncm-dash-details.component';

describe('NcmDashDetailsComponent', () => {
  let component: NcmDashDetailsComponent;
  let fixture: ComponentFixture<NcmDashDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcmDashDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcmDashDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
