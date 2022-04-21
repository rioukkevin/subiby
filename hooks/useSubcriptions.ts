import dayjs from "dayjs";
import { doc, onSnapshot, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/Auth";
import { db, dbCollection } from "../services/firebase";
import { ISubscription } from "../typings/Subscriptions";

interface IProps {}

interface IReturn {
  subscriptions: ISubscription[];
}

export const useSubcriptions = (props: IProps): IReturn => {
  const user = useContext(UserContext);
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);

  useEffect(() => {
    const q = query(
      dbCollection("subscriptions"),
      where("accountId", "==", user?.email)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const datas: ISubscription[] = [];

      querySnapshot.forEach((doc) => {
        const rawDoc: any = doc.data();

        const parsedDoc: ISubscription = {
          id: doc.id,
          ...rawDoc,
          firstPayment: dayjs(new Date(rawDoc.firstPayment)),
          price: parseFloat(rawDoc.price),
          recurrenceCount: parseInt(rawDoc.recurrenceCount),
        };
        datas.push(parsedDoc);
      });

      setSubscriptions(datas);
    });

    return () => {
      console.log("UNSUB");
      unsubscribe();
    };
  }, [user?.email]);

  return {
    subscriptions,
  };
};
