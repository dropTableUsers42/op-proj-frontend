import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../_models/user.model';
import { AuthService } from '../_services/auth.service';
import { BackendService } from '../_services/backend.service';

@Component({
  selector: 'app-follow-overlay',
  templateUrl: './follow-overlay.component.html',
  styleUrls: ['./follow-overlay.component.scss']
})
export class FollowOverlayComponent implements OnInit {

  @Input('show') show: boolean = false;

  @Input('title') title: string = '';

  @Input('users') user_list: User[] = [];

  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

  constructor(private authService: AuthService, private backendService: BackendService) { }

  ngOnInit(): void {
  }

  public close() {
    this.onClose.emit();
  }

  stopPropagate(event) {
    event.stopPropagation();
  }

  followed_class(user : User) {
    user.isFollowed = false;
    for(let user1 of this.authService.currentUserValue.following)
    {
      if(user1.username == user.username)
      {
        user.isFollowed = true;
        break;
      }
    }
    return {
      "follow-button": true,
      "followed": user.isFollowed,
      "unfollowed": !user.isFollowed,
    }
  }

  show_followed(user: User) {
    if(user.username == this.authService.currentUserValue.username)
    {
      return false;
    }
    return true;
  }

  follow_string(user) {
    return user.isFollowed ? 'Following' : 'Follow';
  }

  onFollowClick(user : User) {
    if(user.isFollowed)
    {
      this.backendService.unfollow(user.username).subscribe(fl => {
        let currentUser = this.authService.currentUserValue;
        currentUser.following = fl;
        this.authService.updateUser(currentUser);
      })
    }
    else
    {
      this.backendService.follow(user.username).subscribe(fl => {
        let currentUser = this.authService.currentUserValue;
        currentUser.following = fl;
        this.authService.updateUser(currentUser);
      })
    }
  }

}
