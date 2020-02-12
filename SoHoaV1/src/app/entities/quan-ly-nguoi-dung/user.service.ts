import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { BaseCondition, ReturnResult, ApiUrl, HttpUtilities } from '../../common';
import { User } from '../../model/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit, OnDestroy { 

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    
  }

  userGetSearchWithPaging (condi: BaseCondition<User>) {
    var condition = {};
    condition = {
      PageIndex : condi.PageIndex,
      PageSize: condi.PageSize,
      IN_WHERE: condi.IN_WHERE,
      IN_SORT: ""
    }
    return this.httpClient.get<ReturnResult<User>>(ApiUrl.apiUrl + "User/UserGetSearchWithPaging", { params: condition });
  }

  ngOnDestroy(): void {
    
  }
  
}
