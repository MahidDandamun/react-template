import React from 'react';
import ButtonUI from '../ui/ButtonUI';
import noDataIcon from "../../assets/icons/no-data.svg";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  actionType: 'delete' | 'save' | 'submit';
  doctype: string;
}

const ConfirmModal = ({ isOpen, onClose, onConfirm, actionType,doctype }: ConfirmModalProps) => {
  if (!isOpen) return null;

  const getModalContent = () => {
    switch (actionType) {
      case 'delete':
        return {
          title: `Are you sure you want to delete this ${doctype}?`,
          description: "Once deleted, it cannot be recovered",
          submitButtonName: "Yes, delete it",
        };
      case 'submit':
        return {
          title: `Are you sure you want to submit this ${doctype}?`,
          description: `By submitting this ${doctype}, it cannot be edited`,
          submitButtonName: "Yes, submit it",
        };
      case 'save':
        return {
          title: `Are you sure you want to save the changes to this ${doctype}?`,
          description: "You can edit it again later.",
          submitButtonName: "Yes, save it",
        };
      default:
        return {
          title: "Confirm Action",
          description: "Are you sure you want to proceed?",
          submitButtonName: "Submit",
        };
    }
  };

  const { title, description, submitButtonName } = getModalContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-10 rounded-lg shadow-lg w-1/5 flex flex-col items-center justify-center">
        <img src={noDataIcon} alt="" width="45" height="45" className="mb-4" />
        <h2 className="text-xl font-semibold mb-4 text-center">
          {title}
        </h2>
        <p className="mb-6 text-zinc-500 text-center">
          {description}
        </p>
        <div className="flex justify-center space-x-4">
          <ButtonUI variant="outline" buttonName="No, wait" size="medium" onClick={onClose} />
          <ButtonUI variant="dark" buttonName={submitButtonName} size="medium" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
