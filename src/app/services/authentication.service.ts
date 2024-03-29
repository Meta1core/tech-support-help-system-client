import { Inject, Injectable } from '@angular/core';
import { UserLoginDto } from '../_interfaces/userLoginDto';
import { catchError } from 'rxjs/operators';
import {HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponseDto } from '../_interfaces/loginResponseDto';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackBar } from '../customSnackBar';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authChangeSub = new BehaviorSubject(false);
  public authChanged = this.authChangeSub.asObservable();
  


  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, @Inject(CustomSnackBar) private _snackBar: CustomSnackBar) { }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }

  public loginUser = (route: string, body: UserLoginDto) => {
    return this.http.post<LoginResponseDto>(route, body);
  }

  public logout = () => {
    localStorage.clear();
    this.sendAuthStateChangeNotification(false);
    this.router.navigate(['/login-page']);
    this._snackBar.openSnackBar("You successfully logged out!", "Ok");
  }

  public isUserAuthenticated = (): boolean => {
    let currentToken: string;
    currentToken = (localStorage.getItem("token")!);
    return !this.jwtHelper.isTokenExpired(currentToken);
  }
}
