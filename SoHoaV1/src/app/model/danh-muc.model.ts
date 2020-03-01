
export class DanhMuc  {
    constructor(
        public tabOfContID?: number,
        public fontID?: number,
        public fontCode?: string,
        public tabOfContCode?: string,
        public tabOfContName?: string,
        public tabOfContNumber?: number,
        public gearBoxCount?: number,
        public note?: string,
        public organName?: string,
        public storageID?: number
    ) {
    }
}
export const danhmucs : DanhMuc[] = [
]