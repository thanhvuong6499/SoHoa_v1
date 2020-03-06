import { Injectable } from '@angular/core';
import { HoSo } from '../../model/ho-so.model';
import { VanBan, vanbans } from '../../model/van-ban.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseCondition, ReturnResult, ApiUrl, HttpHeadersOptions, HttpHeaderOptionsFormData } from '../../common';

@Injectable({
  providedIn: 'root'
})
export class QuanLyHoSoService {
  hosos: HoSo[];
  constructor(private _httpClient: HttpClient) { }

  public getHoSoById(id) {
    
  };
  public getListVanBanByHoSoId (id: number) {
    var listvanban : VanBan[] = [];
    for (let i = 0; i < vanbans.length; i ++) {
      if (vanbans[i].hosoid == id) {
        listvanban.push(vanbans[i]);
      }
    }
    return listvanban;
  }

  public getAllProfilesWithPaging(condi: BaseCondition<HoSo>, files: FormData) {
    var condition = {};
    if (condi != undefined) {
      condition = {
        PageIndex: condi.PageIndex,
        PageSize: condi.PageSize
      }
    }
    else {
      condition = {
        PageIndex: 1,
        PageSize: 5
      }
    }
   // return this._httpClient.post<ReturnResult<HoSo>>(ApiUrl.apiUrl + "Profile/ProfilesAddNewAndUploadFile", [JSON.stringify(condition), files]);
  }

  public insertSingleProfile (data: HoSo, files?: FormData) {
    // upload file
    var formData = new FormData();
    var profile = JSON.stringify(data);
    formData = files;
    formData.append('profile', profile);
    return this._httpClient.post<ReturnResult<any>>(ApiUrl.apiUrl + "Profile/ProfilesAddNewAndUploadFile", formData);
  }

}
