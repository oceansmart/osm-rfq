/**
 * RFQ List Mock Data
 * Based on Figma design node 227:60760
 */

import { RfqItem } from './types';

export const mockRfqData: RfqItem[] = [
  {
    id: '1',
    rfqId: 'RFQ-2025-0001',
    receivedDate: 'Jan 6, 2025',
    deadline: 'Jan 6, 2025',
    shipper: 'Asahi Glass',
    routeCount: 3,
    status: 'NEW',
    assignedTo: {
      name: 'Olivia Rhye',
      email: 'olivia@oceansmart.ai',
      avatar: '/icons/rfq-list/avatar.svg',
    },
    contactPerson: {
      name: 'Olivia Rhye',
      email: 'olivia@oceansmart.ai',
    },
  },
  {
    id: '2',
    rfqId: 'RFQ-2025-0002',
    receivedDate: 'Jan 7, 2025',
    deadline: 'Jan 15, 2025',
    shipper: 'Samsung Electronics',
    routeCount: 5,
    status: 'IN_PROGRESS',
    assignedTo: {
      name: 'Phoenix Baker',
      email: 'phoenix@oceansmart.ai',
      avatar: '/icons/rfq-list/avatar-1.svg',
    },
    contactPerson: {
      name: 'Lana Steiner',
      email: 'lana@oceansmart.ai',
    },
  },
  {
    id: '3',
    rfqId: 'RFQ-2025-0003',
    receivedDate: 'Jan 8, 2025',
    deadline: 'Jan 20, 2025',
    shipper: 'Hyundai Motor',
    routeCount: 2,
    status: 'PENDING',
    assignedTo: {
      name: 'Candice Wu',
      email: 'candice@oceansmart.ai',
      avatar: '/icons/rfq-list/avatar-2.svg',
    },
    contactPerson: {
      name: 'Natali Craig',
      email: 'natali@oceansmart.ai',
    },
  },
  {
    id: '4',
    rfqId: 'RFQ-2025-0004',
    receivedDate: 'Jan 5, 2025',
    deadline: 'Jan 12, 2025',
    shipper: 'LG Display',
    routeCount: 4,
    status: 'COMPLETED',
    assignedTo: {
      name: 'Drew Cano',
      email: 'drew@oceansmart.ai',
      avatar: '/icons/rfq-list/avatar-3.svg',
    },
    contactPerson: {
      name: 'Orlando Diggs',
      email: 'orlando@oceansmart.ai',
    },
  },
  {
    id: '5',
    rfqId: 'RFQ-2025-0005',
    receivedDate: 'Jan 9, 2025',
    deadline: 'Jan 25, 2025',
    shipper: 'SK Hynix',
    routeCount: 6,
    status: 'NEW',
    assignedTo: {
      name: 'Kate Morrison',
      email: 'kate@oceansmart.ai',
      avatar: '/icons/rfq-list/avatar-4.svg',
    },
    contactPerson: {
      name: 'Andi Lane',
      email: 'andi@oceansmart.ai',
    },
  },
  {
    id: '6',
    rfqId: 'RFQ-2025-0006',
    receivedDate: 'Jan 10, 2025',
    deadline: 'Jan 18, 2025',
    shipper: 'POSCO',
    routeCount: 3,
    status: 'IN_PROGRESS',
    assignedTo: {
      name: 'Koray Okumus',
      email: 'koray@oceansmart.ai',
    },
    contactPerson: {
      name: 'Drew Cano',
      email: 'drew@oceansmart.ai',
    },
  },
  {
    id: '7',
    rfqId: 'RFQ-2025-0007',
    receivedDate: 'Jan 11, 2025',
    deadline: 'Jan 22, 2025',
    shipper: 'Sony Corporation',
    routeCount: 4,
    status: 'PENDING',
    assignedTo: {
      name: 'Alec Whitten',
      email: 'alec@oceansmart.ai',
    },
    contactPerson: {
      name: 'Kate Morrison',
      email: 'kate@oceansmart.ai',
    },
  },
  {
    id: '8',
    rfqId: 'RFQ-2025-0008',
    receivedDate: 'Jan 4, 2025',
    deadline: 'Jan 11, 2025',
    shipper: 'Panasonic',
    routeCount: 2,
    status: 'COMPLETED',
    assignedTo: {
      name: 'Demi Wilkinson',
      email: 'demi@oceansmart.ai',
    },
    contactPerson: {
      name: 'Phoenix Baker',
      email: 'phoenix@oceansmart.ai',
    },
  },
  {
    id: '9',
    rfqId: 'RFQ-2025-0009',
    receivedDate: 'Jan 12, 2025',
    deadline: 'Jan 28, 2025',
    shipper: 'Kia Corporation',
    routeCount: 5,
    status: 'IN_PROGRESS',
    assignedTo: {
      name: 'Orlando Diggs',
      email: 'orlando@oceansmart.ai',
    },
    contactPerson: {
      name: 'Candice Wu',
      email: 'candice@oceansmart.ai',
    },
  },
  {
    id: '10',
    rfqId: 'RFQ-2025-0010',
    receivedDate: 'Jan 13, 2025',
    deadline: 'Jan 30, 2025',
    shipper: 'Toshiba',
    routeCount: 7,
    status: 'NEW',
    assignedTo: {
      name: 'Natali Craig',
      email: 'natali@oceansmart.ai',
    },
    contactPerson: {
      name: 'Koray Okumus',
      email: 'koray@oceansmart.ai',
    },
  },
];
