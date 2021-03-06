import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../_models/user.model';
import { AuthService } from '../_services/auth.service';
import { BackendService } from '../_services/backend.service';
import { getUrl } from '../register/dp-overlay/dp-overlay.component';

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

  getDpUrls(user: any) {
    if(user.picture)
    {
      return  getUrl(parseInt(user.picture.style), user.picture.colour);;
    }
    return '/assets/images/placeholder.jpg';
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
      let currentUser = this.authService.currentUserValue;
      let idx = currentUser.following.findIndex(usr => usr.username == user.username);
      if(idx > -1)
      {
        currentUser.following.splice(idx, 1);
      }
      this.authService.updateUser(currentUser);
      this.backendService.unfollow(user.username).subscribe(fl => {
      })
    }
    else
    {
      let currentUser = this.authService.currentUserValue;
      currentUser.following.push(user);
      this.authService.updateUser(currentUser);
      this.backendService.follow(user.username).subscribe(fl => {
        console.log("Followed");
      })
    }
  }

}
