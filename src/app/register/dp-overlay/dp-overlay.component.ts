import { getUrlScheme } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from '../../_services/backend.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-dp-overlay',
  templateUrl: './dp-overlay.component.html',
  styleUrls: ['./dp-overlay.component.scss']
})
export class DpOverlayComponent implements OnInit {

  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();

  @Input() show = false;

  selectedImage: number;
  selectedColor: string;

  spin = false;

  colorOrder = [
    'Brown',
    'Light-Brown',
    'Dark-White',
    'Blue',
    'Green',
    'Purple'
  ]

  constructor(private backendService: BackendService, private authService: AuthService) { }

  ngOnInit(): void {
    let user = this.authService.currentUserValue;

    this.selectedImage = user.picture.style;

    let re = /\s/gi;
    let color = user.picture.colour.replace(re, "-");

    this.selectedColor = color;
  }

  stopPropagate(event): void {
    event.stopPropagation();
  }

  public close(): void {
    this.onClose.emit();
  }

  get dpUrls(): {} {
    return dpUrls;
  }

  select(key: number): void {
    this.selectedImage = key;
  }

  selectColor(key: string): void {
    this.selectedColor = key;
  }

  save(): void {

    let re = /-/gi;
    let color = this.selectedColor.replace(re, " ");

    this.spin = true;

    this.backendService.postAvatar(this.selectedImage, color).subscribe(user => {
      this.spin = false;
      this.onSave.emit(user.picture);
      this.close();
    });
  }

}

export function getUrl(style: number, colour: string): string
{
  if(style < 1 || style > 6)
  {
    return '/assets/images/placeholder.jpg';
  }

  let re = /\s/gi;
  let color = colour.replace(re, "-");

  if (!(color in dpUrls))
  {
    return '/assets/images/placeholder.jpg';
  }

  let typeKey = dpUrls[color];
  for (let type of typeKey)
  {
    if(type.key == style)
    {
      return type.url;
    }
  }
  return '/assets/images/placeholder.jpg';
}

export const dpUrls = {
    'Brown': [
      {key: 1, url: '/assets/images/Handz/Brown/1.png'},
      {key: 2, url: '/assets/images/Handz/Brown/2.png'},
      {key: 3, url: '/assets/images/Handz/Brown/3.png'},
      {key: 4, url: '/assets/images/Handz/Brown/4.png'},
      {key: 5, url: '/assets/images/Handz/Brown/5.png'},
      {key: 6, url: '/assets/images/Handz/Brown/6.png'},
    ],
    'Dark-White': [
      {key: 1, url: '/assets/images/Handz/Dark-White/1.png'},
      {key: 2, url: '/assets/images/Handz/Dark-White/2.png'},
      {key: 3, url: '/assets/images/Handz/Dark-White/3.png'},
      {key: 4, url: '/assets/images/Handz/Dark-White/4.png'},
      {key: 5, url: '/assets/images/Handz/Dark-White/5.png'},
      {key: 6, url: '/assets/images/Handz/Dark-White/6.png'},
    ],
    'Blue': [
      {key: 1, url: '/assets/images/Handz/Blue/1.png'},
      {key: 2, url: '/assets/images/Handz/Blue/2.png'},
      {key: 3, url: '/assets/images/Handz/Blue/3.png'},
      {key: 4, url: '/assets/images/Handz/Blue/4.png'},
      {key: 5, url: '/assets/images/Handz/Blue/5.png'},
      {key: 6, url: '/assets/images/Handz/Blue/6.png'},
    ],
    'Green': [
      {key: 1, url: '/assets/images/Handz/Green/1.png'},
      {key: 2, url: '/assets/images/Handz/Green/2.png'},
      {key: 3, url: '/assets/images/Handz/Green/3.png'},
      {key: 4, url: '/assets/images/Handz/Green/4.png'},
      {key: 5, url: '/assets/images/Handz/Green/5.png'},
      {key: 6, url: '/assets/images/Handz/Green/6.png'},
    ],
    'Light-Brown': [
      {key: 1, url: '/assets/images/Handz/Light-Brown/1.png'},
      {key: 2, url: '/assets/images/Handz/Light-Brown/2.png'},
      {key: 3, url: '/assets/images/Handz/Light-Brown/3.png'},
      {key: 4, url: '/assets/images/Handz/Light-Brown/4.png'},
      {key: 5, url: '/assets/images/Handz/Light-Brown/5.png'},
      {key: 6, url: '/assets/images/Handz/Light-Brown/6.png'},
    ],
    'Purple': [
      {key: 1, url: '/assets/images/Handz/Purple/1.png'},
      {key: 2, url: '/assets/images/Handz/Purple/2.png'},
      {key: 3, url: '/assets/images/Handz/Purple/3.png'},
      {key: 4, url: '/assets/images/Handz/Purple/4.png'},
      {key: 5, url: '/assets/images/Handz/Purple/5.png'},
      {key: 6, url: '/assets/images/Handz/Purple/6.png'},
    ],
}
