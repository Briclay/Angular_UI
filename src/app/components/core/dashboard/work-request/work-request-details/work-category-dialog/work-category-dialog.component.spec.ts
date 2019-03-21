import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCategoryDialogComponent } from './work-category-dialog.component';

describe('WorkCategoryDialogComponent', () => {
  let component: WorkCategoryDialogComponent;
  let fixture: ComponentFixture<WorkCategoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkCategoryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
