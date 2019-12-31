import { Component, OnInit } from '@angular/core';
import { CoQuan } from '../../../model/co-quan.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyCoQuanPopupService } from '../quan-ly-co-quan-popup.service';

@Component({
  selector: 'app-co-quan-dialog',
  templateUrl: './co-quan-dialog.component.html',
  styleUrls: ['./co-quan-dialog.component.css']
})
export class CoQuanDialogComponent implements OnInit {
  coQuan = new CoQuan();
  constructor(
    public activeModal: NgbActiveModal,
    public coQuanPopupService: QuanLyCoQuanPopupService,
  ) {

   }

  ngOnInit() {
    this.coQuan = this.coQuanPopupService.getCoQuanById();
  }

  clear() {
    this.activeModal.dismiss('cancel');
  
  }
  save(){
    console.log(this.coQuanPopupService.getCoQuanById());
    
  }

}
