import { Injectable, OnInit } from '@angular/core';
import { CoQuan, coquans } from '../../model/co-quan.model';
import { Phong, phongs } from '../../model/phong.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseCondition, HttpUtilities, ApiUrl } from '../../common';
import { User } from '../../model/user.model';
// import { Select2OptionData } from 'ng-select2';

@Injectable({
  providedIn: 'root'
})
export class QuanLyCoQuanService {
  coquans: CoQuan[];
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
    console.log(condition);
    return this.httpClient.get<CoQuan[]>(ApiUrl.apiUrl + 'CoQuan/GetCoQuanWithPaging', { headers: { 'Access-Control-Allow-Origin': '*' }, params: condition, observe: 'response' });
  }
}
