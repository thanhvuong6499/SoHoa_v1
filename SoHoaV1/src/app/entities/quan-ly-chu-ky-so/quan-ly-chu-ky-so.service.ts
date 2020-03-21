import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { QuanLyCoQuanService } from '../quan-ly-co-quan/quan-ly-co-quan-service.service';
import { BaseCondition, ApiUrl, ReturnResult, HttpHeadersOptions } from '../../common';
import { DigitalSignature } from '../../model/digital-signature.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuanLyChuKySoService implements OnInit, OnDestroy{

  private _listners = new Subject();
  constructor(private coQuanService: QuanLyCoQuanService, private _httpClient: HttpClient)
  { }
  
  ngOnInit(): void {
    
  }

  listen () : Observable<any>{
    return this._listners.asObservable();
  }

  filter(filterBy: string){
    this._listners.next(filterBy);
  }

  signatureGetPaging (condi?: BaseCondition<DigitalSignature>) {
    var condition = {};
    if (condi != undefined) {
      condition = {
        PageIndex: condi.PageIndex,
        PageSize: condi.PageSize,
        Item: condi.Item
      }
    }
    else {
      condition = {
        PageIndex: 1,
        PageSize: 5
      }
    }
    return this._httpClient.post<ReturnResult<DigitalSignature>>(ApiUrl.apiUrl + "DigitalSignature/GetPaging", JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

  signatureCreate (data: FormData) {
    return this._httpClient.post<any>(ApiUrl.apiUrl + "DigitalSignature/CreateSignature", data);
  }

  signatureGetById (id : any) {
    return this._httpClient.get<any>(ApiUrl.apiUrl + "DigitalSignature/GetDigitalById?id=" + id);
  }

  signatureDelete (id: any) {
    var data = { id: id };
    return this._httpClient.post<any>(ApiUrl.apiUrl + "DigitalSignature/Delete?id=" + id, { headers: HttpHeadersOptions.headers });
  }

  ngOnDestroy(): void {
    
  }
}
