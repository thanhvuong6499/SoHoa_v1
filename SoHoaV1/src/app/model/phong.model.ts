
export class Phong  {
    constructor(
        public id?: number,
        public coquanid?: number,
        public macoquan?: string,
        public maphong?: string,
        public tenphong?: string,
        public lichsuphong?: string,
        public ghichu?: string,
    ) {
    }
}

export const phongs : Phong[] = [
    {
        id: 1,
        macoquan:"AB-BTC",
        maphong: "string",
        tenphong: "Phòng Tài chính kế toán",
        ghichu: "string", 
      },
      {
        id: 2,
        macoquan:"AB-NV",
        maphong: "string",
        tenphong: "Phòng Nội vụ",
        ghichu: "string", 
      },
      {
        id: 3,
        macoquan:"AB-KD",
        maphong: "string",
        tenphong: "Phòng Kinh doanh",
        ghichu: "string", 
      },
      {
        id: 4,
        macoquan:"AB-BTC",
        maphong: "string",
        tenphong: "Phòng Công nghệ",
        ghichu: "string", 
      },
      {
        id: 5,
        macoquan:"AB-GD",
        maphong: "string",
        tenphong: "Phòng Giáo dục",
        ghichu: "string", 
      }
]