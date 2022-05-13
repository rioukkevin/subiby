import { addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { UserContext } from "../components/Auth";
import { db, dbCollection } from "../services/firebase";
import { ISubscription } from "../typings/Subscriptions";

interface IProps {}

interface IReturn {
  loading: boolean;
  create: (sub: Omit<ISubscription, "id">) => void;
  update: (sub: ISubscription) => void;
  deleteS: (id: string) => void;
}

export const useSubcription = (props: IProps): IReturn => {
  const user = useContext(UserContext);

  const [loading, setLoading] = useState<boolean>(false);

  const create = async (sub: Omit<ISubscription, "id">) => {
    if (user?.email) {
      setLoading(true);
      await addDoc(dbCollection("subscriptions"), {
        ...sub,
        firstPayment: sub.firstPayment.toDate().getTime(),
        accountId: user?.email,
      });
      setLoading(false);
    }
  };

  const deleteS = async (id: string) => {
    if (user?.email) {
      setLoading(true);
      await deleteDoc(doc(db, "subscriptions", id));
      setLoading(false);
    }
  };

  const update = async (sub: ISubscription) => {
    if (user?.email) {
      setLoading(true);
      const docRef = doc(dbCollection("subscriptions"), sub.id);
      await updateDoc(docRef, {
        ...sub,
        firstPayment: sub.firstPayment.toDate().getTime(),
        accountId: user?.email,
      });
      setLoading(false);
    }
  };

  return {
    loading,
    create,
    update,
    deleteS,
  };
};
