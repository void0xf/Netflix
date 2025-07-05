import { Timestamp } from 'firebase/firestore';

export interface User {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Timestamp;
  admin?: boolean;
}
