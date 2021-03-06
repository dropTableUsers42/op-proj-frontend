import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  formState = 'enter-ref';

  referral_label = 'Sign Up';
  reg_label = 'Enter details';

  ref_invalid: boolean = false;
  otp_invalid: boolean = false;

  referralForm = new FormGroup({
    referral_code: new FormControl(''),
    referral_id: new FormControl('')
  });

  registerForm = new FormGroup({
    name: new FormControl(''),
    username: new FormControl('', Validators.pattern('^[a-zA-Z0-9][a-zA-Z0-9_]{1,18}[a-zA-Z0-9]$')),
    otp: new FormControl('')
  });

  showWaitlistForm = false;

  spin = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  sendRef() {
    this.spin = true;
    this.authService.sendRefOtp(this.referralForm.value['referral_id'], this.referralForm.value['referral_code']).subscribe(
      ret => {
        console.log('OTP Sent!');
        this.formState = 'enter-otp';
        this.spin = false;
      },
      error => {
        this.ref_invalid = true;
        console.log('Please check your Email ID or Referral Code!');
        this.spin = false;
      }
    );
  }

  signUp() {
    this.spin = true;
    this.authService.signUp(this.referralForm.value['referral_id'], 
                            this.referralForm.value['referral_code'],
                            this.registerForm.value['name'],
                            this.registerForm.value['username'],
                            this.registerForm.value['otp']).subscribe(user => {
      console.log('Signed in!');
      let reged = this.authService.currentUserValue.hasCompletedRegistration;
      this.spin = false;
      if(reged)
      {
        this.router.navigate(['/profile']);
      }
      else
      {
        this.router.navigate(['/register']);
      }
      
    },
    error => {
      console.log('Invalid OTP!');
      this.otp_invalid = true;
      this.spin = false;
    })
  }

  
  reEnter()
  {
    this.formState = 'enter-ref';
    this.ref_invalid = false;
    this.otp_invalid = false;
  }

  signin()
  {
    this.router.navigate(['login']);
  }

}
