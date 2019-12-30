import { Component, OnInit } from '@angular/core';
import { VanBan } from '../../model/van-ban.model';
import { vanbans } from '../../model/van-ban.model';

@Component({
  selector: 'app-quan-ly-tai-lieu',
  templateUrl: './quan-ly-tai-lieu.component.html',
  styleUrls: ['./quan-ly-tai-lieu.component.css']
})
export class QuanLyTaiLieuComponent implements OnInit {
  vanbans: VanBan[];
  constructor() { }

  ngOnInit() {
    this.vanbans = vanbans;
  }

}
