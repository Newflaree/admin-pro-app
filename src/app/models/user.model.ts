export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public google?: string,
    public role?: string,
    public img?: string,
    public uid?: string
  ) {}
}
