import { Component, OnInit } from '@angular/core';
import { HoSo } from '../../../model/ho-so.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyHoSoPopupService } from '../quan-ly-ho-so-popup.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ho-so-dialog',
  templateUrl: './ho-so-dialog.component.html',
  styleUrls: ['./ho-so-dialog.component.css']
})
export class HoSoDialogComponent implements OnInit {
  hoso: HoSo;
  constructor(
   private activeModal: NgbActiveModal,
   private hoSoPopupService: QuanLyHoSoPopupService,
   private toastr: ToastrService
  ) { }

  ngOnInit() {
  //  this.hoso = this.hoSoPopupService.getHoSoById()
  }
  clear() {
    this.activeModal.dismiss('cancel');
  
  }
  save(){
    
    
  }
  success(){
    this.toastr.success('Thêm mới thành công');
  }

}
