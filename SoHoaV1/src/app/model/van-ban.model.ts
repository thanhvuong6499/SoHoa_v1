
export class VanBan  {
    constructor(
        public id?: number,
        public hososo?: number,
        public vanbanso?: string,
        public stttronghs?: number,
        public loaivanban?: string,
        public noidung?: string,
        public soto?: number,
        public mucdotincay?: string,
        public tinhtrang?: string,
        public ghichu?: string,
    ) {
    }
}

export const vanbans : VanBan[] = [
    {
        id: 1,
        hososo: 712,
        vanbanso: "02",
        stttronghs: 21,
        loaivanban: "Văn bản hành chính",
        noidung: "Văn bản hành chính",
        soto: 100,
        mucdotincay: "Có",
        tinhtrang: "Cũ",
        ghichu: "string", 
      },
      {
        id: 2,
        hososo: 715,
        vanbanso: "02",
        stttronghs: 21,
        loaivanban: "Văn bản hành pháp",
        noidung: "Văn bản hành pháp",
        soto: 100,
        mucdotincay: "Không",
        tinhtrang: "Mới",
        ghichu: "string",
      },
      {
        id: 3,
        hososo: 812,
        vanbanso: "02",
        stttronghs: 21,
        loaivanban: "Văn bản pháp lý",
        noidung: "Văn bản pháp lý",
        soto: 100,
        mucdotincay: "Có",
        tinhtrang: "Mới",
        ghichu: "string",
      },
      {
        id: 4,
        hososo: 613,
        vanbanso: "02",
        stttronghs: 21,
        loaivanban: "Văn bản kiểm kê",
        noidung: "Văn bản kiểm kê",
        soto: 100,
        mucdotincay: "Có",
        tinhtrang: "Cũ",
        ghichu: "string",
      },
      {
        id: 5,
        hososo: 513,
        vanbanso: "02",
        stttronghs: 21,
        loaivanban: "Văn bản thường",
        noidung: "Văn bản thường",
        soto: 100,
        mucdotincay: "Có",
        tinhtrang: "Cũ",
        ghichu: "string",
      }
]