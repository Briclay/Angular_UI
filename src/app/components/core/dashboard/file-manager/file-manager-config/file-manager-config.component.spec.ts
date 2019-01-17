import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileManagerConfigComponent } from './file-manager-config.component';

describe('FileManagerConfigComponent', () => {
  let component: FileManagerConfigComponent;
  let fixture: ComponentFixture<FileManagerConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileManagerConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileManagerConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
