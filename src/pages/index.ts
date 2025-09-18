import EmailConfirm from './other/EmailConfirm';
import ForgotPassword from './other/ForgotPassword';
import Home from './other/Home';
import Login from "./other/Login";
import NotFound from './other/NotFound';
import ResetPassword from './other/ResetPassword';
import SignUp from './other/SignUp';
import Permissions from './permissions/Permissions';
import reducer, {
    initialState,
    State,
} from "./permissions/Permissions.reducer";
import DigitalCard from './security/DigitalCard';
import Entrance from './security/Entrance';
import Settings from './settings/Settings';

export { DigitalCard, EmailConfirm, Entrance, ForgotPassword, Home, initialState, Login, NotFound, Permissions, reducer, ResetPassword, Settings, SignUp };
export type { State };

