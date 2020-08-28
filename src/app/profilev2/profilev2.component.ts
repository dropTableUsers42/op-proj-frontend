import { Component, OnInit } from '@angular/core';
import { BackendService } from '../_services/backend.service';
import { AuthService } from '../_services/auth.service';
import { PageStyleService } from '../_services/page-style.service';
import { User } from '../_models/user.model';
import { Opps } from '../_models/opps.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profilev2',
  templateUrl: './profilev2.component.html',
  styleUrls: ['./profilev2.component.css']
})
export class Profilev2Component implements OnInit {

  ops = "chjbkdsghbvksdcnbadvjkdnvkjdnvjkacklamlkacklamlkacklamlklamlkbgklamlkacklamlklamlkvlklamlkvggamlkvlklamlkvdddgdfg";

  user: User;

  wishlist: Opps[];

  followed = true;

  get isFollowed() {
    for(var user of this.user.followers)
    {
      if(user.username == this.authService.currentUserValue.username)
      {
        return true;
      }
    }
    return false;
  }

  get follow_string() {
    return this.followed ? 'Following' : 'Follow';
  }

  get followed_class() {
    return {
      "follow-button": true,
      "followed": this.followed,
      "unfollowed": !this.followed,
    }
  }

  constructor(private backendService: BackendService, private actRoute: ActivatedRoute, private router: Router, private authService: AuthService, private pageStyleService: PageStyleService) {
  }

  ngOnInit(): void {
    this.actRoute.params.subscribe(val => {
      if(val.slug == this.authService.currentUserValue.username)
      {
        this.router.navigate(['profile']);
      }
      this.backendService.getUser(val.slug).subscribe(user => {
        this.user = user;
        this.followed = this.isFollowed;
        this.wishlist = user['wishlist']['opportunities'];
      });
    });
    this.pageStyleService.newEvent('home');
  }

  logout()
  {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onFollowClick() {
    if(this.followed)
    {
      this.backendService.unfollow(this.user.username).subscribe(ret =>
        {
          this.user.followers = this.user.followers.filter(item => {
            item.username != this.authService.currentUserValue.username;
          });
        });
    }
    else
    {
      this.backendService.follow(this.user.username).subscribe(ret =>
        {
          this.user.followers.push(this.authService.currentUserValue);
        });
    }
    this.followed = this.followed ? false : true;
  }

}
