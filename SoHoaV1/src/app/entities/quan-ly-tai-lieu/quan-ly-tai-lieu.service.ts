import { Injectable } from '@angular/core';
import { VanBan, vanbans } from '../../model/van-ban.model';

@Injectable({
  providedIn: 'root'
})
export class QuanLyTaiLieuService {
  vanbans: VanBan[];
  constructor() { }
  public getVanBanById(id) {
    this.vanbans = vanbans;
    var vanban = new VanBan();
    for (let i = 0; i < vanbans.length; i++) {
      if (id == vanbans[i].id) {
        vanban = vanbans[i];
      }

    }
    return vanban;
  };
}
