import React, { useState, ReactNode } from "react";
interface Props {
  childeren: ReactNode;
}
export type AuthUser = {
  accessToken: string,
  email: string,
  roles: object,
  username: string,
}
type AuthContextType = {
  auth: AuthUser|null,
  setAuth: React.Dispatch<React.SetStateAction<AuthUser | null>>
}
const AuthContext = React.createContext<AuthContextType | null>(null);


export const AuthProvider = ({ childeren }: Props) => {
  const [auth, setAuth] = useState<AuthUser | null>(null);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {childeren}
    </AuthContext.Provider>
  );
};

export default AuthContext;
