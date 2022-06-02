import { environment } from "src/environments/environment";

const base_url = environment.base_url;

interface _HospitalUser {
  _id: string;
  name?: string;
  img?: string;
}

export class Hospital {
  constructor(
    public name: string,
    public _id?: string,
    public img?: string,
    public user?: _HospitalUser
  ) {}
}
