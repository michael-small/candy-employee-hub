import { HttpClient } from '@angular/common/http';
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

  // TODO: There has to be a better way to do this, or at least a better area to put these fields.
  // TODO: DRY this up after demo phase.
  // I hate this as much as you do.
  private todayDate = new Date();
  private today = this.todayDate.toDateString();
  private tomorrow = new Date(this.todayDate.setDate(this.todayDate.getDate() + 1)).toDateString();
  private todayDate2 = new Date();
  private yesterday = new Date(this.todayDate.setDate(this.todayDate2.getDate() - 1)).toDateString();

  lineStatusArray: LineStatus[] = [
    {comment: '<DEMO NOTE: 12-1-2019. We need to discuss how to handle displaying years.>', status: 'Cleaning', date: 'Wed Dec 01 2019 00:00:00 GMT-0600 (Central Standard Time)', shift: 'Night'},
    {comment: '', status: 'Cleaning', date: this.yesterday, shift: 'Mid'},
    {comment: '', status: 'Cleaning', date: this.today, shift: 'Mid'},
    {comment: 'Active clogged up the mixer.', status: 'Cleaning', date: this.today, shift: 'Day'},
    {comment: 'Going good as of noon.', status: 'Trial', date: this.today, shift: 'Day'},
    {comment: '', status: 'Down', date: this.today, shift: 'Night'},
    {comment: 'Active is caked on hard. Will require caustic.', status: 'Cleaning', date: this.tomorrow, shift: 'Mid'},
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
    this.onCreateLineStatus(this.lineStatusInstance);
    // TODO: This `today` may be redundant, but I have a feeling that if I take this and the
    //   `today` in `ngOnInit()` into the general class that `today` wont register when it needs
    //   to in `ngOnInit()`. And I'm rusty on how to set fields in `ngOnInit()` publicly to the
    //   component and don't care to for the demo. Ironically, the time I spend making these comments
    //   could likely add up to time to quickly look at the docs about this. Oh well.
    //   In fact, I know I handled the `today` problem in a friend's project a couple weeks ago...
    //   If I haven't emphasized this enough by now, I don't do this garbage, non-DRY work outside
    //   of demos. It's less than 20 minutes before I have to leave for work. I hope that this BECOMES
    //   my work so that I can do it properly because I have the time.
    const today = new Date();
    today.setHours(0, 0 , 0, 0);
    this.lineStatusArray.push(this.lineStatusInstance);
    this.lineStatusArray.sort((a, b) => (new Date(b.date) as any) - (new Date(a.date) as any));

    // DRY after demo, with async in mind
    if(Date.parse(this.lineStatusInstance.date) > today.getTime()) {
      this.futureStatuses.push(this.lineStatusInstance);
      this.futureStatuses.sort((a, b) => (new Date(b.date) as any) - (new Date(a.date) as any));
    } else if (Date.parse(this.lineStatusInstance.date) < today.getTime()) {
      this.archivedStatuses.push(this.lineStatusInstance);
      this.archivedStatuses.sort((a, b) => (new Date(b.date) as any) - (new Date(a.date) as any));
    } else if (Date.parse(this.lineStatusInstance.date).valueOf() === today.getTime().valueOf()) {
      this.todaysStatuses.push(this.lineStatusInstance);
      this.todaysStatuses.sort((a, b) => (new Date(b.date) as any) - (new Date(a.date) as any));
    }
    this.lineStatusInstance = {comment: '', status: '', date: '', shift: ''};
    this.lineStatusForm.reset();
  }

  onCreateLineStatus(lineStatus: LineStatus) {
    // Send Http request
    this.http.post('https://candyemployeehub-default-rtdb.firebaseio.com/statuses.json', lineStatus)
      .subscribe(responseData => {
        //responseData is just the body
        console.log(responseData);
      });
  }

  // If a click listener for statuses is needed, "on" is the proper prefix for these methods.
  onFetchStatuses() {
    this.fetchStatuses();
  }

  private fetchStatuses() {
    this.http.get('https://candyemployeehub-default-rtdb.firebaseio.com/statuses.json').subscribe(
      statuses => {
        console.log(statuses)
      }
    );
  }


  constructor(private authService: AuthService, private http: HttpClient) {
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

    this.fetchStatuses();
  }

}
