import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentListDetailsComponent } from './document-list-details.component';

describe('DocumentListDetailsComponent', () => {
  let component: DocumentListDetailsComponent;
  let fixture: ComponentFixture<DocumentListDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentListDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
