import { TestBed } from '@angular/core/testing';

import { QuanLyCoQuanPopupService } from './quan-ly-co-quan-popup.service';

describe('QuanLyCoQuanPopupService', () => {
  let service: QuanLyCoQuanPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanLyCoQuanPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
