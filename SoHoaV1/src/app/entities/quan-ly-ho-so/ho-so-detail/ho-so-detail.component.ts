import { Component, OnInit } from '@angular/core';
 import { Document } from '../../../model/document.model';
import { HoSo } from '../../../model/ho-so.model';
import { Subscription } from 'rxjs';
import { QuanLyHoSoService } from '../quan-ly-ho-so.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ho-so-detail',
  templateUrl: './ho-so-detail.component.html',
  styleUrls: ['./ho-so-detail.component.css']
})
export class HoSoDetailComponent implements OnInit {
  hoso: HoSo;
  documents: Document[];
  page = 1;
  private subscription: Subscription;
  private eventSubscriber: Subscription;
  constructor(
    private quanLyHoSoService: QuanLyHoSoService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.load(params['id']);
    });
  }
  load(id){
    this.hoso= this.quanLyHoSoService.getHoSoById(id);
    // this.documents= this.quanLyHoSoService.getListVanBanByHoSoId(id);
  }
  loadPages(page : number) {
    // switch (page) {
    //   case 1:
    //     this.coquans = coquans;
    //     break;
    //   case 2:
    //     this.coquans = coquans2;
    //     break;
    //   case 3:
    //     this.coquans = coquans;
    //     break;
    //   default:
    //     break;
    // }
  }
}
