import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationDropDownComponent } from './organisation-drop-down.component';

describe('OrganisationDropDownComponent', () => {
  let component: OrganisationDropDownComponent;
  let fixture: ComponentFixture<OrganisationDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationDropDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
