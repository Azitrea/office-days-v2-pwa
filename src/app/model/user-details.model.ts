import { Timestamp } from 'firebase/firestore';

export interface UserProfileData {
  id?: string;
  createdAt: Timestamp;
  details: UserDetails;
  displayName: string;
}

export interface UserDetails {
  receiveMessages: boolean;
  [key: string]: boolean | undefined
}
