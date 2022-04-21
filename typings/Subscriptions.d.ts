import { Dayjs } from "dayjs";

export interface ISubscription {
  id: string;
  label: string;
  details: string;
  color: string;
  firstPayment: Dayjs;
  price: number;
  recurrenceCount: number;
  recurrenceType: "year" | "month" | "day" | "hour" | "minute" | "second";
  tags: string[];
}
