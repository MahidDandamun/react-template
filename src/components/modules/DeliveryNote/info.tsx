import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  deleteDeliveryNoteInfo,
  getDeliveryNoteInfo,
} from "../../../store/services/DeliveryNoteService";
import { formatTime } from "../../../utils/commonUtils";
import { updateDeliveryNoteInfo } from "../../../store/services/DeliveryNoteService";
import { toast } from "react-toastify";
import Input from "../../shared/Input";
import ConfirmModal from "../../shared/ConfirmModal";
import Header from "../../shared/Header";
import SpinnerUI from "../../ui/SpinnerUI";
import ActivityLog from "../../shared/ActivityLog";

const DeliveryNoteInfo = () => {
  const { name }: any = useParams();
  const dispatch = useAppDispatch();
  const { deliveryNoteInfo, isLoading } = useAppSelector(
    (state) => state.deliveryNote
  );
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isActivityLogOpen, setIsActivityLogOpen] = useState(false);

  const handleSubmitClick = () => {
    setIsSubmitModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmSubmit = useCallback(async () => {
    try {
      if (name) {
        const payload = { docstatus: 1 };
        const updatePayload = { name, payload };

        await dispatch(updateDeliveryNoteInfo(updatePayload)).unwrap();
        toast.success("Successfully submitted Delivery Note");
        dispatch(getDeliveryNoteInfo(name));
        setIsSubmitModalOpen(false);
      }
    } catch (error) {
      toast.error("Failed submitting Delivery Note");
      setIsSubmitModalOpen(false);
    }
  }, [dispatch, name]);

  const handleConfirmDelete = useCallback(async () => {
    try {
      if (name) {
        await dispatch(deleteDeliveryNoteInfo(name)).unwrap();
        toast.success(`Successfully delete ${name}`);
        setIsDeleteModalOpen(false);
        navigate("/delivery-note");
      }
    } catch (error) {
      toast.error("Failed submitting Delivery Note");
      setIsDeleteModalOpen(false);
    }
  }, [dispatch, name, navigate]);

  const handleNavigation = () => {
    navigate("/delivery-note");
  };

  useEffect(() => {
    if (name) {
      dispatch(getDeliveryNoteInfo(name));
    }
  }, [dispatch, name]);

  console.log(deliveryNoteInfo);
  if (isLoading)
    return (
      <div>
        <SpinnerUI />
      </div>
    );

  return (
    <>
      <Header
        doctypeInfo={deliveryNoteInfo}
        name={name}
        moduleBreadcrumb={{
          parentModule: "Selling",
          module: "Delivery Note",
        }}
        handleDeleteClick={handleDeleteClick}
        handleSubmitClick={handleSubmitClick}
        handleNavigation={handleNavigation}
        editDisabled={true}
        handleActivityLogClick={() => setIsActivityLogOpen(!isActivityLogOpen)}
      />

      <div className="mb-8">
        <h2 className="text-md lg:text-lg font-semibold mb-4">
          A. Delivery note details
        </h2>
        <div className="grid grid-cols-1 gap-4 lg:w-1/2 lg:pl-6">
          <div className="grid lg:grid-cols-2 gap-4">
            <Input
              label="Customer"
              type="text"
              name="customer"
              defaultValue={deliveryNoteInfo?.customer}
              required
              disabled={true}
            />

            <Input
              label="Sales order number"
              type="text"
              name="sales-order"
              defaultValue={deliveryNoteInfo?.name}
              required
              disabled={true}
            />

            <Input
              label="Posting Date"
              type="date"
              name="transaction_date"
              defaultValue={deliveryNoteInfo?.posting_date}
              required
              disabled
            />

            <Input
              label="Posting time"
              type="time"
              name="posting_time"
              defaultValue={formatTime(
                deliveryNoteInfo?.posting_time || "00:00:00"
              )}
              required
              disabled
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {deliveryNoteInfo?.items.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.item_code}: {item.item_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.qty}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    PHP {item.rate.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    PHP {item.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <hr className="my-4" />

      <ActivityLog
        isOpen={isActivityLogOpen}
        onClose={() => setIsActivityLogOpen(false)}
        doctypeInfo={deliveryNoteInfo}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        actionType="delete"
        doctype="Delivery Note"
      />

      <ConfirmModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        actionType="submit"
        doctype="Delivery Note"
      />
    </>
  );
};

export default DeliveryNoteInfo;
