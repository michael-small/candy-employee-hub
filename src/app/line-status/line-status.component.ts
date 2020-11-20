import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms"

interface LineStatus {
  value: string;
  viewValue: string;
}
interface Shifts {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-line-status',
  templateUrl: './line-status.component.html',
  styleUrls: ['./line-status.component.scss']
})
export class LineStatusComponent implements OnInit {

  line: LineStatus[] = [
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

  comment = '';
  status: null;
  date = "";
  shift: null;

  today: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
