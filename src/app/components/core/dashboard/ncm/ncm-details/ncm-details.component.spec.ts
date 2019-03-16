import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcmDetailsComponent } from './ncm-details.component';

describe('NcmDetailsComponent', () => {
  let component: NcmDetailsComponent;
  let fixture: ComponentFixture<NcmDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcmDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcmDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
