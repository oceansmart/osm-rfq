/**
 * RFQ List Table Types
 * Extracted from Figma node 227:60760
 */

export type RfqStatus = 'NEW' | 'IN_PROGRESS' | 'PENDING' | 'COMPLETED';

export interface RfqItem {
  id: string;
  rfqId: string;
  receivedDate: string;
  deadline: string;
  shipper: string;
  routeCount: number;
  status: RfqStatus;
  assignedTo: {
    name: string;
    email: string;
    avatar?: string;
  };
  contactPerson: {
    name: string;
    email: string;
    avatar?: string;
  };
}
