
import { Token } from './token.model';
import { UserRole } from './userrole.model';
export class User {
       public Id: number;
       public UserName: string;
       public userrole?: UserRole = new UserRole();
       public Password? : string;
       public roles?: string;
       public CreateBy?: string;
       public UpdateBy?: string;
       public CreateDate?: string;
       public UpdateDate?: string;
       public Status?: number;
       public roleName: string;
       public menuRole: string;
       public Token?: Token = new Token();
}
