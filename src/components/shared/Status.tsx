import React from 'react';

type ValidStatus =
  | 'draft'
  | 'submitted'
  | 'inprocess'
  | 'completed'
  | 'cancelled'
  | 'returned'
  | 'closed'
  | 'enabled'
  | 'disabled'
  | 'active'
  | 'left'
  | 'suspended'
  | 'default';

interface StatusProps {
  status?: string;
}

const statusStyles: Record<ValidStatus, { bg: string; text: string }> = {
  draft: { bg: 'bg-gray-200', text: 'text-gray-500' },
  submitted: { bg: 'bg-sky-200', text: 'text-sky-600' },
  inprocess: { bg: 'bg-amber-200', text: 'text-amber-600' },
  completed: { bg: 'bg-green-200', text: 'text-green-600' },
  cancelled: { bg: 'bg-red-200', text: 'text-red-800' },
  returned: { bg: 'bg-red-200', text: 'text-red-800' },
  closed: { bg: 'bg-green-200', text: 'text-green-800' },
  enabled: { bg: 'bg-green-200 ', text: 'text-green-600' },
  disabled: { bg: 'bg-gray-200 ', text: 'text-gray-500' },
  active: { bg: 'bg-green-200', text: 'text-green-600' },
  left: { bg: 'bg-gray-200', text: 'text-gray-500' },
  suspended: { bg: 'bg-red-200', text: 'text-red-800' },
  default: { bg: 'bg-green-200', text: 'text-green-600' },
};

const Status: React.FC<StatusProps> = ({ status }) => {
  const lowercasedStatus = (status || '').toLowerCase();

  const validStatus: ValidStatus = lowercasedStatus.includes('returned')
    ? 'returned'
    : statusStyles[lowercasedStatus as ValidStatus]
    ? (lowercasedStatus as ValidStatus)
    : 'inprocess';

  return (
    <span className={`inline-block px-2 lg:px-4 py-1 rounded text-[0.7rem] lg:text-xs font-semibold ${statusStyles[validStatus].bg} ${statusStyles[validStatus].text}`}>
      {status}
    </span>
  );
};

export default Status;
