import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileConfigDetailsComponent } from './file-config-details.component';

describe('FileConfigDetailsComponent', () => {
  let component: FileConfigDetailsComponent;
  let fixture: ComponentFixture<FileConfigDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileConfigDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileConfigDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
