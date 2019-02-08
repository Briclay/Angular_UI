import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSharedFolderComponent } from './file-shared-folder.component';

describe('FileSharedFolderComponent', () => {
  let component: FileSharedFolderComponent;
  let fixture: ComponentFixture<FileSharedFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileSharedFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileSharedFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
