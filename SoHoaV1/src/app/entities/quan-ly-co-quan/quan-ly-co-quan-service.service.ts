import { Injectable, OnInit } from '@angular/core';
import { CoQuan, coquans } from '../../model/co-quan.model';
import { Phong, phongs } from '../../model/phong.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BaseCondition } from '../../common/BaseCondition';
import {  HttpUtilities} from '../../common/Utilities';

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
  }
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
    }
    else {
      condi = {
        PageIndex : 1,
        PageSize: 5,
        IN_WHERE: ""
      }
    }
   //  var reqOptions = HttpUtilities.convert(condi);
   var reqOptions = JSON.stringify(condi);
    console.log(reqOptions);
    const options = HttpUtilities.createRequestOption(reqOptions);
    return this.httpClient.get<CoQuan[]>(this.apiUrl + 'CoQuan/GetCoQuanWithPaging', { headers: { 'Access-Control-Allow-Origin': '*' }, params: options, observe: 'response' });
  }
}
