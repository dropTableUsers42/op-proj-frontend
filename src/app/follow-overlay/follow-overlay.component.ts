import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../_models/user.model';

@Component({
  selector: 'app-follow-overlay',
  templateUrl: './follow-overlay.component.html',
  styleUrls: ['./follow-overlay.component.css']
})
export class FollowOverlayComponent implements OnInit {

  @Input('show') show: boolean = false;

  @Input('title') title: string = '';

  @Input('users') user_list: User[] = [];

  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  public close() {
    console.log(this.user_list);
    this.onClose.emit();
  }

  stopPropagate(event) {
    event.stopPropagation();
  }

}
