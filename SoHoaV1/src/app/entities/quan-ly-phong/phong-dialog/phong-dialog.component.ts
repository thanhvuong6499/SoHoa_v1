import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuanLyPhongPopupService } from '../quan-ly-phong-popup.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { phongPopupRoute } from '../quan-ly-phong-routing.module';
import { Phong, phongs } from '../../../model/phong.model';
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
  ) { }

  ngOnInit() {
    this.phong = this.phongPopupService.getPhongById();
  }
  clear() {
    this.activeModal.dismiss('cancel');
  }
  save(event){
    if (this.phong.id && this.phong.id != undefined) {
      for(let i = 0; i < phongs.length; i++) {
        if (phongs[i].id == this.phong.id) {
          phongs[i] = this.phong;
          break;
        }
      }
    }
    else {
      let id = phongs.length;
      this.phong.id = id + 1;
      phongs.push(this.phong);
    }
    this.clear();
  }
  deleteFont(event) {
    console.log(event);
  }

}

