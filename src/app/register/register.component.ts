import { Component, OnInit } from '@angular/core';
import { BackendService } from '../_services/backend.service';
import { AuthService } from '../_services/auth.service';
import { PageStyleService } from '../_services/page-style.service';
import { User } from '../_models/user.model';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CountdownPipe } from '../_pipes/countdown.pipe';

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
    year: new FormControl('', [Validators.required, isIntegerValidator]),
    branch: new FormControl('', [Validators.required, containsNumberValidator]),
    bio: new FormControl(''),
    domainForm: new FormGroup({
      domains: new FormControl([])
    })
  });

  constructor(private backendService: BackendService, private router: Router, private authService: AuthService, private pageStyleService: PageStyleService) {
    this.pageStyleService.newEvent('home');
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
  }

  onSubmit() {
    console.log(this.profileForm.value.domainForm.domains);
    delete this.profileForm.value.domainForm;
    this.backendService.patchUser(this.profileForm.value).subscribe((user: User)=>{
      this.user = user;
      this.router.navigate(["/profile"]);
    })
  }

}

export function isIntegerValidator(control: AbstractControl) : {[key : string]: boolean} | null {
  if(control.value !== undefined && isNaN(control.value)) {
    return {'nonNum': true};
  }
  return null;
}

export function containsNumberValidator(control: AbstractControl) : {[key : string]: boolean} | null {
  let str = String(control.value);

  if(/\d/.test(str))
  {
    return {'num': true};
  }
  return null;
}
