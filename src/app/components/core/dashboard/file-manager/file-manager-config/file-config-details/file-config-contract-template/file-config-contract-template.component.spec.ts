import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileConfigContractTemplateComponent } from './file-config-contract-template.component';

describe('FileConfigContractTemplateComponent', () => {
  let component: FileConfigContractTemplateComponent;
  let fixture: ComponentFixture<FileConfigContractTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileConfigContractTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileConfigContractTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
