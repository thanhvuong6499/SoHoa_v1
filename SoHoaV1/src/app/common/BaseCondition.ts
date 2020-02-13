export class BaseCondition<T> {
    PageSize: number;
    PageIndex: number;
    IN_WHERE: string = "";
    FromRecords?: number = (this.PageIndex * this.PageSize) - 1;
    Item?: T;
  }