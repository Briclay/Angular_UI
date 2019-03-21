import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpdListCreateComponent } from './bpd-list-create.component';

describe('BpdListCreateComponent', () => {
  let component: BpdListCreateComponent;
  let fixture: ComponentFixture<BpdListCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpdListCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpdListCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
