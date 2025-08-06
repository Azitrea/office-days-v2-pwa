import { Timestamp } from 'firebase/firestore';

export interface FirebseStoredMessage {
  id: string;
  createdAt: Timestamp;
  body: string;
  userId: string;
  title: string;
  displayName?: string;
  acceptDecline: Record<string, string>;
}

export enum AcceptDecline {
  ACCEPT = 'accept',
  DECLINE = 'decline',
}
