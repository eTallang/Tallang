import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent implements OnInit {
  title: string = 'Other';
  subtitle: string = 'files';

  constructor() { }

  ngOnInit() {
  }

}
