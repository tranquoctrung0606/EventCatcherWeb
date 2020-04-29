import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewOrganizerComponent } from './overview-organizer.component';

describe('OverviewOrganizerComponent', () => {
  let component: OverviewOrganizerComponent;
  let fixture: ComponentFixture<OverviewOrganizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewOrganizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
