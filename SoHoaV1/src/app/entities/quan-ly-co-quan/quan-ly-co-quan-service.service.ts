import { Injectable, OnInit } from '@angular/core';
import { CoQuan, coquans } from '../../model/co-quan.model';
import { Phong, phongs } from '../../model/phong.model';

@Injectable({
  providedIn: 'root'
})
export class QuanLyCoQuanService {
  coquans: CoQuan[];
  constructor() { }

  public getCoQuanById(id: number) {
    this.coquans = coquans;
    var coquan = new CoQuan();
    for (let i = 0; i < coquans.length; i++) {
      if (id == coquans[i].id) {
        coquan = coquans[i];
      }
    }
    return coquan;
  };
  public getListPhongByCoQuanId (id: number) {
    var phong : Phong[] = [];
    for (let i = 0; i < phongs.length; i ++) {
      if (phongs[i].coquanid == id) {
        phong.push(phongs[i]);
      }
    }
    return phong;
  }
}
