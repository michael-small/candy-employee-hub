import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  supervisors: any[] = [
    {
      "name": "Doug Dayshift",
      "outside_line": "218-346-8001",
      "internal_ext": "2001",
      "img": "https://cdn.pixabay.com/photo/2015/01/22/15/13/businessman-607834_960_720.png"
    },
    {
      "name": "Mary Midshift",
      "outside_line": "218-346-8002",
      "internal_ext": "2002",
      "img": "https://cdn.pixabay.com/photo/2014/05/31/23/16/teacher-359311_960_720.png"
    },
    {
      "name": "Nate Nightshift",
      "outside_line": "218-346-8003",
      "internal_ext": "2003",
      "img": "https://cdn.pixabay.com/photo/2015/01/22/15/13/businessman-607834_960_720.png"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
