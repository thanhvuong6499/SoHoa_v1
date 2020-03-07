import { Component, OnInit } from '@angular/core';
import { HopSo, hopsos } from '../../../model/hop-so.model';
import { QuanLyHopSoPopupService } from '../quan-ly-hop-so-popup.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyHopSoService } from '../quan-ly-hop-so.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hop-so-delete',
  templateUrl: './hop-so-delete.component.html',
  styleUrls: ['./hop-so-delete.component.css']
})
export class HopSoDeleteComponent implements OnInit {

  hopso: HopSo;
  constructor(
    private hopSoPopupService: QuanLyHopSoPopupService,
    private activeModal: NgbActiveModal,
    private hopSoService: QuanLyHopSoService,
    private toasts: ToastrService
  ) {
    this.hopso = new HopSo();
   }

  ngOnInit() {
    if(this.hopSoPopupService.result.item != undefined){
      this.hopso = this.hopSoPopupService.result.item;
    }
  }
  deleteHopSo(id : any) {
    this.hopSoService.deleteHopSo(id)
      .subscribe((result) => {
        
      },
      (error) => {
        alert("Xóa thất bại. Lỗi: " + JSON.stringify(error));
      }, () => {
        this.activeModal.dismiss("deleted");
        this.onDeleteSuccess();
      });
  }
  onDeleteSuccess(){
    this.toasts.success("delete success")
  }

}
