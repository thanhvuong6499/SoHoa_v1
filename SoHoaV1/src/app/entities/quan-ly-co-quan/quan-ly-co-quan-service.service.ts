import { Injectable, OnInit } from '@angular/core';
import { CoQuan, coquans } from '../../model/co-quan.model';
import { Phong, phongs } from '../../model/phong.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseCondition, HttpUtilities, ApiUrl, ReturnResult, HttpHeadersOptions } from '../../common';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../services/authentication.service';
import { OrganType } from '../../model/organ-type.model';
// import { Select2OptionData } from 'ng-select2';

@Injectable({
  providedIn: 'root'
})
export class QuanLyCoQuanService {
  coquans: CoQuan[];
  constructor(private httpClient : HttpClient, private authenticationService: AuthenticationService) { }

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
    return this.httpClient.get<CoQuan[]>(ApiUrl.apiUrl + 'CoQuan/GetCoQuanWithPaging', { headers: { 'Access-Control-Allow-Origin': '*' }, params: condition, observe: 'response' });
  }

   insertNewCoQuan (coquan: CoQuan) {
      coquan.CreateBy = this.authenticationService.getUserName;
      var body = JSON.stringify(coquan);
      return this.httpClient.post<ReturnResult<CoQuan>>(ApiUrl.apiUrl + "CoQuan/InsertCoQuan", body, { headers: HttpHeadersOptions.headers });
   }

  getCoQuanById (id: number) {
    return this.httpClient.get<ReturnResult<CoQuan>>(ApiUrl.apiUrl + "CoQuan/GetCoQuanById/" + id);
  }

  updateCoQuan (coquan: CoQuan) {
    coquan.UpdatedBy = this.authenticationService.getUserName;
    return this.httpClient.post<ReturnResult<CoQuan>>(ApiUrl.apiUrl + "CoQuan/UpdateCoQuan", JSON.stringify(coquan), { headers: HttpHeadersOptions.headers });
  }

  // lấy danh sách loại cơ quan
  getListOrganType() {
    return this.httpClient.get<OrganType[]>(ApiUrl.apiUrl + "OrganType/GetAllOrganType");
  }
}
