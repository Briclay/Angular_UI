import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileConfigDesignTemplateComponent } from './file-config-design-template.component';

describe('FileConfigDesignTemplateComponent', () => {
  let component: FileConfigDesignTemplateComponent;
  let fixture: ComponentFixture<FileConfigDesignTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileConfigDesignTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileConfigDesignTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
