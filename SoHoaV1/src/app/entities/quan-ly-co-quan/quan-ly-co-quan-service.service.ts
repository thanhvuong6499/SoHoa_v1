import { Injectable, OnInit } from '@angular/core';
import { CoQuan, coquans } from '../../model/co-quan.model';
import { Phong, phongs } from '../../model/phong.model';
import { Observable } from 'rxjs';
// import { Select2OptionData } from 'ng-select2';

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
  //select2 autocomplete
//   getDynamicList(): Observable<Array<Select2OptionData>> {
//     return Observable.create((obs) => {
//         obs.next([
//             {
//                 id: 'dyn1',
//                 text: 'Dynamic 1'
//             },
//             {
//                 id: 'dyn2',
//                 text: 'Dynamic 2'
//             },
//             {
//                 id: 'dyn3',
//                 text: 'Dynamic 3'
//             },
//             {
//                 id: 'dyn4',
//                 text: 'Dynamic 4'
//             }
//         ]);
//         obs.complete();
//     });
// }
}
