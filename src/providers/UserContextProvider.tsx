import { axiosClient, isSameOrBefore } from "../adapters";
import {
  createContext,
  useLayoutEffect,
  useNavigate,
  useState,
} from "../adapters/ReactAdapter";
import { User } from "../interfaces";

export interface UserContextValue {
  user: User | null;
  changeUser: (user: User) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextValue | null>(null);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  function changeUser(user: User | null) {
    const newUser = user
      ? ({
          ...user,
          info: {
            ...user?.info,
            strFullName: `${
              user?.info.strName.split(" ")[0].charAt(0).toUpperCase() +
              user?.info.strName.split(" ")[0].slice(1)
            } ${
              user?.info.strLastName.split(" ")[0].charAt(0).toUpperCase() +
              user?.info.strLastName.split(" ")[0].slice(1)
            }`,
          },
        } as User)
      : user;

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("redirectPath");
    navigate("/");
    window.location.reload();
  }

  useLayoutEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) return;

    const user = JSON.parse(userData) as User;

    const expiredSesion = isSameOrBefore(user.age, new Date());
    if (expiredSesion) logout();

    setUser(user);
    axiosClient.interceptors.request.use((config: any) => ({
      ...config,
      headers: {
        ...(config.headers as any),
        Authorization: `bearer ${user.token}`,
      },
    }));
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        changeUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
