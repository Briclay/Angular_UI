import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelHeaderFilterComponent } from './panel-header-filter.component';

describe('PanelHeaderFilterComponent', () => {
  let component: PanelHeaderFilterComponent;
  let fixture: ComponentFixture<PanelHeaderFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelHeaderFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelHeaderFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
