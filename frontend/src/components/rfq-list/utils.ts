/**
 * RFQ List Utilities
 */

import { RfqStatus } from './types';

/**
 * Get badge style based on status
 */
export const getStatusBadgeClass = (status: RfqStatus): string => {
  const baseClass = 'badge';

  switch (status) {
    case 'NEW':
      return `${baseClass} badge-new`;
    case 'IN_PROGRESS':
      return `${baseClass} badge-in-progress`;
    case 'PENDING':
      return `${baseClass} badge-pending`;
    case 'COMPLETED':
      return `${baseClass} badge-completed`;
    default:
      return baseClass;
  }
};

/**
 * Get badge text based on status
 */
export const getStatusText = (status: RfqStatus): string => {
  switch (status) {
    case 'NEW':
      return 'NEW';
    case 'IN_PROGRESS':
      return 'IN PROGRESS';
    case 'PENDING':
      return 'PENDING';
    case 'COMPLETED':
      return 'COMPLETED';
    default:
      return status;
  }
};

/**
 * Format route count
 */
export const formatRouteCount = (count: number): string => {
  return `${count} route${count !== 1 ? 's' : ''}`;
};
