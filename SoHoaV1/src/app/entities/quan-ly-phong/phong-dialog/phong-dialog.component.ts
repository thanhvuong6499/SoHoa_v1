import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuanLyPhongPopupService } from '../quan-ly-phong-popup.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { phongPopupRoute } from '../quan-ly-phong-routing.module';
import { Phong } from '../../../model/phong.model';
import { isDaylightSavingTime } from 'ngx-bootstrap/chronos/units/offset';

@Component({
  selector: 'app-phong-dialog',
  templateUrl: './phong-dialog.component.html',
  styleUrls: ['./phong-dialog.component.css']
})
export class PhongDialogComponent implements OnInit {
  phong = new Phong();
  constructor(
    public activeModal: NgbActiveModal,
    public phongPopupService: QuanLyPhongPopupService,
  ) {

   }

  ngOnInit() {
    this.phong = this.phongPopupService.getPhongById();
  }
  clear() {
    this.activeModal.dismiss('cancel');
  
  }
  save(){
    console.log(this.phong);
    
  }

}
@Component({
  selector: 'phong-popup',
  template: ''
})
export class PhongPopupComponent implements OnInit, OnDestroy {

  routeSub: any;

  constructor(
      private route: ActivatedRoute,
      private phongPopupService: QuanLyPhongPopupService
  ) {}

  ngOnInit() {
      // this.routeSub = this.route.params.subscribe((params) => {
      //     if ( params['id'] ) {
      //         this.phongPopupService
      //             .open(PhongDialogComponent as Component, params['id']);
      //     } else {
      //         this.phongPopupService
      //             .open(PhongDialogComponent as Component);
      //     }
      // });
      // this.phongPopupService.open(PhongDialogComponent as Component);
  }

  ngOnDestroy() {
      this.routeSub.unsubscribe();
  }
}
