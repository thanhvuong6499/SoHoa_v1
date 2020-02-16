import { Injectable, OnInit } from '@angular/core';
import { CoQuan, coquans } from '../../model/co-quan.model';
import { Phong, phongs } from '../../model/phong.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseCondition, HttpUtilities, ApiUrl, ReturnResult } from '../../common';
import { map } from 'rxjs/operators';
// import { Select2OptionData } from 'ng-select2';

@Injectable({
  providedIn: 'root'
})
export class QuanLyCoQuanService {
  coquans: CoQuan[];
  apiUrl = "https://localhost:44357/api/";
  constructor(private httpClient : HttpClient) { }

  public getListPhongByCoQuanId (id: number) {
    var phong : Phong[] = [];
    for (let i = 0; i < phongs.length; i ++) {
      if (phongs[i].coquanid == id) {
        phong.push(phongs[i]);
      }
    }
    return phong;
  }
  public getAllCoQuanWithPaging(condi? : BaseCondition<CoQuan>) {
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
    return this.httpClient.get<CoQuan[]>(this.apiUrl + 'CoQuan/GetCoQuanWithPaging', { headers: { 'Access-Control-Allow-Origin': '*' }, params: condition, observe: 'response' });
  }

   Save (coquan: CoQuan) {

      var httpOptions : HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
      })
      var body = JSON.stringify(coquan);
      console.log(body);
      return this.httpClient.post<CoQuan>(ApiUrl.apiUrl + "CoQuan/InsertCoQuan", body, { headers: httpOptions });
  }

  public getCoQuanById (id: number) {
    return this.httpClient.get<ReturnResult<CoQuan>>(ApiUrl.apiUrl + "CoQuan/GetCoQuanById/" + id);
  }
}
