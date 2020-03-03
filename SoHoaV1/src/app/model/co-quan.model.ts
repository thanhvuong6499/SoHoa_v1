import { Phong } from './phong.model';

export class CoQuan  {
        public coQuanID?: number
        public tenCoQuan?: string
        public diaChiID?: string
        public loaiCoQuanID?: string
        public tinhID? : number
        public huyenID? :number = 0
        public xaPhuongID ?: number = 0
        public createBy? : string
        public updatedBy? :string
        public addressDetail? :string
        public addressID? :number
        public organType? : string

}
export class organ {
  constructor(
    public organID?: number,
    public tenCoQuan?: string
  ){}
}

export const coquans = [
    {}
]
