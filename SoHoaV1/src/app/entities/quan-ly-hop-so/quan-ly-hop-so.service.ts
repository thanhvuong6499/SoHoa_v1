import { Injectable } from '@angular/core';
import { HopSo, hopsos } from '../../model/hop-so.model';
import { HoSo, hosos } from '../../model/ho-so.model';

@Injectable({
  providedIn: 'root'
})
export class QuanLyHopSoService {
  hopsos: HopSo[];
  constructor() { }
  public getHopSoById(id) {
    this.hopsos = hopsos;
    var hopso = new HopSo();
    for (let i = 0; i < hopsos.length; i++) {
      if (id == hopsos[i].id) {
        hopso = hopsos[i];
      }

    }
    return hopso;
  };
  public getListHoSoByHopSoId (id: number) {
    var listhoso : HoSo[] = [];
    for (let i = 0; i < hosos.length; i ++) {
      if (hosos[i].hopsoid == id) {
        listhoso.push(hosos[i]);
      }
    }
    return listhoso;
  }
}
