
export class HopSo  {
    constructor(
        public id?: number,
        public mahopso?: string,
        public danhmucid?: number,
        public madanhmuc?: string,
        public tieudehopso?: string,
        public soluonghoso?: number,
        public soluongvanban?: number,
        public ngaybatdau?: Date,
        public ngayketthuc?: Date,

        public ghichu?: string,
    ) {
    }
}

export const hopsos : HopSo[] = [
    {
        id: 1,
        mahopso:"HS-BTC123",
        danhmucid: 1,
        madanhmuc: "AB-BTC",
        tieudehopso: "Hộp số BTC",
        soluonghoso: 10,
        soluongvanban: 100,
        ghichu: "string",
      },
      {
        id: 2,
        mahopso:"HS-NV123",
        danhmucid: 2,
        
        madanhmuc: "AB-NV",
        tieudehopso: "Hộp số NV",
        soluonghoso: 14,
        soluongvanban: 90,
        ghichu: "string", 
      },
      {
        id: 3,
        mahopso:"HS-KD123",
        danhmucid: 3,

        madanhmuc: "AB-KD",
        tieudehopso: "Hộp số TC",
        soluonghoso: 8,
        soluongvanban: 87,
        ghichu: "string", 
      },
      {
        id: 4,
        mahopso:"HS-BTC123",
        danhmucid: 1,

        madanhmuc: "AB-BTC",
        tieudehopso: "Hộp số BTC",
        soluonghoso: 6,
        soluongvanban: 111,
        ghichu: "string",
      },
      {
        id: 5,
        mahopso:"HS-KD123",
        danhmucid: 4,

        madanhmuc: "AB-KD",
        tieudehopso: "Hộp số KT",
        soluonghoso: 9,
        soluongvanban: 77,
        ghichu: "string",
      }
]