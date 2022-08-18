import { Injectable } from '@angular/core';
import { UserLoginDto } from '../_interfaces/UserLoginDto';
import { catchError } from 'rxjs/operators';
import {HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponseDto } from '../_interfaces/LoginResponseDto';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackBar } from '../CustomSnackBar';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authChangeSub = new BehaviorSubject(false);
  public authChanged = this.authChangeSub.asObservable();
  


  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private _snackBar: CustomSnackBar) { }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }

  public loginUser = (route: string, body: UserLoginDto) => {
    return this.http.post<LoginResponseDto>(route, body);
  }

  public logout = () => {
    window.location.reload();
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
    this._snackBar.openSnackBar("You successfully logged out!", "Ok");
  }

  public isUserAuthenticated = (): boolean => {
    let currentToken: string;
    currentToken = (localStorage.getItem("token")!);
    return !this.jwtHelper.isTokenExpired(currentToken);
  }
}
