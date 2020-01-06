import { Injectable } from '@angular/core';
import { CoQuan, coquans } from '../../model/co-quan.model';

@Injectable({
  providedIn: 'root'
})
export class QuanLyCoQuanService {

  coquans: CoQuan[];
  constructor() { }
  public getCoQuanById(id) {
    this.coquans = coquans;
    var coquan = new CoQuan();
    for (let i = 0; i < coquans.length; i++) {
      if (id == coquans[i].id) {
        coquan = coquans[i];
      }

    }
    return coquan;
  };
}
