import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MoviesService } from './service/movies.service';
import { Movie } from './movie';

@Component({
  selector: 'tallang-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  @ViewChild('movieFrame') movieFrame: ElementRef<HTMLIFrameElement>;
  movies: Movie[] = [];
  selectedMovie: Movie;
  youtubeUrlRoot = 'https://www.youtube.com/embed/';

  constructor(private moviesService: MoviesService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.moviesService.getYoutubeVideos()
    .subscribe(movies => {
      movies.forEach(movie => this.sanitize(movie));
      this.movies = movies;
      this.selectedMovie = movies[0];
    });
  }

  sanitize(movie: Movie) {
    const fullUrl = `${this.youtubeUrlRoot}${movie.resourceId.videoId}`;
    movie.url = this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
  }

  setSelectedMovie(selectedMovie: Movie): void {
    this.selectedMovie = selectedMovie;
    setTimeout(() => {
      this.movieFrame.nativeElement.scrollIntoView({behavior: 'smooth', block: 'center'});
    }, 100);
  }
}
