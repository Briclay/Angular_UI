import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractConfigurationDetailComponent } from './contract-configuration-detail.component';

describe('ContractConfigurationDetailComponent', () => {
  let component: ContractConfigurationDetailComponent;
  let fixture: ComponentFixture<ContractConfigurationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractConfigurationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractConfigurationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
