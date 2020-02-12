import { Injectable } from '@angular/core';
import { DanhMuc, danhmucs } from '../../model/danh-muc.model';
import { HopSo, hopsos } from '../../model/hop-so.model';

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
  public getListHopSoByDanhMucId (id: number) {
    var listhopso : HopSo[] = [];
    for (let i = 0; i < hopsos.length; i ++) {
      if (hopsos[i].danhmucid == id) {
        listhopso.push(hopsos[i]);
      }
    }
    return listhopso;
  }
}
