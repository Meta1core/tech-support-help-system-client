import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CustomSnackBar } from '../customSnackBar';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  durationInSeconds = 5000;
  constructor(private authService: AuthenticationService, private router: Router, private _snackBar: CustomSnackBar) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserAuthenticated()) {
      return true;
    }
    this._snackBar.openSnackBar("Your authorized session is no longer active", "Ok");
    this.router.navigate(['/login-page']);
    return false;
  }
}
