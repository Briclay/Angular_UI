import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileShareDialogComponent } from './file-share-dialog.component';

describe('FileShareDialogComponent', () => {
  let component: FileShareDialogComponent;
  let fixture: ComponentFixture<FileShareDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileShareDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileShareDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
