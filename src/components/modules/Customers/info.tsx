import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  deleteCustomer,
  getCustomerGroup,
  getCustomerInfo,
  getTerritory,
  updateCustomer,
} from "../../../store/services/CustomerService";

import { CustomerInput } from "../../../interface/input/CustomerInput";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ButtonUI from "../../ui/ButtonUI";
import Input from "../../shared/Input";
import Header from "../../shared/Header";
import ConfirmModal from "../../shared/ConfirmModal";
import SpinnerUI from "../../ui/SpinnerUI";
import SelectInput from "../../shared/SelectInput";
import { customerType } from "../../../utils/doctypeOptions";
import ActivityLog from "../../shared/ActivityLog";

const Info = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { customer_info, territory, customer_group, isLoading } =
    useAppSelector((state) => state.customers);
  const { name }: any = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isActivityLogOpen, setIsActivityLogOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };
  const handleCancelClick = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setIsEditing(!isEditing);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleSaveClick = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaveModalOpen(true);
  };
  const handleConfirmDelete = useCallback(async () => {
    try {
      await dispatch(deleteCustomer(name)).unwrap();
      toast.success("Successfully deleted customer");
      navigate("/customers");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Failed deleting customer");
      setIsDeleteModalOpen(false);
    }
  }, [dispatch, name, navigate]);

  const handleConfirmSave = useCallback(async () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      let payload: CustomerInput = {
        customer_group: formData.get("customer_group") as string,
        customer_type: formData.get("customer_type") as string,
        territory: formData.get("territory") as string,
        customer_name: formData.get("customer_name") as string,
      };
      const updatePayload = { name, payload };
      try {
        await dispatch(updateCustomer(updatePayload)).unwrap();
        toast.success("Successfully updated customer information!");
        await dispatch(getCustomerInfo(name)).unwrap();
        setIsEditing(false);
        setIsSaveModalOpen(false);
      } catch (error) {
        toast.error("Failed update customer");
        setIsSaveModalOpen(false);
        setIsEditing(false);
        return error;
      }
    }
  }, [dispatch, name]);

  const fetchDetails = useCallback(async () => {
    dispatch(getCustomerGroup());
    dispatch(getTerritory());
  }, [dispatch]);

  useEffect(() => {
    fetchDetails();
    dispatch(getCustomerInfo(name));
  }, [dispatch, name, fetchDetails]);

  const handleNavigation = () => {
    navigate("/customers");
  };
  if (isLoading)
    return (
      <div>
        <SpinnerUI />
      </div>
    );

  return (
    <>
      <Header
        doctypeInfo={customer_info}
        name={name}
        isEditing={isEditing}
        moduleBreadcrumb={{ parentModule: "Entities", module: "Customer" }}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        handleNavigation={handleNavigation}
        handleActivityLogClick={() => setIsActivityLogOpen(!isActivityLogOpen)}
      />

      <form onSubmit={handleSaveClick} ref={formRef}>
        <div className="mb-8">
          <h2 className="text-md lg:text-lg font-semibold mb-4">
            A. Customer details
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:w-1/2 lg:pl-6">
            <div className="grid lg:grid-cols-2 gap-4">
              <Input
                label="Customer"
                type="text"
                name="customer_name"
                required
                defaultValue={customer_info?.customer_name}
                disabled={!isEditing}
                key={customer_info?.customer_name}
              />

              <SelectInput
                label="Customer Type"
                name="customer_type"
                isDisabled={!isEditing}
                defaultValue={customerType
                  .map((item) => ({
                    value: item.id,
                    label: (
                      <p className="flex flex-col">
                        <span className="font-md">{item.id}</span>
                      </p>
                    ),
                  }))
                  .find(
                    (option) => option.value === customer_info?.customer_type
                  )}
                doctypeList={customerType}
              />

              <SelectInput
                label="Customer Group"
                name="customer_group"
                isDisabled={!isEditing}
                defaultValue={customer_group
                  .map((item: any) => ({
                    value: item.name,
                    label: (
                      <p className="flex flex-col">
                        <span className="font-md">{item.name}</span>
                      </p>
                    ),
                  }))
                  .find(
                    (option) => option.value === customer_info?.customer_group
                  )}
                doctypeList={customer_group.map((item: any) => ({
                  id: item.name,
                }))}
              />

              <SelectInput
                label="Territory"
                name="territory"
                isDisabled={!isEditing}
                defaultValue={territory
                  .map((item: any) => ({
                    value: item.name,
                    label: (
                      <p className="flex flex-col">
                        <span className="font-md">{item.name}</span>
                      </p>
                    ),
                  }))
                  .find((option) => option.value === customer_info?.territory)}
                doctypeList={territory.map((item: any) => ({ id: item.name }))}
              />
            </div>
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
              buttonName="Save changes"
              size="medium"
              type="submit"
            />
          </div>
        )}
      </form>

      <ActivityLog
        isOpen={isActivityLogOpen}
        onClose={() => setIsActivityLogOpen(false)}
        doctypeInfo={customer_info}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        actionType="delete"
        doctype="Customer"
      />
      <ConfirmModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onConfirm={handleConfirmSave}
        actionType="save"
        doctype="Customer"
      />
    </>
  );
};

export default Info;
