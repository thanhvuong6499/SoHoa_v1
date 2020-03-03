import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuanLyHopSoService } from '../quan-ly-hop-so.service';
import { ActivatedRoute } from '@angular/router';
import { HoSo } from '../../../model/ho-so.model';
import { HopSo } from '../../../model/hop-so.model';

@Component({
  selector: 'app-detail-hop-so',
  templateUrl: './detail-hop-so.component.html',
  styleUrls: ['./detail-hop-so.component.css']
})
export class DetailHopSoComponent implements OnInit {
  hosos: HoSo[];
  hopso: HopSo;
  page = 1;
  private subscription: Subscription;
  private eventSubscriber: Subscription;
  constructor(
    private quanLyHopSoService: QuanLyHopSoService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.load(params['id']);
    });
  }
  load(id){
    this.quanLyHopSoService.getHopSoById(id)
    .subscribe((res=>{
        this.hopso = res.item;
    }));
    // this.hosos= this.quanLyHopSoService.getListHoSoByHopSoId(id);
  }
  loadPages(page : number) {
    
  }
}
