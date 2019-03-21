import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelectionDialogComponent } from './user-selection-dialog.component';

describe('UserSelectionDialogComponent', () => {
  let component: UserSelectionDialogComponent;
  let fixture: ComponentFixture<UserSelectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSelectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
