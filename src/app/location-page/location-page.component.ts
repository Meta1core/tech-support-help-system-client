import { Location } from './../_interfaces/location';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomSnackBar } from '../CustomSnackBar';
import { LocationService } from '../services/location.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.css']
})
export class LocationPageComponent implements OnInit {
  public locations: any;
  displayedColumns: string[] = ['demo-name'];
  
  currentClinic: any;

  constructor(private locationService: LocationService, private clientService: ClientService, private _snackBar: CustomSnackBar, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.currentClinic = {} as Location;;
    if (this.clientService.isClientLoaded()) {
      this.GetLocations();
    }
    else {
      this._snackBar.openSnackBar("Client has not been selected!", "Ok");
      this.router.navigate(['/main']);
    }
  }

  public GetLocations() {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 1700);
    this.locationService.getLocations('http://10.190.100.102:8080/Clinics/' + localStorage.getItem("client_id"))
        .subscribe({
          next: (res: Location[]) => {
            if (res) {
              this.locations = res;
              console.log(this.currentClinic = this.locations[0].name);
              console.log(this.locations);
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);

          }
        })
  }

  public getClinicData(clinic: any) {
    this.currentClinic = clinic;
  }
}
