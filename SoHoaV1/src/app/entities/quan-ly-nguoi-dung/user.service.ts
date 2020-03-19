import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { BaseCondition, ReturnResult, ApiUrl, HttpUtilities } from '../../common';
import { User } from '../../model/user.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

  createNewUser(u: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    var user = JSON.stringify(u);
    return this.httpClient.post<User>(ApiUrl.apiUrl + "User/Create", user, httpOptions)
      .pipe(map((result) => {
        return result;
      }));
  }

  ngOnDestroy(): void {
    
  }
  
}
