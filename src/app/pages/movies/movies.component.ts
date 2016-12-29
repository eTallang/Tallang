import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  title: string = 'Movies';
  subtitle: string = 'all home made';

  constructor() { }

  ngOnInit() {
  }

}
