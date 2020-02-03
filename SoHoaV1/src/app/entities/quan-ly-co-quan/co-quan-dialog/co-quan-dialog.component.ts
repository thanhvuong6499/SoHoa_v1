import { Component, OnInit } from '@angular/core';
import { CoQuan, coquans } from '../../../model/co-quan.model';
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
  save() {
    if (this.coQuan.id && this.coQuan.id != undefined) {
      for(let i = 0; i < coquans.length; i++) {
        if (coquans[i].id == this.coQuan.id) {
          coquans[i] = this.coQuan;
          break;
        }
      }
    }
    else {
      let id = coquans.length;
      this.coQuan.id = id + 1;
      coquans.push(this.coQuan);
    }
    this.clear();
  }

}
