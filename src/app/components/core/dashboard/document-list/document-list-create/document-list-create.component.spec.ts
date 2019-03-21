import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentListCreateComponent } from './document-list-create.component';

describe('DocumentListCreateComponent', () => {
  let component: DocumentListCreateComponent;
  let fixture: ComponentFixture<DocumentListCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentListCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentListCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
