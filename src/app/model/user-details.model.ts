import { Timestamp } from 'firebase/firestore';

export interface UserProfileData {
  id?: string;
  createdAt: Timestamp;
  details: UserDetails;
}

export interface UserDetails {
  receiveMessages: boolean;
}
