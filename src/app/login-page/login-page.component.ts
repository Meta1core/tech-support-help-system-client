import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { UserLoginDto } from '../_interfaces/UserLoginDto';
import { LoginResponseDto } from '../_interfaces/LoginResponseDto';
import { CustomSnackBar } from '../CustomSnackBar';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  private returnUrl: string = "";
  showError: boolean = false;
  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });
  errorMessage: string = '';

  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute, private _snackBar: CustomSnackBar) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/main';
  }

  loginUser = (loginFormValue: any) => {
    this.showError = false;
    const login = { ...loginFormValue };
    const userForAuth: UserLoginDto = {
      username: login.username,
      password: login.password
    }

    this.authService.loginUser('http://10.190.100.102:8080/Authentication',userForAuth)
      .subscribe({
        next: (res: LoginResponseDto) => {
          localStorage.setItem("token", res.token);
          this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
          this.router.navigate([this.returnUrl]);
          this._snackBar.openSnackBar("You successfully logged in!", "Ok");
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.errorMessage = err.error.errorMessage;
          this.showError = true;
        }
      })
  }
}
