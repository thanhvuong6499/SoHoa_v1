
export class CoQuan  {
    constructor(
        public id?: number,
        public macoquan?: string,
        public tencoquan?: string,
        public diachi?: string,
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