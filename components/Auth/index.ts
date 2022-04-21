import { createContext } from "react";

import { User } from "firebase/auth";

export type IUserContext = User | null;

export const UserContext = createContext<IUserContext>(null);
