import { Timestamp } from 'firebase-admin/firestore';

export interface UserProfileData {
  id?: string;
  createdAt: Timestamp;
  details: UserDetails;
}

export interface UserDetails {
  receiveMessages: boolean;
  [key: string]: boolean;
}
