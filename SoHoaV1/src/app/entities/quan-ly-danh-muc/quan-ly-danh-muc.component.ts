import { Component, OnInit } from '@angular/core';
import { DanhMuc } from '../../model/danh-muc.model';
import { danhmucs } from '../../model/danh-muc.model';

@Component({
  selector: 'app-quan-ly-danh-muc',
  templateUrl: './quan-ly-danh-muc.component.html',
  styleUrls: ['./quan-ly-danh-muc.component.css']
})
export class QuanLyDanhMucComponent implements OnInit {
  danhmucs: DanhMuc[];
  constructor() { }

  ngOnInit() {
    this.danhmucs = danhmucs;
  }

}
