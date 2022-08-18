import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  durationInSeconds = 5000;
  constructor(private authService: AuthenticationService, private router: Router, private _snackBar: MatSnackBar) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserAuthenticated()) {
      return true;
    }

    this.router.navigate(['/login-page']);
    this.openSnackBar("Your authorized session is no longer active", "Ok");
    return false;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: this.durationInSeconds });
  }

}
