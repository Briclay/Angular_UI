import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentListMoreDetailsComponent } from './document-list-more-details.component';

describe('DocumentListMoreDetailsComponent', () => {
  let component: DocumentListMoreDetailsComponent;
  let fixture: ComponentFixture<DocumentListMoreDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentListMoreDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentListMoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
