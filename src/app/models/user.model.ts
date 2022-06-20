import { environment } from "src/environments/environment";

const base_url =  environment.base_url; 

export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public role?: 'ADMIN_ROLE' | 'USER_ROLE',
    public img?: string,
    public uid?: string

  ) {}
  get getImg() {
    if ( !this.img ) {
      return `${ base_url }/uploads/users/${ this.uid }`;
    }

    return this.img;
  }
}
