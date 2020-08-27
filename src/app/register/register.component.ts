import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendService } from '../_services/backend.service';
import { AuthService } from '../_services/auth.service';
import { PageStyleService } from '../_services/page-style.service';
import { User } from '../_models/user.model';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  ops = "chjbkdsghbvksdcnbadvjkdnvkjdnvjkacklamlkacklamlkacklamlklamlkbgklamlkacklamlklamlkvlklamlkvggamlkvlklamlkvdddgdfg";

  user: User;

  profileForm  = new FormGroup({
    name: new FormControl('', Validators.required),
    year: new FormControl('', [Validators.required]),
    branch: new FormControl('', Validators.required),
    bio: new FormControl(''),
  });

  constructor(private backendService: BackendService, private router: Router, private authService: AuthService, private pageStyleService: PageStyleService) {
  }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.profileForm.patchValue({
      name: this.user.name,
      college: this.user.college,
      year: this.user.year,
      branch: this.user.branch,
      bio: this.user.bio,
    });
    this.pageStyleService.newEvent('home');
  }

  onSubmit() {
    this.backendService.patchUser(this.profileForm.value).subscribe((user: User)=>{
      this.user = user;
      this.router.navigate(["/profile"]);
    })
  }


}

export const isIntegerValidator = function(control: AbstractControl) : ValidationErrors | null {
    const error: ValidationErrors = {integer: true};
    if(control.value && control.value !== '${parseInt(control.value, 10)}') {
      control.setErrors(error);
      return error;
    }

    control.setErrors(null);
    return null;
}
