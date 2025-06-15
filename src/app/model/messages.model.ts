import { Timestamp } from "firebase/firestore";

export interface FirebseStoredMessage {
  id: string;
  createdAt: Timestamp;
  body: string;
  userId: string;
  title: string;
  displayName?: string;
}
