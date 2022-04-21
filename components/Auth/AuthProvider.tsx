import { onAuthStateChanged } from "firebase/auth";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { auth } from "../../services/firebase";
import { IUserContext, UserContext } from "./";
import { Login } from "./Login";

export interface IProps {
  children: ReactNode;
}

export const AuthProvider: FC<IProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUserContext>(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (userAuth) => {
      setUser(userAuth);
      console.log(userAuth);
      setLoading(false);
    });
  }, []);

  if (!user) return <Login loading={loading} />;

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};
