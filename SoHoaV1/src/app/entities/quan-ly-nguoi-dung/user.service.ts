import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { BaseCondition, ReturnResult, ApiUrl, HttpUtilities, HttpHeadersOptions } from '../../common';
import { User } from '../../model/user.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserGroup } from '../../model/user-group.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit, OnDestroy { 

  private _listen = new Subject();
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    
  }

  public userGetSearchWithPaging(condi? : BaseCondition<User>) {
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
  //  var body = JSON.stringify(condi);
  //  return this.httpClient.get<CoQuan[]>(ApiUrl.apiUrl + 'CoQuan/GetCoQuanWithPaging', { headers: { 'Access-Control-Allow-Origin': '*' }, params: condition, observe: 'response' });
  return this.httpClient.post<User[]>(ApiUrl.apiUrl + 'User/UserGetSearchWithPaging', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
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
  getAllRole() {
    return this.httpClient.get<ReturnResult<UserGroup>>(ApiUrl.apiUrl + "Role/GetAllRole");
  }

  listen () {
    return this._listen.asObservable();
  }

  filter(filterName: string) {
    this._listen.next(filterName);
  }

  ngOnDestroy(): void {
    
  }
  
}
