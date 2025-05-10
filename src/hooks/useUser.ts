
import { useContext } from '../adapters/ReactAdapter';
import { UserContext, UserContextValue } from '../providers';

export const useUser = (): UserContextValue => {
  const context = useContext(UserContext) as UserContextValue;

  if (!context) {
    throw new Error(
      'User provider not found. Try wrapping parent component with UserProvider'
    );
  }

  return context;
};
