import { Component, OnInit } from '@angular/core';
import { Phong } from '../../../model/phong.model';
import { QuanLyPhongPopupService } from '../quan-ly-phong-popup.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-phong-delete',
  templateUrl: './phong-delete.component.html',
  styleUrls: ['./phong-delete.component.css']
})
export class PhongDeleteComponent implements OnInit {
  phong: Phong;
  constructor(
    private phongPopupService: QuanLyPhongPopupService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.phong= this.phongPopupService.getPhongById();
  }

}
