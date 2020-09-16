import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dp-overlay',
  templateUrl: './dp-overlay.component.html',
  styleUrls: ['./dp-overlay.component.scss']
})
export class DpOverlayComponent implements OnInit {

  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

  @Input() show = false;

  selectedImage: number;
  selectedColor: string;

  constructor() { }

  ngOnInit(): void {
    this.selectedImage = 2;
    this.selectedColor = 'Blue';
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
    this.close();
  }

}

export const dpUrls = {
    'Blue': [
      {key: 1, url: '/assets/images/Handz/Blue/1.png'},
      {key: 2, url: '/assets/images/Handz/Blue/2.png'},
      {key: 3, url: '/assets/images/Handz/Blue/3.png'},
      {key: 4, url: '/assets/images/Handz/Blue/4.png'},
      {key: 5, url: '/assets/images/Handz/Blue/5.png'},
      {key: 6, url: '/assets/images/Handz/Blue/6.png'},
    ],
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
