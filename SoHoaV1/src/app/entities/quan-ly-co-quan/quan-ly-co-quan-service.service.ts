import { Injectable, OnInit } from '@angular/core';
import { CoQuan, coquans } from '../../model/co-quan.model';
import { Phong, phongs } from '../../model/phong.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BaseCondition } from '../../common/BaseCondition';
import {  HttpUtilities} from '../../common/Utilities';
import { ApiUrl } from '../../common/Enviroment';

@Injectable({
  providedIn: 'root'
})
export class QuanLyCoQuanService {
  coquans: CoQuan[];
  apiUrl = "https://localhost:44357/api/";
  constructor(private httpClient : HttpClient) { }
  public getCoQuanById(id: number) {
    // this.coquans = coquans;
    // var coquan = new CoQuan();
    // for (let i = 0; i < coquans.length; i++) {
    //   if (id == coquans[i].id) {
    //     coquan = coquans[i];
    //   }
    // }
    // return coquan;
  };
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
      condi = {
        PageIndex : condi.PageIndex,
        PageSize: 5,
        IN_WHERE: ""
      }
      condition = {
        PageIndex: condi.PageIndex.toString(),
        PageSize: '5',
        IN_WHERE: ""
      }
    }
    else {
      condition = {
        PageIndex: '1',
        PageSize: '5',
        IN_WHERE: ""
      }
      condi = {
        PageIndex : 1,
        PageSize: 5,
        IN_WHERE: ""
      }
    }
  //  var reqOptions = HttpUtilities.convert(condi);
   var reqOptions = JSON.stringify(condi);
   var headers : HttpHeaders = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
  //  console.log(reqOptions);
  //  const options = HttpUtilities.createRequestOption(reqOptions)
    //  var condition = JSON.stringify(condition);
    //  return this.httpClient.get<any>('http://5d103ffdc56e7600145a46d2.mockapi.io/api/user', {  params: { value }, responseType: 'json' });
    return this.httpClient.get<any>(ApiUrl.apiUrl + 'CoQuan/GetCoQuanWithPaging', { headers: headers, params: condition, observe: 'response' });
  }
}
