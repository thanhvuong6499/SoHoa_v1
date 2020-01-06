import { Injectable } from '@angular/core';
import { Phong, phongs } from '../../model/phong.model';

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
}
