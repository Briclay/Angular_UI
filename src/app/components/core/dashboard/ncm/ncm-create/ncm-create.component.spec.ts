import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcmCreateComponent } from './ncm-create.component';

describe('NcmCreateComponent', () => {
  let component: NcmCreateComponent;
  let fixture: ComponentFixture<NcmCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcmCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcmCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
