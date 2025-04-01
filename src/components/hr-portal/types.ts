
export type InviteStatus = 'pending' | 'sent' | 'accepted';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  inviteStatus: InviteStatus;
  accessLink?: string;
}
