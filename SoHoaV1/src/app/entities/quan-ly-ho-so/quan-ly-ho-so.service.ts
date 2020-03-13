import { Injectable } from '@angular/core';
import { HoSo } from '../../model/ho-so.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseCondition, ReturnResult, ApiUrl, HttpHeadersOptions, HttpHeaderOptionsFormData } from '../../common';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class QuanLyHoSoService {
  hosos: HoSo[];
  constructor(private _httpClient: HttpClient, private authenticationService: AuthenticationService) { }

  public getHoSoById(id) {
    
  };
  public getListVanBanByHoSoId (id: number) {
    
  }

  public getAllProfilesWithPaging(condi: BaseCondition<HoSo>) {
    var condition = {};
    if (condi != undefined) {
      condition = {
        PageIndex: condi.PageIndex,
        PageSize: condi.PageSize,
        FilterRuleList: condi.FilterRuleList
      }
    }
    else {
      condition = {
        PageIndex: 1,
        PageSize: 5
      }
    }
    return this._httpClient.post<ReturnResult<HoSo>>(ApiUrl.apiUrl + "Profile/ProfilesGetSearchWithPaging", JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

  public insertSingleProfile (data: HoSo, files?: FormData) {
    // upload file
    data.createdBy = this.authenticationService.getUserName;
    var formData = new FormData();
    var profile = JSON.stringify(data);
    if (files != undefined) {
      formData = files;
    }
    formData.append('profile', profile);
    return this._httpClient.post<ReturnResult<any>>(ApiUrl.apiUrl + "Profile/ProfilesAddNewAndUploadFile", formData);
  }

  public updateSingleProfile (data: HoSo, files?: FormData) {
    // upload file
    data.createdBy = this.authenticationService.getUserName;
    var formData = new FormData();
    var profile = JSON.stringify(data);
    if (files != undefined) {
      formData = files;
    }
    formData.append('profile', profile);
    return this._httpClient.post<ReturnResult<any>>(ApiUrl.apiUrl + "Profile/ProfileUpdate", formData);
  }

  public getAllProfiles () {
    return this._httpClient.get<any>(ApiUrl.apiUrl + "Profile/GetAllProfiles");
  }

  public getAllGearBoxAndProfileType () {
    return this._httpClient.get<any>(ApiUrl.apiUrl + "Profile/GetAllProfileTypeAndGearBox");
  }

  public getProfilesById (id : any) {
    return this._httpClient.get<ReturnResult<HoSo>>(ApiUrl.apiUrl + "Profile/GetProfilesById?profileId=" + id);
  }
}
