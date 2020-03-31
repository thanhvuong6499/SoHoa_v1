
export class HoSo  {
    
    public fileCode? : string;
    public identifier? : string;
    public organId? : string;
    public gearBoxCode? : string;
    public gearBoxId? : number;
    public fileCatalog? : number;
    public fileNotation? : string;
    public profileTypeId? : number; 

    public title? : string;

    public maintenance? : string;
    public rights? : string;

    public language? : string;
    public startDate? : Date;
    public endDate? : Date;
    /// <summary>
    /// tổng số văn bản trong hồ sơ
    /// </summary>
    public totalDoc? : number;
    public description? : string;
    /// <summary>
    /// kí hiệu thông tin
    /// </summary>
    public inforSign? : string;
    /// <summary>
    /// từ khoá
    /// </summary>
    public keyWord? : string;
    /// <summary>
    /// số lượng tờ
    /// </summary>
    public sheetNumber? : number;
    public ageNumber? : number;
    public format? : string;
    public profileTypeName? : string;
    public gearBoxTitle? : string;
    public createdBy? : string;
    public updatedBy? : string;
    public profileId?: number;
    public totalFiles? : number;
    public profileNumber?: number;
    public status?: number;
}

export const hosos : HoSo[] = [
    {
    }
]