import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { ApiUrl } from '../../common';

@Injectable({
  providedIn: 'root'
})
export class ThongKeService {

  constructor(private httpClient : HttpClient, private authenticationService: AuthenticationService) { }
  
  ExportFont (){
    return this.httpClient.get(ApiUrl.apiUrl + "ExportFont/FontExport");
  }
}
