import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpdListComponent } from './bpd-list.component';

describe('BpdListComponent', () => {
  let component: BpdListComponent;
  let fixture: ComponentFixture<BpdListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpdListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
