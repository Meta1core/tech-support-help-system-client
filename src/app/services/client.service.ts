import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../_interfaces/client';
import { AuthenticationService } from './authentication.service';
import { GuardService } from './guard.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  public getClientByPrefix = (route: string) => {
    return this.http.get<Client>(route, this.generateHeaders());
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')})
    }
  }

  public isClientLoaded(): boolean {
    if (localStorage.getItem("client_id") == null) {
      return false;
    }
    else {
      return true;
    }
  }
}
