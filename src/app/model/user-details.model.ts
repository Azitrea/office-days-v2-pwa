import { Timestamp } from 'firebase/firestore';

export interface UserProfileData {
  createdAt: Timestamp;
  details: UserDetails;
}

export interface UserDetails {
  receiveMessages: boolean;
}
