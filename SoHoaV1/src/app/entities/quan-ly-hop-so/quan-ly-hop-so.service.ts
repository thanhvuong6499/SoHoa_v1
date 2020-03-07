import { Injectable } from '@angular/core';
import { HopSo, hopsos } from '../../model/hop-so.model';
import { HoSo, hosos } from '../../model/ho-so.model';
import { BaseCondition, HttpUtilities, ApiUrl, ReturnResult, HttpHeadersOptions } from '../../common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { DanhMuc } from '../../model/danh-muc.model';

@Injectable({
  providedIn: 'root'
})
export class QuanLyHopSoService {
  hopsos: HopSo[];
  constructor(private httpClient : HttpClient, private authenticationService: AuthenticationService) { }
  public getListHoSoByHopSoId (id: number) {
    var listhoso : HoSo[] = [];
    for (let i = 0; i < hosos.length; i ++) {
      if (hosos[i].hopsoid == id) {
        listhoso.push(hosos[i]);
      }
    }
    return listhoso;
  }

  public getAllHopSoWithPaging(condi? : BaseCondition<HopSo>) {
    console.log(condi);
    var condition = {};
    if (condi != undefined) {
      condition = {
        PageIndex : condi.PageIndex,
        PageSize: 5,
        IN_WHERE: ""
      }
    }
    else {
      condition = {
        PageIndex : 1,
        PageSize: 5,
        IN_WHERE: ""
      }
    }
   //  var reqOptions = HttpUtilities.convert(condi);
   var reqOptions = JSON.stringify(condi);
    console.log(reqOptions);
    const options = HttpUtilities.createRequestOption(reqOptions);
    return this.httpClient.get<HopSo[]>(ApiUrl.apiUrl + 'GearBox/GetPagingWithSearchResults', { headers: { 'Access-Control-Allow-Origin': '*' }, params: condition, observe: 'response' });
  }

  insertNewHopSo (hopso: HopSo) {
    var body = JSON.stringify(hopso);
    return this.httpClient.post<ReturnResult<HopSo>>(ApiUrl.apiUrl + "GearBox/CreateGearBox", body, { headers: HttpHeadersOptions.headers });
  }

  getHopSoById (gearBoxID: number) {
    return this.httpClient.get<ReturnResult<HopSo>>(ApiUrl.apiUrl + "GearBox/GetGearBoxByID/" + gearBoxID);
  }

  updateHopSo (hopso: HopSo) {
    return this.httpClient.post<ReturnResult<HopSo>>(ApiUrl.apiUrl + "GearBox/UpdateGearBox", JSON.stringify(hopso), { headers: HttpHeadersOptions.headers });
  }

  getListHopSoByDanhMucId (condi? : BaseCondition<HopSo>){
    console.log(condi);
    var condition = {};
    if (condi != undefined) {
      condition = {
        PageIndex : condi.PageIndex,
        PageSize: 5,
        IN_WHERE: ""
      }
    }
    else {
      condition = {
        PageIndex : 1,
        PageSize: 5,
        IN_WHERE: ""
      }
    }
   //  var reqOptions = HttpUtilities.convert(condi);
   var reqOptions = JSON.stringify(condi);
    console.log(reqOptions);
    const options = HttpUtilities.createRequestOption(reqOptions);
    return this.httpClient.get<HopSo[]>(ApiUrl.apiUrl + 'GearBox/GetPagingWithSearchResults', { headers: { 'Access-Control-Allow-Origin': '*' }, params: condition, observe: 'response' });
  }
  getAllHoSo (){
    return this.httpClient.get<ReturnResult<HopSo>>(ApiUrl.apiUrl + "Profile/GetAllProfile");
  }
  deleteHopSo (id: string) {
    var body = {
      id: id
    }
    var params = JSON.stringify(body);
    console.log(params)
    return this.httpClient.post<ReturnResult<HopSo>>(ApiUrl.apiUrl + "GearBox/DeleteGearBox?id=" + id, { headers :HttpHeadersOptions.headers });
  }
  
}
