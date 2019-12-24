import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuanLyPhongPopupService } from '../quan-ly-phong-popup.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-phong-dialog',
  templateUrl: './phong-dialog.component.html',
  styleUrls: ['./phong-dialog.component.css']
})
export class PhongDialogComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,

  ) {

   }

  ngOnInit() {
    
  }
  clear() {
    this.activeModal.dismiss('cancel');
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
      this.routeSub = this.route.params.subscribe((params) => {
          if ( params['id'] ) {
              this.phongPopupService
                  .open(PhongDialogComponent as Component, params['id']);
          } else {
              this.phongPopupService
                  .open(PhongDialogComponent as Component);
          }
      });
      
      
      // this.phongPopupService.open(PhongDialogComponent as Component);
  }

  ngOnDestroy() {
      this.routeSub.unsubscribe();
  }
}
