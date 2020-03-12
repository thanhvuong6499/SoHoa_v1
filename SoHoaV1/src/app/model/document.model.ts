export class Document {
        public DocumentId? :number;
        /// <summary>
        /// Mã định danh văn bản
        /// </summary>
        public DocumentCode ? : string;
        /// <summary>
        /// Số thứ tự văn bản
        /// </summary>
        public DocOrdinal ?: number;
        /// <summary>
        /// Mã hồ sơ
        /// </summary>
        public FileId ?: number;
        public DocTypeId ? : number;
        /// <summary>
        /// Số của văn bản
        /// </summary>
        public CodeNumber ?: string;
        /// <summary>
        /// Ký hiệu của văn bản
        /// </summary>
        public CodeNotation ?: string;
        /// <summary>
        /// Ngày, tháng, năm văn bản
        /// </summary>
        public IssuedDate ?: Date
        /// <summary>
        /// Nội dung
        /// </summary>
        public Subject ? : string;
        public LanguageId ?: number;
        /// <summary>
        /// Số lượng trang văn bản
        /// </summary>
        public PageAmount ?: number;
        /// <summary>
        /// Ghi chú
        /// </summary>
        public Description ?: string;
        /// <summary>
        /// Ký hiệu thông tin
        /// </summary>
        public InforSign ?: string;
        /// <summary>
        /// Từ khóa
        /// </summary>
        public Keyword ?: string;
        /// <summary>
        /// Chế độ sử dụng
        /// </summary>
        public Mode ?: string;
        public ConfidenceLevelId ?: number;
        /// <summary>
        /// Bút tích
        /// </summary>
        public Autograph ?: string;
        /// <summary>
        /// Tình trạng vật lý
        /// </summary>
        public Format ?: string;
        public ComputerFileId ?: number;
        public CreatedDate ?: Date;
        public UpdatedDate ?: Date;
        public CreatedBy ?: string;
        public UpdatedBy ?: string;
        
        public profileId?: number;
        
}