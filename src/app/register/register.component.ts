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

  domain_prefs_api = {
    'Core': 'core',
    'IT': 'it',
    'Consulting': 'consult',
    'Entrepreneurship': 'ent',
    'Finance': 'fin',
    'SocDev-and-Policy': 'socdev',
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
    let domain_prefs = [];
    for(let domain in this.user.domains)
    {
      if(this.user.domains[domain])
        domain_prefs.push(this.domain_prefs_api[domain]);
    }
    this.profileForm.patchValue({
      domainForm: {domains: domain_prefs}
    })
  }

  onSubmit() {
    let domainBody = this.domain_prefs_api;
    for(let domain in this.domain_prefs_api)
    {
      if(this.profileForm.value.domainForm.domains.includes(this.domain_prefs_api[domain]))
      {
        domainBody[domain] = true;
      }
      else
      {
        domainBody[domain] = false;
      }
    }
    delete this.profileForm.value.domainForm;
    this.backendService.patchUser(this.profileForm.value).subscribe((user: User)=>{
      this.user = user;
      this.backendService.addDomainPref(domainBody).subscribe((user: User) => {
        this.user = user;
        this.router.navigate(["/profile"]);
      })
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
