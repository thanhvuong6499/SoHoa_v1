
export class DanhMuc  {
    constructor(
        public id?: number,
        public phongid?: number,
        public maphong?: string,
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
        phongid:1,
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
        phongid:2,

        tendanhmuc: "Kinh doanh",
        muclucso: 133, 
        soluonghopso: 14 ,  
        ghichu: "string"

      },
      {
        id: 4,
        madanhmuc:"AB-BTC",
        phongid:1,

        tendanhmuc: "Tài chính",
        muclucso: 178, 
        soluonghopso: 15 , 
        ghichu: "string"

      },
      {
        id: 5,
        madanhmuc:"AB-GD",
        phongid:2,

        tendanhmuc: "Giáo dục",
        muclucso: 166, 
        soluonghopso: 10 ,  
        ghichu: "string"

      }
]