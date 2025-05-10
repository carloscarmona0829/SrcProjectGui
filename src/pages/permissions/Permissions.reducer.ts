import { PermissionByUser } from '../../interfaces';

export interface State {
  loading: boolean;
  errorMessage: boolean;
  permissions: PermissionByUser[] | undefined;
  selectedPermission: PermissionByUser | undefined;
  openPermissionDialog: boolean;
  openNewPermissionDialog: boolean;
}

export const initialState: State = {
  loading: false,
  errorMessage: false,
  permissions: undefined,
  selectedPermission: undefined,
  openPermissionDialog: false,
  openNewPermissionDialog: false,
};

export default function reducer(
  state: State,
  action: {
    type: string;
    payload: any;
  }
): State {
  switch (action.type) {
    case 'change-loading':
      return { ...state, loading: action.payload };
    case 'change-error-message':
      return { ...state, errorMessage: action.payload };
    case 'change-permissions':
      return { ...state, permissions: action.payload };
    case 'change-selected-permission':
      return { ...state, selectedPermission: action.payload };
    case 'change-open-permission-dialog':
      return { ...state, openPermissionDialog: action.payload };
    case 'change-open-new-permission-dialog':
      return { ...state, openNewPermissionDialog: action.payload };
    default:
      return state;
  }
}
