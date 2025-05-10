export interface Permission {
  strModule: string;
  strSubModules: { strSubModule: string }[];
}

export interface PermissionByUser {
  intPermissionId: number;
  strName: string;
  strJobTitle: string;
  strUserName: string;
  strRoute: string;
}

export interface UsersList {
  strDni: string;
  strUserName: string;
  strFullName: string;
}

export interface RoutesList {
  intRouteId: number;
  strRouteName: string;
}
