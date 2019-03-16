import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractConfigurationComponent } from './contract-configuration.component';

describe('ContractConfigurationComponent', () => {
  let component: ContractConfigurationComponent;
  let fixture: ComponentFixture<ContractConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
