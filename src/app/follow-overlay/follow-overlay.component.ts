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
    this.onClose.emit();
  }

  stopPropagate(event) {
    event.stopPropagation();
  }

  followed_class(user) {
    return {
      "follow-button": true,
      "followed": user.isFollowed,
      "unfollowed": !user.isFollowed,
    }
  }

  follow_string(user) {
    return user.isFollowed ? 'Following' : 'Follow';
  }

}
