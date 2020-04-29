import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddorganizerComponent } from './addorganizer.component';

describe('AddorganizerComponent', () => {
  let component: AddorganizerComponent;
  let fixture: ComponentFixture<AddorganizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddorganizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddorganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
