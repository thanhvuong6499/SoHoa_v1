import { Injectable } from '@angular/core';
import { HoSo } from '../../model/ho-so.model';
import { VanBan, vanbans } from '../../model/van-ban.model';

@Injectable({
  providedIn: 'root'
})
export class QuanLyHoSoService {
  hosos: HoSo[];
  constructor() { }
  public getHoSoById(id) {
    
  };
  public getListVanBanByHoSoId (id: number) {
    var listvanban : VanBan[] = [];
    for (let i = 0; i < vanbans.length; i ++) {
      if (vanbans[i].hosoid == id) {
        listvanban.push(vanbans[i]);
      }
    }
    return listvanban;
  }
}
