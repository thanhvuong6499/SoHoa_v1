import { Phong } from './phong.model';

export class CoQuan  {
    constructor(
        public id?: number,
        public macoquan?: string,
        public tencoquan?: string,
        public diachi?: string,
        public loaicoquan?: string,
        
    ) {
    }
}

export const coquans : CoQuan[] = [
    {
        id: 1,
        macoquan:"AB-BTC",
        tencoquan: "Phòng Tài chính kế toán",
        diachi: "string", 
        
      },
      {
        id: 2,
        macoquan:"AB-NV",
        tencoquan: "Phòng Nội vụ",
        diachi: "string", 
      },
      {
        id: 3,
        macoquan:"AB-KD",
        tencoquan: "Phòng Kinh doanh",
        diachi: "string", 
      },
      {
        id: 4,
        macoquan:"AB-BTC",
        tencoquan: "Phòng Công nghệ",
        diachi: "string", 
      },
      {
        id: 5,
        macoquan:"AB-GD",
        tencoquan: "Phòng Giáo dục",
        diachi: "string", 
      }
]

export const coquans2 = [
  {
    id: 6,
    macoquan:"FFFA",
    tencoquan: "Phòng Công Vụ",
    diachi: "Nam Từ Liêm, Hà Nội", 
    
  },
  {
    id: 7,
    macoquan:"TEEE",
    tencoquan: "Phòng Họp",
    diachi: "Mỹ đình, Hà Nội", 
  },
  {
    id: 8,
    macoquan:"AB-AFTEE",
    tencoquan: "Phòng Kinh doanh dự án",
    diachi: "Bắc Thanh Xuân", 
  },
  {
    id: 9,
    macoquan:"AB-RRRRR",
    tencoquan: "Phòng Phục hồi chức năng",
    diachi: "Hà Đông", 
  },
  {
    id: 10,
    macoquan:"AB-GD",
    tencoquan: "Phòng Giáo dục và đào tạo",
    diachi: "Tây Nguyên", 
  }
]