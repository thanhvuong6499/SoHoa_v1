export class ReturnResult<T>{
    isSuccess: boolean;
    errorMessage: string;
    errorCode: string;
    item: T;
    listItem: T[];
    hasData: boolean;
    hasError: boolean;
    totalRows?: number;
  }