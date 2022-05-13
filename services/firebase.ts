import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// tslint:disable-next-line: ban-types
const config = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG ?? "");

export const app = initializeApp(config);
export const db = getFirestore(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

export const COLLECTIONS = {
  subscriptions: "subscriptions",
};

export const dbCollection = (col: keyof typeof COLLECTIONS) => {
  return collection(db, col);
};
