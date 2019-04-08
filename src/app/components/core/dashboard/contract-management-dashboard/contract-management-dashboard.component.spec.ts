import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractManagementDashboardComponent } from './contract-management-dashboard.component';

describe('ContractManagementDashboardComponent', () => {
  let component: ContractManagementDashboardComponent;
  let fixture: ComponentFixture<ContractManagementDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractManagementDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractManagementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
