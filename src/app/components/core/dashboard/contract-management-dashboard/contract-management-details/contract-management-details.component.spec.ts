import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractManagementDetailsComponent } from './contract-management-details.component';

describe('ContractManagementDetailsComponent', () => {
  let component: ContractManagementDetailsComponent;
  let fixture: ComponentFixture<ContractManagementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractManagementDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractManagementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
