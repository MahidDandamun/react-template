import React, { useCallback, useEffect, useRef, useState } from "react";
import ButtonUI from "../../ui/ButtonUI";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { toast } from "react-toastify";
import { deleteWorkReceipt, getWorkReceiptInfo, updateWorkReceipt } from "../../../store/services/WorkReceiptService";
import { formatTime } from "../../../utils/commonUtils";
import Spinner from "../../ui/SpinnerUI";
import Input from "../../shared/Input";
import ConfirmModal from "../../shared/ConfirmModal";
import Header from "../../shared/Header";
import ActivityLog from "../../shared/ActivityLog";

const WorkReceiptInfo = () => {
  const { name }: any = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const { workReceiptInfo, isLoading } = useAppSelector((state) => state.workReceipt);
  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isActivityLogOpen, setIsActivityLogOpen] = useState(false);

  const handleCancelClick = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setIsEditing(!isEditing);
  };

  const handleSubmitClick = () => {
    setIsSubmitModalOpen(true);
  }

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  }

  const handleSaveClick = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaveModalOpen(true);
  }


  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleConfirmSubmit = useCallback(async () => {
    try {
      const payload = { docstatus: 1 };

      const updatePayload = { name, payload }

      await dispatch(updateWorkReceipt(updatePayload)).unwrap()
      toast.success('Successfully submitted Work Receipt')
      dispatch(getWorkReceiptInfo(name))
      setIsSubmitModalOpen(false);
    } catch (error) {
      toast.error('Failed submitting Work Receipt')
      setIsSubmitModalOpen(false)
    }
  }, [dispatch, name])

  const handleConfirmDelete = useCallback(async () => {
    try {
      await dispatch(deleteWorkReceipt(name)).unwrap();
      toast.success('Successfully deleted Work Receipt')
      navigate('/work-receipt')
      setIsDeleteModalOpen(false)
    } catch (error) {
      toast.error('Failed deleting Work Receipt')
      setIsDeleteModalOpen(false)
    }
  }, [dispatch, name, navigate])

  const handleConfirmSave = useCallback(async () => {

    if (formRef.current) {
      const formData = new FormData(formRef.current)
      const posting_date = formData.get("posting_date") as string;
      const posting_time = formData.get("posting_time") as string;

      const payload = {
        posting_date,
        posting_time,
      };
      console.log(payload)
      const updatePayload = { name, payload };
      try {
        await dispatch(updateWorkReceipt(updatePayload)).unwrap();
        toast.success('Work receipt updated successfully!');
        await dispatch(getWorkReceiptInfo(name)).unwrap();
        setIsEditing(false)
        setIsSaveModalOpen(false);
      } catch (error) {
        toast.error('Failed to update work receipt.');
        setIsSaveModalOpen(false)
        setIsEditing(false)
      }
    }
  }, [dispatch, name])

  useEffect(() => {

    dispatch(getWorkReceiptInfo(name))
  }, [dispatch, name]);

  const handleNavigation = () => {
    navigate('/work-receipt')
  }

  if (isLoading) return <div><Spinner /></div>;

  return (
    <div className="p-2">
      <Header doctypeInfo={workReceiptInfo} name={name} isEditing={isEditing} moduleBreadcrumb={({ parentModule: 'Buying', module: 'Work Receipt' })}
        handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} handleSubmitClick={handleSubmitClick} handleNavigation={handleNavigation} editDisabled={true}
        handleActivityLogClick={() => setIsActivityLogOpen(!isActivityLogOpen)} />

      <form ref={formRef} onSubmit={handleSaveClick}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">A. Work receipt details</h2>
          <div className="grid grid-cols-1 gap-4 w-1/2 pl-10">
            <div>
              <Input label="Supplier" type="text" name="supplier" defaultValue={workReceiptInfo?.supplier} required disabled={!isEditing} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input label="Transaction Date" type="date" name="posting_date" defaultValue={workReceiptInfo?.posting_date} required disabled={!isEditing} />
              </div>
              <div>
                <Input label="Posting time" type="time" name="posting_time" defaultValue={formatTime(workReceiptInfo?.posting_time || '00:00:00')} required disabled={!isEditing} />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6">B. Item details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {workReceiptInfo?.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.item_code}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.qty}</td>
                    <td className="px-6 py-4 whitespace-nowrap">PHP {item.rate.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <hr className="my-4" />
        {isEditing &&
          <div className="mt-8 flex justify-end space-x-4">
            <ButtonUI variant="danger" buttonName="Cancel" size="medium" iconName="cancel" onClick={handleCancelClick} />
            <ButtonUI variant="dark" type="submit" buttonName="Save" size="medium" />
          </div>}
      </form>

      <ActivityLog isOpen={isActivityLogOpen} onClose={() => setIsActivityLogOpen(false)} doctypeInfo={workReceiptInfo} />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        actionType="delete"
        doctype="Work Receipt"
      />

      <ConfirmModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        actionType="submit"
        doctype="Work Receipt"
      />

      <ConfirmModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onConfirm={handleConfirmSave}
        actionType="save"
        doctype="Work Receipt"
      />
    </div>
  );
};

export default WorkReceiptInfo;