import Home from './other/Home';
import Login from "./other/Login";
import NotFound from './other/NotFound';
import SignUp from './other/SignUp';
import Permissions from './permissions/Permissions';
import reducer, {
    initialState,
    State,
} from "./permissions/Permissions.reducer";

export { Home, initialState, Login, NotFound, Permissions, reducer, SignUp };
export type { State };

