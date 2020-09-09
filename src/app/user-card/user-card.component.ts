import { Component, OnInit, Input } from '@angular/core';
import { User } from '../_models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { BackendService } from '../_services/backend.service';
import { ToNthPipe } from '../_pipes/to-nth.pipe'

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss',
            './user-card-colors.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input('user') public user: User;

  constructor(private router: Router, private authService: AuthService, private backendService: BackendService) {
  }

  domain_prefs_api = {
    'Core': 'core',
    'IT': 'it',
    'Consulting': 'consult',
    'Entrepreneurship': 'ent',
    'Finance': 'fin',
    'SocDev-and-Policy': 'socdev',
  }

  domain_prefs_list = {
    'core': 'Core',
    'it': 'IT',
    'consult': 'Consulting',
    'ent': 'Entrepreneurship',
    'fin': 'Finance',
    'socdev': 'Socdev & Policy'
  };

  domain_prefs = [
    'core',
    'it',
    'consult',
    'ent',
    'fin',
    'socdev'
  ]

  ngOnInit(): void {
    this.domain_prefs = [];
    for(let domain in this.user.domains)
    {
      if(this.user.domains[domain])
        this.domain_prefs.push(this.domain_prefs_api[domain]);
    }
  }

  get follow_hidden() {
    return this.authService.currentUserValue.username != this.user.username;
  }

  get followed_class() {
    return {
      "follow-button": true,
      "followed": this.user.isFollowed,
      "unfollowed": !this.user.isFollowed,
    }
  }

  get follow_string() {
    return this.user.isFollowed ? 'Following' : 'Follow';
  }

  onFollowClick(event) {
    event.preventDefault();
    event.stopPropagation();
    if(this.user.isFollowed)
    {
      this.backendService.unfollow(this.user.username).subscribe(ret =>
        {
        });
    }
    else
    {
      this.backendService.follow(this.user.username).subscribe(ret =>
        {
        });
    }
    this.user.isFollowed = this.user.isFollowed ? false : true;
  }

  onProfileClick() {
    this.router.navigate(['profilev2', this.user.username]);

  }

}
