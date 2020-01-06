import { Injectable } from '@angular/core';
import { HopSo, hopsos } from '../../model/hop-so.model';

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
}
