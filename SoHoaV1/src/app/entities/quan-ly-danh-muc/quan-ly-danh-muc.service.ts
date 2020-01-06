import { Injectable } from '@angular/core';
import { DanhMuc, danhmucs } from '../../model/danh-muc.model';

@Injectable({
  providedIn: 'root'
})
export class QuanLyDanhMucService {
  danhmucs: DanhMuc[];
  constructor() { }
  public getDanhMucById(id) {
    this.danhmucs = danhmucs;
    var danhmuc = new DanhMuc();
    for (let i = 0; i < danhmucs.length; i++) {
      if (id == danhmucs[i].id) {
        danhmuc = danhmucs[i];
      }

    }
    return danhmuc;
  };
}
