
export class HoSo  {
    constructor(
        public id?: number,
        public mahopso?: string,
        public hopsoid?: number,
        public mahoso?: string,
        public hososo?: number,
        public tieude?: string,
        public loaihoso?: string,
        public ghichu?: string,
    ) {
    }
}

export const hosos : HoSo[] = [
    {
        id: 1,
        mahopso:"HS-BTC123",
        hopsoid:1,
        hososo: 712,
        tieude: "Hồ sơ tài chính kế toán",
        loaihoso: "Hồ sơ tài chính ",
        ghichu: "string", 
      },
      {
        id: 2,
        mahopso:"HS-NV123",
        hopsoid:2,

        hososo: 617,
        tieude: "Hồ sơ Nội vụ",
        loaihoso: "Hồ sơ  ội vụ",
        ghichu: "string", 
      },
      {
        id: 3,
        mahopso:"HS-KD123",
        hopsoid:3,

        hososo: 812,
        tieude: "Hồ sơ Kinh doanh",
        loaihoso: "Hồ sơ Kinh doanh",
        ghichu: "string", 
      },
      {
        id: 4,
        mahopso:"HS-BTC23",
        hopsoid:1,

        hososo: 715,
        tieude: "Hồ sơ quyết toán thuế",
        loaihoso: "Hồ sơ quyết toán ",
        ghichu: "string", 
      },
      {
        id: 5,
        mahopso:"HS-GD123",
        hopsoid:4,

        hososo: 613,
        tieude: "Hồ sơ Giáo dục",
        loaihoso: "Hồ sơ Giáo dục",
        ghichu: "string", 
      }
]