import { NavLogsByUserList } from '../../interfaces/nav-logs';

export interface State {
  errorMessage: boolean;
  navLogs: NavLogsByUserList[] | undefined;
}

export const initialState: State = {
  errorMessage: false,
  navLogs: undefined
};

export default function reducer(
  state: State,
  action: {
    type: string;
    payload: any;
  }
): State {
  switch (action.type) {
    case 'change-error-message':
      return { ...state, errorMessage: action.payload };
    case 'change-nav-logs':
      return { ...state, navLogs: action.payload };    
    default:
      return state;
  }
}
