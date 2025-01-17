import React, { useCallback, useEffect, useRef, useState } from "react";
import ButtonUI from "../../ui/ButtonUI";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { toast } from "react-toastify";
import {
  deletePurchaseReceipt,
  getPurchaseReceiptInfo,
  updatePurchaseReceipt,
} from "../../../store/services/PurchaseReceiptService";
import { formatTime } from "../../../utils/commonUtils";
import Spinner from "../../ui/SpinnerUI";
import Input from "../../shared/Input";
import ConfirmModal from "../../shared/ConfirmModal";
import Header from "../../shared/Header";
import ActivityLog from "../../shared/ActivityLog";

const PurchaseReceiptInfo = () => {
  const { name }: any = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const { purchaseReceiptInfo, isLoading } = useAppSelector(
    (state) => state.purchaseReceipt
  );
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
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleSaveClick = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaveModalOpen(true);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleConfirmSubmit = useCallback(async () => {
    try {
      const payload = { docstatus: 1 };

      const updatePayload = { name, payload };

      await dispatch(updatePurchaseReceipt(updatePayload)).unwrap();
      toast.success("Successfully submitted Purchase Receipt");
      dispatch(getPurchaseReceiptInfo(name));
      setIsSubmitModalOpen(false);
    } catch (error) {
      toast.error("Failed submitting Purchase Receipt");
      setIsSubmitModalOpen(false);
    }
  }, [dispatch, name]);

  const handleConfirmDelete = useCallback(async () => {
    try {
      await dispatch(deletePurchaseReceipt(name)).unwrap();
      toast.success("Successfully deleted Purchase Receipt");
      navigate("/purchase-receipt");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Failed deleting Purchase Receipt");
      setIsDeleteModalOpen(false);
    }
  }, [dispatch, name, navigate]);

  const handleConfirmSave = useCallback(async () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const posting_date = formData.get("posting_date") as string;
      const posting_time = formData.get("posting_time") as string;

      const payload = {
        posting_date,
        posting_time,
      };
      console.log(payload);
      const updatePayload = { name, payload };
      try {
        await dispatch(updatePurchaseReceipt(updatePayload)).unwrap();
        toast.success("Purchase receipt updated successfully!");
        await dispatch(getPurchaseReceiptInfo(name)).unwrap();
        setIsEditing(false);
        setIsSaveModalOpen(false);
      } catch (error) {
        toast.error("Failed to update purchase receipt.");
        setIsSaveModalOpen(false);
        setIsEditing(false);
      }
    }
  }, [dispatch, name]);

  useEffect(() => {
    dispatch(getPurchaseReceiptInfo(name));
  }, [dispatch, name]);

  const handleNavigation = () => {
    navigate("/purchase-receipt");
  };

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );

  return (
    <>
      <Header
        doctypeInfo={purchaseReceiptInfo}
        name={name}
        isEditing={isEditing}
        moduleBreadcrumb={{
          parentModule: "Buying",
          module: "Purchase Receipt",
        }}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        handleSubmitClick={handleSubmitClick}
        handleNavigation={handleNavigation}
        editDisabled={true}
        handleActivityLogClick={() => setIsActivityLogOpen(!isActivityLogOpen)}
      />

      <form ref={formRef} onSubmit={handleSaveClick}>
        <div className="mb-8">
          <h2 className="text-md lg:text-lg font-semibold mb-4">
            A. Purchase receipt details
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:w-1/2 lg:pl-6">
            <Input
              label="Supplier"
              type="text"
              name="supplier"
              defaultValue={purchaseReceiptInfo?.supplier}
              required
              disabled={!isEditing}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Transaction Date"
                type="date"
                name="posting_date"
                defaultValue={purchaseReceiptInfo?.posting_date}
                required
                disabled={!isEditing}
              />
              <Input
                label="Posting time"
                type="time"
                name="posting_time"
                defaultValue={formatTime(
                  purchaseReceiptInfo?.posting_time || "00:00:00"
                )}
                required
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-md lg:text-lg font-semibold mb-4">
            B. Item details
          </h2>
          <div className="overflow-x-auto max-w-[345px] md:max-w-full lg:pl-6">
            <table className="min-w-max md:min-w-full divide-y divide-gray-200 border rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {purchaseReceiptInfo?.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.item_code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.qty}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      PHP {item.rate.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <hr className="my-4" />
        {isEditing && (
          <div className="mt-8 flex justify-end space-x-2 lg:space-x-4">
            <ButtonUI
              variant="outline"
              buttonName="Cancel"
              size="medium"
              onClick={handleCancelClick}
            />
            <ButtonUI
              variant="dark"
              type="submit"
              buttonName="Save"
              size="medium"
            />
          </div>
        )}
      </form>

      <ActivityLog
        isOpen={isActivityLogOpen}
        onClose={() => setIsActivityLogOpen(false)}
        doctypeInfo={purchaseReceiptInfo}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        actionType="delete"
        doctype="Purchase Receipt"
      />

      <ConfirmModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        actionType="submit"
        doctype="Purchase Receipt"
      />

      <ConfirmModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onConfirm={handleConfirmSave}
        actionType="save"
        doctype="Purchase Receipt"
      />
    </>
  );
};

export default PurchaseReceiptInfo;
