import React from "react";

type ValidStatus =
  | "draft"
  | "submitted"
  | "enabled"
  | "disabled"
  | "toReceiveAndBill"
  | "toDeliverAndBill"
  | "toBill"
  | "inProcess"
  | "completed"
  | "cancelled"
  | "returned";

interface StatusProps {
  variant: ValidStatus;
}

const statusVariant: Record<ValidStatus, { style: string; text: string }> = {
  draft: { style: "bg-gray-200 text-gray-500", text: "Draft" },
  submitted: { style: "bg-sky-200 text-sky-600", text: "Submitted" },
  enabled: { style: "bg-green-200 text-green-600", text: "Enabled" },
  disabled: { style: "bg-gray-200 text-gray-500", text: "Disabled" },
  toReceiveAndBill: {
    style: "bg-amber-200 text-amber-600",
    text: "To Receive and Bill",
  },
  toDeliverAndBill: {
    style: "bg-amber-200 text-amber-600",
    text: "To Deliver and Bill",
  },
  toBill: { style: "bg-amber-200 text-amber-600", text: "To Bill" },
  inProcess: { style: "bg-amber-200 text-amber-600", text: "In Process" },
  completed: { style: "bg-green-200 text-green-600", text: "Completed" },
  cancelled: { style: "bg-red-200 text-red-600", text: "Cancelled" },
  returned: { style: "bg-red-200 text-red-600", text: "Returned" },
};

const StatusUI = ({ variant }: StatusProps) => {
  return (
    <span
      className={`flex px-1 lg:px-4 py-1 rounded text-xs justify-center font-semibold ${statusVariant[variant].style}`}
    >
      {statusVariant[variant].text}
    </span>
  );
};

export default StatusUI;
