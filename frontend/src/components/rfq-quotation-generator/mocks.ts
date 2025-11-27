import { MappingItem } from './types';

export const MOCK_MAPPING_ITEMS: MappingItem[] = [
  {
    id: '1',
    customerColumn: 'Orig (POL)',
    systemField: 'Origin Port',
    status: 'Mapped',
  },
  {
    id: '2',
    customerColumn: 'DEST (POD)',
    systemField: 'Destination Port',
    status: 'Mapped',
  },
  {
    id: '3',
    customerColumn: 'OFRT',
    systemField: 'Ocean Freight',
    status: 'Mapped',
  },
  {
    id: '4',
    customerColumn: 'BAF/FAF',
    systemField: 'BAF',
    status: 'Mapped',
  },
  {
    id: '5',
    customerColumn: 'DTHC (POD)',
    systemField: 'THC Destination',
    status: 'Mapped',
  },
  {
    id: '6',
    customerColumn: 'ETHC (POL)',
    systemField: 'THC Origin',
    status: 'Mapped',
  },
];

