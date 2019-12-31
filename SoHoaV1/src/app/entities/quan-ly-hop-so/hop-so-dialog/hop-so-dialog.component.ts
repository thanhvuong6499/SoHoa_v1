import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HopSo } from '../../../model/hop-so.model';
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
    console.log(this.hopso);
    
  }

}
