import { Permission } from './permissions';

export interface UserInfo {
  strDni: string;
  strName: string;
  strLastName: string;
  strFullName: string;
  strUserType: 'emp' | 'ext';
  strUser: string;
  exp: number;
}

export interface User {
  isLogged: boolean;
  token: string;
  info: UserInfo;
  age: string;
  permissions: Permission[];
  image: string;
}
