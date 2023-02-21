import { OnInit, HostListener, ElementRef, HostBinding, Directive, Input, Inject } from '@angular/core';
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
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: '[app-main-page]',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;
  showFiller = false;
  searchPrefix = "";
  public isUserAuthenticated: boolean = false;
  public isAny: any;

  imageUrl: any;
  clientName: any;
  clientPrefix: any;
  

  constructor(private authService: AuthenticationService, private eRef: ElementRef, private router: Router, private clientService: ClientService, @Inject(CustomSnackBar) private _snackBar: CustomSnackBar, private spinner: NgxSpinnerService) {
  }


  onError() {
    this.imageUrl = "assets/no_logo.png";
  }

  ngOnInit(): void {
    this.authService.authChanged
      .subscribe(res => {
        this.isUserAuthenticated = res;
      });
    this.loadClient();
  }

  public isClientLoaded(): boolean {
    if (localStorage.getItem("client_id")) {
      return true;
    }
    else {
      return false;
    }
  }

  public loadClient(): any{
    console.log(localStorage.getItem("client_logoUrl"));
    this.imageUrl = localStorage.getItem("client_logoUrl");
    this.clientName = localStorage.getItem("client_name");
    this.clientPrefix = localStorage.getItem("client_prefix");
  }
  
  public searchInput(key: KeyboardEvent) {
    if (key.charCode === 13) { 
      this.getClient() 
    }
  }
  

  public getClient() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.clientService.getClientByPrefix('http://10.190.100.102:8080/Clients/' + this.searchPrefix)
      .subscribe({
        next: (res: Client) => {
          if (res) {
            console.log(res);
            localStorage.setItem("client_id", res.iD_Client.toString());
            localStorage.setItem("client_logoUrl", res.logoUrl);
            localStorage.setItem("client_name", res.name);
            localStorage.setItem("client_prefix", res.prefix);
            this.clientName = res.name;
            this.imageUrl = res.logoUrl;
            this.clientPrefix = res.prefix;
            this._snackBar.openSnackBar(this.clientPrefix + " client was successfully loaded!", "Ok");
          }
          else {
            this.clearCookie();
            this._snackBar.openSnackBar("Such client was not found!", "Ok");
            
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      })
  }

  public clearCookie() {
    localStorage.removeItem("client_id");
    localStorage.removeItem("client_logoUrl");
    localStorage.removeItem("client_name");
    localStorage.removeItem("client_prefix");
    this.imageUrl = "";
    this.clientName = "";
    this.clientPrefix = "";
  }

  public logout = () => {
    this.authService.logout();
    window.location.reload();
  }

  public goToLocationsPage() {
    if (this.isClientLoaded()) {
      this.router.navigate(['/location-page']);
    }
    else {
      this._snackBar.openSnackBar("Client has not been selected!", "Ok");
    }
  }
}
