import { Injectable } from '@angular/core';
import { DanhMuc, danhmucs } from '../../model/danh-muc.model';
import { HopSo, hopsos } from '../../model/hop-so.model';
import { BaseCondition, HttpUtilities, ApiUrl, ReturnResult, HttpHeadersOptions } from '../../common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { Phong, phongs } from '../../model/phong.model';
import { organ } from '../../model/co-quan.model';

@Injectable({
  providedIn: 'root'
})

export class QuanLyDanhMucService {
  danhmucs: DanhMuc[];
  constructor(private httpClient : HttpClient, private authenticationService: AuthenticationService) { }
  public getListHopSoByDanhMucId (id: number) {
    var listhopso : HopSo[] = [];
    for (let i = 0; i < hopsos.length; i ++) {
      if (hopsos[i].tabOfContID == id) {
        listhopso.push(hopsos[i]);
      }
    }
    return listhopso;
  }
  public getAllDanhMucWithPaging(condi? : BaseCondition<DanhMuc>) {
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
    return this.httpClient.get<DanhMuc[]>(ApiUrl.apiUrl + 'TableOfContents/GetPagingWithSearchResults', { headers: { 'Access-Control-Allow-Origin': '*' }, params: condition, observe: 'response' });
  }
  insertNewDanhMuc (danhmuc: DanhMuc) {
    var body = JSON.stringify(danhmuc);
    return this.httpClient.post<ReturnResult<DanhMuc>>(ApiUrl.apiUrl + "TableOfContents/InsertTableOfContents", body, { headers: HttpHeadersOptions.headers });
  }

  getDanhMucById (tableOfContentsID: number) {
    return this.httpClient.get<ReturnResult<HopSo>>(ApiUrl.apiUrl + "TableOfContents/GetTableOfContentsByID/" + tableOfContentsID);
  }

  updateDanhMuc (danhmuc: DanhMuc) {
    return this.httpClient.post<ReturnResult<DanhMuc>>(ApiUrl.apiUrl + "TableOfContents/UpdateTableOfContents", JSON.stringify(danhmuc), { headers: HttpHeadersOptions.headers });
  }

  getListDanhMucByPhongId (phongID : number){
    return this.httpClient.get<ReturnResult<DanhMuc>>(ApiUrl.apiUrl + "TableOfContents/GetTableOfContentsByFontID/" +phongID);
  }
  getAllPhong (){
    return this.httpClient.get<ReturnResult<Phong>>(ApiUrl.apiUrl + "Font/GetAllFont");
  }
  getAllCoQuan (){
    return this.httpClient.get<ReturnResult<organ>>(ApiUrl.apiUrl + "Organ/GetAllOrgan");
  }
  deleteDanhMuc (id: string) {
    var body = {
      id: id
    }
    var params = JSON.stringify(body);
    console.log(params)
    return this.httpClient.post<ReturnResult<DanhMuc>>(ApiUrl.apiUrl + "TableOfContents/DeleteTableOfContents?id=" + id, { headers :HttpHeadersOptions.headers });
  }
  getAllDanhMuc() {
    return this.httpClient.get<ReturnResult<DanhMuc>>(ApiUrl.apiUrl + "TableOfContents/GetAllTableOfContents");
  }
}
