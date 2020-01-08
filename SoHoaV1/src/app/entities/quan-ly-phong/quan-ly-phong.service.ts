import { Injectable } from '@angular/core';
import { Phong, phongs } from '../../model/phong.model';
import { DanhMuc, danhmucs } from '../../model/danh-muc.model';

@Injectable({
  providedIn: 'root'
})
export class QuanLyPhongService {
  phongs: Phong[]
  constructor() { }
  public getPhongById(id) {
    this.phongs = phongs;
    var phong = new Phong();
    for (let i = 0; i < phongs.length; i++) {
      if (id == phongs[i].id) {
        phong = phongs[i];
      }

    }
    return phong;
  };
  public getListDanhMucByPhongId (id: number) {
    var listdanhmuc : DanhMuc[] = [];
    for (let i = 0; i < danhmucs.length; i ++) {
      if (danhmucs[i].phongid == id) {
        listdanhmuc.push(phongs[i]);
      }
    }
    return listdanhmuc;
  }
}
