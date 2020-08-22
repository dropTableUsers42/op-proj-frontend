import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

  title = 'THE OPPORTUNITY PROJECT.';
  login = 'LOGIN WITH YOUR COLLEGE ID';
  otp_login = 'ENTER YOUR USERNAME TO RECEIVE OTP';
  token_login = 'ENTER YOUR TOKEN TO LOGIN';
  logo = "LOGO";

  login_id;
  login_otp;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  signInToken(form) {
    this.authService.login(form.value.tokenid, form.value.token).subscribe(
      user => {
        console.log(this.authService.currentUserValue);
        this.router.navigate(['/profile']);
      }
    )
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

  sendOtp(form) {
    this.authService.sendOtp(form.value.otpid).subscribe(
      user => {
        console.log("Otp Sent!");
      }
    );
  }

}
