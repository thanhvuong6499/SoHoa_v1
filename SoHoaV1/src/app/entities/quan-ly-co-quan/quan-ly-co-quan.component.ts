import { Component, OnInit } from '@angular/core';
import { CoQuan } from '../../model/co-quan.model';
import { coquans } from '../../model/co-quan.model';
import { ActivatedRoute } from '@angular/router';
import { QuanLyCoQuanPopupService } from './quan-ly-co-quan-popup.service';
import { CoQuanDialogComponent } from './co-quan-dialog/co-quan-dialog.component';
import { CoQuanDeleteComponent } from './co-quan-delete/co-quan-delete.component';

@Component({
  selector: 'app-quan-ly-co-quan',
  templateUrl: './quan-ly-co-quan.component.html',
  styleUrls: ['./quan-ly-co-quan.component.css']
})
export class QuanLyCoQuanComponent implements OnInit {
  coquans: CoQuan[];
  constructor(
    private route: ActivatedRoute,
    private coQuanPopupService: QuanLyCoQuanPopupService
  ) { }

  ngOnInit() {
    this.coquans = coquans
  }
  openDialog(id?: number) {

    if (id) {
      this.coQuanPopupService
        .open(CoQuanDialogComponent as Component, id);
      console.log(id);

    } else {
      this.coQuanPopupService
        .open(CoQuanDialogComponent as Component);
    }

  }
  openDeleteDialog(id?: number) {

      this.coQuanPopupService
        .open(CoQuanDeleteComponent as Component, id);
      console.log(id);

    

  }
}
