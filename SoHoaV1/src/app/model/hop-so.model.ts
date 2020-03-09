
export class HopSo  {
    constructor(
        public gearBoxID?: number,
        public gearBoxCode?: string,
        public tabOfContID?: number,
        public tabOfContCode?: string,
        public gearBoxTitle?: string,
        public profileCount?: number,
        public numDoc?: number,
        public startDate?: Date,
        public endDate?: Date,
        public stDate?: string,
        public eDate?: string,
        public note?: string,
        public organID?: number,
        public fontID?:  number,
        public organName?: string,
        public fontName?: string
    ) {
    }
}

export const hopsos : HopSo[] = [
    {
    }
]