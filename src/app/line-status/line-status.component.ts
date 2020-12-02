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

  public archivedStatuses: LineStatus[];
  public futureStatuses: LineStatus[];
  public todaysStatuses: LineStatus[];

  public users: User[];

  lineStatusForm = new FormGroup({
    date: new FormControl(),
    shift: new FormControl(),
    comment: new FormControl(),
    status: new FormControl(),
  });

  lineStatusArray: LineStatus[] = [
    {comment: '', status: 'Cleaning', date: 'Wed Nov 01 2020 00:00:00 GMT-0600 (Central Standard Time)', shift: 'Day'},
    {comment: '', status: 'Cleaning', date: 'Wed Nov 02 2020 00:00:00 GMT-0600 (Central Standard Time)', shift: 'Mid'},
    {comment: '<DEMO NOTE: 12-1-2019. We need to discuss how to handle displaying years.>', status: 'Cleaning', date: 'Wed Dec 01 2019 00:00:00 GMT-0600 (Central Standard Time)', shift: 'Night'},
    {comment: '', status: 'Cleaning', date: new Date().toDateString(), shift: 'Mid'},
    {comment: 'Active clogged up the mixer.', status: 'Cleaning', date: new Date().toDateString(), shift: 'Day'},
    {comment: 'Going good as of noon.', status: 'Trial', date: new Date().toDateString(), shift: 'Day'},
    {comment: '', status: 'Down', date: new Date().toDateString(), shift: 'Night'},
    {comment: 'Active is caked on hard. Will require caustic.', status: 'Cleaning', date: 'Wed Dec 09 2020 00:00:00 GMT-0600 (Central Standard Time)', shift: 'Mid'},
    {comment: '<DEMO NOTE: 12-2-2025. We need to discuss how to handle displaying years.>', status: 'Cleaning', date: 'Wed Dec 02 2025 00:00:00 GMT-0600 (Central Standard Time)', shift: 'Night'},
  ];

  lineStatusInstance: LineStatus = ({comment: '', status: '', date: '', shift: ''});

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
    this.lineStatusArray.push(this.lineStatusInstance);
    this.lineStatusArray.sort((a, b) => (new Date(b.date) as any) - (new Date(a.date) as any));
    this.lineStatusInstance = {comment: '', status: '', date: '', shift: ''};
    this.lineStatusForm.reset();
  }


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {

    // for splitting the archived line statuses into past/present/future
    const today = new Date();
    today.setHours(0, 0 , 0, 0);

    this.archivedStatuses = this.lineStatusArray.filter(status => Date.parse(status.date) < today.getTime());
    this.futureStatuses = this.lineStatusArray.filter(status => Date.parse(status.date) > today.getTime());
    this.todaysStatuses = this.lineStatusArray.filter(status => Date.parse(status.date).valueOf() === today.getTime().valueOf());

    this.authService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }

}
