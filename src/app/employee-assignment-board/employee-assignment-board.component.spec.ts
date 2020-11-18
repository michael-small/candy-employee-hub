import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssignmentBoardComponent } from './employee-assignment-board.component';

describe('EmployeeAssignmentBoardComponent', () => {
  let component: EmployeeAssignmentBoardComponent;
  let fixture: ComponentFixture<EmployeeAssignmentBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAssignmentBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAssignmentBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
