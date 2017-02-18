import {
  Component,
  OnInit,
  trigger,
  state,
  style,
  transition,
  animate } from '@angular/core';
import { PicturesService } from '../../services';

export interface Picture {
  width: number;
  height: number;
  url: string;
}

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss'],
  animations: [
    trigger('fadeUp', [
      state('1', style({
        display: 'block',
        opacity: '1'
      })),
      state('0', style({
        display: 'none',
        opacity: '0',
      })),
      transition('1 <=> 0', animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
    trigger('scale', [
      state('1', style({
        transform: 'scale(1) translate(-50%, -50%)',
      })),
      state('0', style({
        transform: 'scale(0.5) translate(-50%, -50%)'
      })),
      transition('1 <=> 0', animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class PicturesComponent implements OnInit {
  largePictureUrl: string;
  showLargePicture = 0;
  pictures: Picture[] = [];

  constructor(private picturesService: PicturesService) { }

  ngOnInit() {
    this.picturesService.getPhotos().then(snapshot => {
      let val = snapshot.val();
      for (let key of Object.keys(val)) {
        let url = val[key];
        this.pictures.push(this.createNewPictureFromUrl(url));
      }
    });
  }

  createNewPictureFromUrl(url: string): Picture {
    const ratio = this.createRandomNumber();
    return {
      width: ratio,
      height: ratio,
      url: url
    };
  }

  createRandomNumber(maxValue?: number): number {
    const defaultvalue = 1;
    if (!maxValue) {
      maxValue = defaultvalue;
    }

    const value = Math.round((Math.random() * maxValue));
    if (value === 0) {
      return 1;
    }

    return value;
  }

  imageClicked(url: string) {
    this.largePictureUrl = url;

    if (this.largePictureUrl) {
      this.showLargePicture = 1;
    } else {
      this.showLargePicture = 0;
    }
  }
}
