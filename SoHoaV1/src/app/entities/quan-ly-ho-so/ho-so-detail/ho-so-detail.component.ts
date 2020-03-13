import { Component, OnInit } from '@angular/core';
import { VanBan, vanbans } from '../../../model/van-ban.model';
import { HoSo } from '../../../model/ho-so.model';
import { Subscription } from 'rxjs';
import { QuanLyHoSoService } from '../quan-ly-ho-so.service';
import { ActivatedRoute } from '@angular/router';
import { FilePopupService } from '../file-details/file-popup-service.service';
import { FileDetailsComponent } from '../file-details/file-details.component';

@Component({
  selector: 'app-ho-so-detail',
  templateUrl: './ho-so-detail.component.html',
  styleUrls: ['./ho-so-detail.component.css']
})
export class HoSoDetailComponent implements OnInit {
  hoso: HoSo;
  vanbans: VanBan[];
  page = 1;
  private subscription: Subscription;
  private eventSubscriber: Subscription;
  constructor(
    private service: QuanLyHoSoService,
    private route: ActivatedRoute,
    private dialog: FilePopupService
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      let id = params['id'];
      this.getProfileById(id);
    });
  }
  load(id){
  //  this.hoso= this.quanLyHoSoService.getHoSoById(id);
  //  this.vanbans= this.quanLyHoSoService.getListVanBanByHoSoId(id);
  }

  getProfileById (id: any) {
    this.service.getProfilesById(id)
      .subscribe((result) => {
        this.hoso = result.item;
      },
      (error) => {
        console.log(error);
      },
      () => {

      });
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

  openFileDetailDialog(id? : any) {
    if (id != undefined) {
      this.dialog.open(FileDetailsComponent as Component,  id);
    }
    else {
      this.dialog.open(FileDetailsComponent as Component);
    }
  }
}
