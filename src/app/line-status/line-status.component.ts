import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from "@angular/forms"
import { AuthService } from '../auth/auth.service';
import { User } from '../models/User';
import { map } from 'rxjs/operators';

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
  id?: string;
}

@Component({
  selector: 'app-line-status',
  templateUrl: './line-status.component.html',
  styleUrls: ['./line-status.component.scss']
})
export class LineStatusComponent implements OnInit {

  public archivedStatuses: LineStatus[] = [];
  public futureStatuses: LineStatus[] = [];
  public todaysStatuses: LineStatus[] = [];

  public users: User[];

  lineStatusForm = new FormGroup({
    date: new FormControl(),
    shift: new FormControl(),
    comment: new FormControl(),
    status: new FormControl(),
  });

  lineStatusArray: LineStatus[] = [];

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
    this.http.post<{name: string}>('https://candyemployeehub-default-rtdb.firebaseio.com/statuses.json', lineStatus)
      .subscribe(responseData => {
      });
  }

  // If a click listener for statuses is needed, "on" is the proper prefix for these methods.
  onFetchStatuses() {
    this.fetchStatuses();
  }

  private fetchStatuses() {
    this.http
    .get<{ [key: string]: LineStatus }>('https://candyemployeehub-default-rtdb.firebaseio.com/statuses.json')
    .pipe(
      map(responseData => {
        // Converts JSON object from Firebase to LineStatus[]
        const statusesArray: LineStatus[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            statusesArray.push({...responseData[key], id: key});
          }
        }
        return statusesArray;
    }))
    .subscribe(
      statuses => {
        this.lineStatusArray = statuses;

        // Ensures that the demo always has a yesterday/today/tomorrow
        // TODO: DRY this up. I hate this as much as you do.
        // TODO: Remove these dates and `staticStatuses` when the demo phase is over
        let todayDate = new Date();
        let todayString = todayDate.toDateString();
        let tomorrow = new Date(todayDate.setDate(todayDate.getDate() + 1)).toDateString();
        let todayDate2 = new Date();
        let yesterday = new Date(todayDate.setDate(todayDate2.getDate() - 1)).toDateString();
        let staticStatuses: LineStatus[] = [
          {comment: 'Preparing new batch', status: 'Cleaning', date: yesterday, shift: 'Mid'},
          {comment: 'Cooking with a slow active', status: 'Production', date: todayString, shift: 'Mid'},
          {comment: 'Active is caked on hard. Will require caustic.', status: 'Cleaning', date: tomorrow, shift: 'Mid'},
        ]

        // Adds those always current yesterday/today/tomorrow items to the Firebase items
        staticStatuses.map(status => {
          return {
            comment: status.comment,
            status: status.status,
            date: status.date,
            shift: status.shift,
          }
        }).forEach(status => this.lineStatusArray.push(status));

        // This is duplicated despite `todayDate` existing because manipulations up there alters `todayDate`
        // TODO: Learn the proper way to set dates such that this and code up there doesn't need to be duplicated
        const today = new Date();
        today.setHours(0, 0 , 0, 0);

        this.archivedStatuses = this.lineStatusArray.filter(status => Date.parse(status.date) < today.getTime());
        this.futureStatuses = this.lineStatusArray.filter(status => Date.parse(status.date) > today.getTime());
        this.todaysStatuses = this.lineStatusArray.filter(status => Date.parse(status.date).valueOf() === today.getTime().valueOf());
      }
    );
  }


  constructor(private authService: AuthService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.fetchStatuses();
  }

}
