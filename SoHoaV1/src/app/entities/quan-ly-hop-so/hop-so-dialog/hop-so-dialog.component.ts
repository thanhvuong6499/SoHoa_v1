import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HopSo, hopsos } from '../../../model/hop-so.model';
import { QuanLyHopSoPopupService } from '../quan-ly-hop-so-popup.service';

@Component({
  selector: 'app-hop-so-dialog',
  templateUrl: './hop-so-dialog.component.html',
  styleUrls: ['./hop-so-dialog.component.css']
})
export class HopSoDialogComponent implements OnInit {
  hopso: HopSo;
  constructor(
   private activeModal: NgbActiveModal,
   private hopSoPopupService: QuanLyHopSoPopupService
  ) { }

  ngOnInit() {
    this.hopso = this.hopSoPopupService.getHopSoById()
  }
  clear() {
    this.activeModal.dismiss('cancel');
  
  }
  save(){
    if (this.hopso.gearBoxID && this.hopso.gearBoxID != undefined) {
      for(let i = 0; i < hopsos.length; i++) {
        if (hopsos[i].gearBoxID == this.hopso.gearBoxID) {
          hopsos[i] = this.hopso;
          break;
        }
      }
    }
    else {
      let id = hopsos.length;
      this.hopso.gearBoxID = id + 1;
      hopsos.push(this.hopso);
    }
    this.clear();
    
  }

}
