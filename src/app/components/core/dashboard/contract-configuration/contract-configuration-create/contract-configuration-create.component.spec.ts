import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractConfigurationCreateComponent } from './contract-configuration-create.component';

describe('ContractConfigurationCreateComponent', () => {
  let component: ContractConfigurationCreateComponent;
  let fixture: ComponentFixture<ContractConfigurationCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractConfigurationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractConfigurationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
