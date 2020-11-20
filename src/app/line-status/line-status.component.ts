import { Component, OnInit } from '@angular/core';

interface LineStatus {
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

  today: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
