import { Injectable } from '@angular/core';
import { Phong, phongs } from '../../model/phong.model';
import { DanhMuc, danhmucs } from '../../model/danh-muc.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { CoQuan, coquans, organ } from '../../model/co-quan.model';
import { Observable } from 'rxjs';
import { BaseCondition, HttpUtilities, ApiUrl, ReturnResult, HttpHeadersOptions } from '../../common';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable({
  providedIn: 'root'
})
export class QuanLyPhongService {
  phongs: Phong[]
  constructor(private httpClient : HttpClient, private authenticationService: AuthenticationService) { }
  public getListPhongByCoQuanId (id: number) {
    var phong : Phong[] = [];
    for (let i = 0; i < phongs.length; i ++) {
      if (phongs[i].organID == id) {
        phong.push(phongs[i]);
      }
    }
    return phong;
  }
  
  public getAllPhongWithPaging(condi? : BaseCondition<Phong>) {
    var condition = {};
    if (condi != undefined) {
      condition = {
        PageIndex : condi.PageIndex,
        PageSize: 5,
        FilterRuleList: condi.FilterRuleList
      }
    }
    else {
      condition = {
        PageIndex : 1,
        PageSize: 5
      }

    }
  return this.httpClient.post<Phong[]>(ApiUrl.apiUrl + 'Font/GetFontWithPaging', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

  insertNewPhong (phong: Phong) {
    var body = JSON.stringify(phong);
    return this.httpClient.post<ReturnResult<Phong>>(ApiUrl.apiUrl + "Font/InsertFont", body, { headers: HttpHeadersOptions.headers });
  }

  getCoQuanById (id: number) {
    return this.httpClient.get<ReturnResult<CoQuan>>(ApiUrl.apiUrl + "CoQuan/GetCoQuanById/" + id);
  }

  updatePhong (phong: Phong) {
    return this.httpClient.post<ReturnResult<Phong>>(ApiUrl.apiUrl + "Font/UpdateFont", JSON.stringify(phong), { headers: HttpHeadersOptions.headers });
  }

  getPhongById (id: number) {
    return this.httpClient.get<ReturnResult<Phong>>(ApiUrl.apiUrl + "Font/GetFontByID/" + id);
  }
  
  getListDanhMucByPhongId (condi? : BaseCondition<DanhMuc>){
    var condition = {};
    if (condi != undefined) {
      condition = {
        PageIndex : condi.PageIndex,
        PageSize: 5,
        FilterRuleList: condi.FilterRuleList
      }
    }
    else {
      condition = {
        PageIndex : 1,
        PageSize: 5
      }

    }
  return this.httpClient.post<DanhMuc[]>(ApiUrl.apiUrl + 'TableOfContents/GetTableOfContentsByFontID', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }
  getAllCoQuan (){
    return this.httpClient.get<ReturnResult<organ>>(ApiUrl.apiUrl + "Organ/GetAllOrgan");
  }
  deletePhong (id: number) {
    return this.httpClient.post<ReturnResult<Phong>>(ApiUrl.apiUrl + "Font/DeleteFont?id=" + id, { headers :HttpHeadersOptions.headers });
  }
}

