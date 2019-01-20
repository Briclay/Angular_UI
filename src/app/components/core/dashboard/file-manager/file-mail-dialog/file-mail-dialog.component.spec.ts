import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileMailDialogComponent } from './file-mail-dialog.component';

describe('FileMailDialogComponent', () => {
  let component: FileMailDialogComponent;
  let fixture: ComponentFixture<FileMailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileMailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileMailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
