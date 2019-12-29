
export class DanhMuc  {
    constructor(
        public id?: number,
        public madanhmuc?: string,
        public tendanhmuc?: string,
        public muclucso?: number,
        public soluonghopso?: number,
        public ghichu?: string,
    ) {
    }
}

export const danhmucs : DanhMuc[] = [
    {
        id: 1,
        madanhmuc:"AB-BTC",
        tendanhmuc: "Tài chính kế toán",
        muclucso: 170, 
        soluonghopso: 20 , 
        ghichu: "string"
      },
      {
        id: 2,
        madanhmuc:"AB-NV",
        tendanhmuc: "Nội vụ",
        muclucso: 173, 
        soluonghopso: 15 , 
        ghichu: "string"


      },
      {
        id: 3,
        madanhmuc:"AB-KD",
        tendanhmuc: "Kinh doanh",
        muclucso: 133, 
        soluonghopso: 14 ,  
        ghichu: "string"

      },
      {
        id: 4,
        madanhmuc:"AB-BTC",
        tendanhmuc: "Tài chính",
        muclucso: 178, 
        soluonghopso: 15 , 
        ghichu: "string"

      },
      {
        id: 5,
        madanhmuc:"AB-GD",
        tendanhmuc: "Giáo dục",
        muclucso: 166, 
        soluonghopso: 10 ,  
        ghichu: "string"

      }
]