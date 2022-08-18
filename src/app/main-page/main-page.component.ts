import { OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { Client } from '../_interfaces/Client';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackBar } from '../CustomSnackBar';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;
  showFiller = false;
  searchPrefix = "";
  imageUrl: any;

  public isUserAuthenticated: boolean = false;
  public isAny: any;
  

  constructor(private authService: AuthenticationService, private router: Router, private clientService: ClientService, private _snackBar: CustomSnackBar) {
  }

  ngOnInit(): void {
    this.authService.authChanged
      .subscribe(res => {
        this.isUserAuthenticated = res;
      });
    this.GetLogo();
  }

  public isClientLoaded(): boolean {
    if (localStorage.getItem("client_id")) {
      return true;
    }
    else {
      return false;
    }
  }

  public GetLogo(): any{
    this.imageUrl = localStorage.getItem("logoUrl");
  }

  public GetClient() {
    this.clientService.getClientByPrefix('https://localhost:44365/Clients/' + this.searchPrefix)
      .subscribe({
        next: (res: Client) => {
          if (res) {
            console.log(res);
            localStorage.setItem("client_id", res.iD_Client.toString());
            localStorage.setItem("logoUrl", res.logoUrl);
            this.imageUrl = res.logoUrl;
          }
          else {
            localStorage.removeItem("client_id");
            this._snackBar.openSnackBar("Such client was not found!", "Ok");
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      })
  }

  public logout = () => {
    this.authService.logout();
    localStorage.clear();
    this.router.navigate(["/login-page"]);
  }
}
