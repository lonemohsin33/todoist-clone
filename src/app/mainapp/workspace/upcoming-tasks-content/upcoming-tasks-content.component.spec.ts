import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingTasksContentComponent } from './upcoming-tasks-content.component';

describe('UpcomingTasksContentComponent', () => {
  let component: UpcomingTasksContentComponent;
  let fixture: ComponentFixture<UpcomingTasksContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingTasksContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingTasksContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
