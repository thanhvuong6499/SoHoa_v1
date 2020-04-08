
export class LogActivity  {
    constructor(
        public userName?: string,
        public userID?: number,
        public content?: string,
        public profileNumber?: string,
        public creatorName?: string,
        public updatorName?: string,
        public createDate?: Date,
        public updateDate?: Date
    ) {
    }
}

export const logActivity : LogActivity[] = [
    {
    }
]