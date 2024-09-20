import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePickerComponentComponent } from './time-picker-component.component';

describe('TimePickerComponentComponent', () => {
  let component: TimePickerComponentComponent;
  let fixture: ComponentFixture<TimePickerComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimePickerComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePickerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
