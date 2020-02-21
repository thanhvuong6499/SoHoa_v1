import { TestBed } from '@angular/core/testing';

import { QuanLyPhongService } from './quan-ly-phong.service';

describe('QuanLyPhongService', () => {
  let service: QuanLyPhongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanLyPhongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
