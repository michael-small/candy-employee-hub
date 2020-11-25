import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from "@angular/forms"
import { AuthService } from '../auth/auth.service';
import { User } from '../models/User';

interface LineState {
  value: string;
  viewValue: string;
}
interface Shifts {
  value: string;
  viewValue: string;
}

interface LineStatus {
  comment: string;
  status: string;
  date: string;
  shift: string;
}

@Component({
  selector: 'app-line-status',
  templateUrl: './line-status.component.html',
  styleUrls: ['./line-status.component.scss']
})
export class LineStatusComponent implements OnInit {

  public users: User[];

  lineStatusForm = new FormGroup({
    date: new FormControl(),
    shift: new FormControl(),
    comment: new FormControl(),
    status: new FormControl(),
  });

  lineStatusArray: LineStatus[] = [];
  lineStatusInstance = {comment: '', status: '', date: '', shift: ''};

  comment = '';
  status: '';
  date = '';
  shift: '';

  line: LineState[] = [
    {value: 'trial', viewValue: 'Trial'},
    {value: 'production', viewValue: 'Production'},
    {value: 'cleaning', viewValue: 'Cleaning'},
    {value: 'down', viewValue: 'Down'},
  ];

  shifts: Shifts[] = [
    {value: 'day', viewValue: 'Day'},
    {value: 'mid', viewValue: 'Mid'},
    {value: 'night', viewValue: 'Night'},
  ];

  submitLineStatus(): void {
    this.lineStatusInstance.comment = this.comment;
    this.lineStatusInstance.status = this.status;
    this.lineStatusInstance.date = this.date;
    this.lineStatusInstance.shift = this.shift;

    this.lineStatusArray.push(this.lineStatusInstance);
    this.lineStatusInstance = {comment: '', status: '', date: '', shift: ''};
    this.lineStatusForm.reset();
  }


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getUsers()
      .subscribe(users => {
        this.users = users;
        console.log(this.users)
      });
  }

}
