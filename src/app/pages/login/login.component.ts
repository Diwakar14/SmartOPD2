import { Login } from './../../models/login.model';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import Notiflix from "notiflix";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  login: Login = new Login();
  otpSend = false;
  submit = false;
  checking = false;
  forgotPassPanel: boolean = false;
  requestotpPanel = false;
  newPassPanel = false;
  verifyOtpPanel = false;

  constructor(
    private cookie: CookieService,
    private authService: AuthService,
    private router: Router) {
  }


  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    let userLoginStatus = localStorage.getItem('isUser');
    let userToken = this.cookie.get('auth_token');
    if (userToken && parseInt(userLoginStatus) == 1) {
      this.router.navigateByUrl('/dashboard/home');
    }
  }

  loginWithPhone(f: NgForm) {
    this.checking = true;
    this.authService.login(this.login).subscribe(
      (res: any) => {
        this.otpSend = true;
        this.checking = false;
      },
      err => {
        Notiflix.Notify.Failure(err.error.message);
        this.checking = false;
      }
    )
  }

  // structural function...
  forgortPass() {
    this.forgotPassPanel = true;
  }


  requestOTP() {
    this.requestotpPanel = true;
  }
  verifyOtp() {
    this.verifyOtpPanel = true;
  }

  new_password() {
    this.newPassPanel = true;
  }

  loginWithEmail(f: NgForm) {
    this.submit = true;
    this.authService.loginWithEmail(this.login).subscribe(
      (res: any) => {
        this.submit = false;
        let auth_token = res.headers.get('authorization');
        let expire = res.headers.get('expires');

        var now = new Date();
        var time = now.getTime();
        var expireTime = time + (parseInt(expire) * 1000);
        now.setTime(expireTime);

        if (this.cookie.check('auth_token')) {
          this.cookie.deleteAll();
        }

        this.cookie.set('auth_token', auth_token, now);
        localStorage.setItem('isUser', '1');
        Notiflix.Notify.Success("Logged in successfully.");
        this.router.navigate(['/dashboard/home']);
      },
      err => {
        Notiflix.Notify.Failure("Login failed.");
        this.submit = false;
        f.reset();
      }
    )
  }

}
