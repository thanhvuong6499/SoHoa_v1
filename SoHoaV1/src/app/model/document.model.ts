
export class Document  {
      public documentId?: number
      // Mã định danh văn bản
      public documentCode?: string
      /// Số thứ tự văn bản
      public docOrdinal?: number
      public docTypeId?: number
      // Loại văn bản
      public typeName?: string
      // Mã hồ sơ trong db
      public fileId?: number
      // Mã định danh hồ sơ
      public fileCode?: number
      // Văn bản số
      public codeNumber?: string
      public organName?:string
      public fontId?: number
      public tableOfContentId?: number
      public gearBoxId?: number
      public organId?:number
      public computerFileId?: number
      // Ký hiệu của văn bản
      public codeNotation?: string
      /// Ngày, tháng, năm văn bản
      public issuedDate?: Date
      // Nội dung
      public subject?: string
      // Ngôn ngữ
      public language?: string
      // Ghi chu
      public description?: string
      // Số tờ
      public pageAmount?: number
      // Ký hiệu thông tin
      public inforSign?: string
      // Từ khóa
      public keyword?: string
      // Chế độ sử dụng
      public mode?: string
      public fileUrl?: string
      // Tình trạng
      public formatName?: string
      // Tình trạng Id
      public formatId?:number
      // Mức độ tin cậy
      public confidenceLevel?: string
      // Bút tích
      public autograph?: string
      // Tên tệp lưu trữ
      public computerFileName?:string
      
      // id file ứng với văn bản
      public languageId?:number
      public confidenceLevelId?: number
      public isDeleted?: string
      public updatedBy?: string
      public status?: number
      public confirmed?: number
      public createdBy?: string
      public updatedDate?: Date
      public createdDate?: Date
      public signature?: number;
      // đường dẫn tuyệt đối đến file trên server
      public serverPath?: string;
      public fileName?: string;
      public clientUrl?: string;
      public profileNumber?: string;
      public organizationIssued?: string;
    }