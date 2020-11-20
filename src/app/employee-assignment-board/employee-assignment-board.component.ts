import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-employee-assignment-board',
  templateUrl: './employee-assignment-board.component.html',
  styleUrls: ['./employee-assignment-board.component.scss']
})
export class EmployeeAssignmentBoardComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }
}
