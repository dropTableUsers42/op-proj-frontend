import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  otp_login = 'Login';

  get otp_login_text() {
    if(this.formState == 'send-otp')
    {
      return this.otp_login;
    }
    else if(this.formState == 'enter-otp')
    {
      return "Enter OTP received on ";
    }
  }

  otpForm = new FormGroup({
    login_id: new FormControl(''),
    login_otp: new FormControl(''),
  });

  formState = 'send-otp';
  otp_valid: boolean = true;
  id_valid: boolean = true;
  otp_sent: boolean = false;
  otp_resent: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  signInOtp(form) {
    this.authService.loginOtp(form.value.loginid, parseInt(form.value.otp)).subscribe(
      user => {
        let reged = this.authService.currentUserValue.hasCompletedRegistration;
        if(reged)
        {
          this.router.navigate(['/profile']);
        }
        else
        {
          this.router.navigate(['/register']);
        }
      }
    )
  }

  handleOtpSubmit() {
    if(this.formState == 'send-otp')
    {  
      this.authService.sendOtp(this.otpForm.value.login_id).subscribe(
        user => {
          this.formState = 'enter-otp';
          this.id_valid = true;
          this.otp_sent = true;
          this.otp_valid = true;
          this.otp_resent = false;
        },
        error => {
          this.id_valid = false;
          this.otp_sent = false;
          this.otp_valid = true;
          this.otp_resent = false;
        }
      );
    }
    else if(this.formState == 'enter-otp')
    {
      console.log(this.otpForm.value.login_id);
      this.authService.loginOtp(this.otpForm.value['login_id'], parseInt(this.otpForm.value['login_otp'])).subscribe(
        user => {
          let reged = this.authService.currentUserValue.hasCompletedRegistration;
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
          console.log("Incorrect OTP");
          this.id_valid = true;
          this.otp_sent = false;
          this.otp_valid = false;
          this.otp_resent = false;
        },
      )
    }
  }

  resendOtp() {
    if(this.formState == 'enter-otp')
    {
      this.authService.sendOtp(this.otpForm.value.login_id).subscribe(
        user => {
          this.formState = 'enter-otp';
          this.id_valid = true;
          this.otp_sent = false;
          this.otp_valid = true;
          this.otp_resent = true;
        },
        error => {
          this.id_valid = false;
          this.otp_sent = false;
          this.otp_valid = true;
          this.otp_resent = false;
        }
      );
    }
  }

  changeId() {
    if(this.formState == 'enter-otp')
    {
      this.formState = 'send-otp';
      this.id_valid = true;
      this.otp_sent = false;
      this.otp_valid = true;
      this.otp_resent = false;
    }
  }

  signup()
  {
    this.router.navigate(['signup']);
  }

}
