import { Component, OnInit } from '@angular/core';
import { HopSo } from '../../model/hop-so.model';
import { hopsos } from '../../model/hop-so.model';
import { QuanLyHopSoPopupService } from './quan-ly-hop-so-popup.service';
import { HopSoDialogComponent } from './hop-so-dialog/hop-so-dialog.component';

@Component({
  selector: 'app-quan-ly-hop-so',
  templateUrl: './quan-ly-hop-so.component.html',
  styleUrls: ['./quan-ly-hop-so.component.css']
})
export class QuanLyHopSoComponent implements OnInit {
  hopsos: HopSo[];
  constructor(
    private hopSoPopupService: QuanLyHopSoPopupService, 
  ) { }

  ngOnInit() {
    this.hopsos = hopsos;
  }
  openDialog(id?: number) {

    if (id) {
      this.hopSoPopupService
        .open(HopSoDialogComponent as Component, id);
      console.log(id);

    } else {
      this.hopSoPopupService
        .open(HopSoDialogComponent as Component);
    }

  }

}
