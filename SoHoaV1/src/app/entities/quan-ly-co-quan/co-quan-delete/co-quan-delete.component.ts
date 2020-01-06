import { Component, OnInit } from '@angular/core';
import { CoQuan } from '../../../model/co-quan.model';
import { QuanLyCoQuanPopupService } from '../quan-ly-co-quan-popup.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-co-quan-delete',
  templateUrl: './co-quan-delete.component.html',
  styleUrls: ['./co-quan-delete.component.css']
})
export class CoQuanDeleteComponent implements OnInit {
  coQuan: CoQuan;
  constructor(
    public activeModal: NgbActiveModal,
    private coQuanPopupService: QuanLyCoQuanPopupService,
  ) { }

  ngOnInit() {
    this.coQuan = this.coQuanPopupService.getCoQuanById();

  }

}
