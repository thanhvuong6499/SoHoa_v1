import { Component, OnInit } from '@angular/core';
import { HopSo } from '../../model/hop-so.model';
import { hopsos } from '../../model/hop-so.model';

@Component({
  selector: 'app-quan-ly-hop-so',
  templateUrl: './quan-ly-hop-so.component.html',
  styleUrls: ['./quan-ly-hop-so.component.css']
})
export class QuanLyHopSoComponent implements OnInit {
  hopsos: HopSo[];
  constructor() { }

  ngOnInit() {
    this.hopsos = hopsos;
  }

}
