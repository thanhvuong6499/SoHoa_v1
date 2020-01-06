import { Injectable } from '@angular/core';
import { HoSo, hosos } from '../../model/ho-so.model';

@Injectable({
  providedIn: 'root'
})
export class QuanLyHoSoService {
  hosos: HoSo[];
  constructor() { }
  public getHoSoById(id) {
    this.hosos = hosos;
    var hoso = new HoSo();
    for (let i = 0; i < hosos.length; i++) {
      if (id == hosos[i].id) {
        hoso = hosos[i];
      }

    }
    return hoso;
  };
}
