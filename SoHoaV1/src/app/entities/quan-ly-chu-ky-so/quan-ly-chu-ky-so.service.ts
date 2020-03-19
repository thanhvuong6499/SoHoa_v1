import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { QuanLyCoQuanService } from '../quan-ly-co-quan/quan-ly-co-quan-service.service';

@Injectable({
  providedIn: 'root'
})
export class QuanLyChuKySoService implements OnInit, OnDestroy{

  constructor(private coQuanService: QuanLyCoQuanService)
  { }
  
  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }
}
