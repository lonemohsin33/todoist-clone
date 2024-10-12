import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardExplicitComponent } from './task-card-explicit.component';

describe('TaskCardExplicitComponent', () => {
  let component: TaskCardExplicitComponent;
  let fixture: ComponentFixture<TaskCardExplicitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskCardExplicitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCardExplicitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
