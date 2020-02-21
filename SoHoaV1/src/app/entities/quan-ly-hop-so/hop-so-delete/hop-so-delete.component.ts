import { Component, OnInit } from '@angular/core';
import { HopSo, hopsos } from '../../../model/hop-so.model';
import { QuanLyHopSoPopupService } from '../quan-ly-hop-so-popup.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hop-so-delete',
  templateUrl: './hop-so-delete.component.html',
  styleUrls: ['./hop-so-delete.component.css']
})
export class HopSoDeleteComponent implements OnInit {

  hopso: HopSo;
  constructor(
    private hopSoPopupService: QuanLyHopSoPopupService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.hopso = this.hopSoPopupService.getHopSoById();
  }
  deleteHopSo(id : number) {
    if (id && id != undefined) {
      for (let i = 0; i < hopsos.length; i ++) {
        if (hopsos[i].id == id) {
          hopsos.splice(i, 1);
          break;
        }
      }
      this.activeModal.dismiss('cancel');
    }
  }

}
