import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { toast } from "react-toastify";
import { SupplierInput } from "../../../interface/input/SupplierInput";
import {
  deleteSupplier,
  getSupplierGroup,
  getSupplierInfo,
  updateSupplier,
} from "../../../store/services/SupplierService";
import Header from "../../shared/Header";
import Input from "../../shared/Input";
import SelectInput from "../../shared/SelectInput";
import { supplierType } from "../../../utils/doctypeOptions";
import ButtonUI from "../../ui/ButtonUI";
import ConfirmModal from "../../shared/ConfirmModal";
import SpinnerUI from "../../ui/SpinnerUI";
import ActivityLog from "../../shared/ActivityLog";

const SuppliersInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const { supplierGroup, supplierInfo, isLoading } = useAppSelector(
    (state) => state.suppliers
  );
  const { name }: any = useParams();
  const navigate = useNavigate();
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
      await dispatch(deleteSupplier(name)).unwrap();
      toast.success("Successfully deleted supplier");
      navigate("/suppliers");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Failed deleting supplier");
      setIsDeleteModalOpen(false);
    }
  }, [dispatch, name, navigate]);

  const handleConfirmSave = useCallback(async () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      let payload: SupplierInput = {
        supplier_name: formData.get("supplier_name") as string,
        supplier_type: formData.get("supplier_type") as string,
        supplier_group: formData.get("supplier_group") as string,
      };
      const updatePayload = { name, payload };
      try {
        await dispatch(updateSupplier(updatePayload)).unwrap();
        toast.success("Supplier updated successfully!");
        await dispatch(getSupplierInfo(name)).unwrap();
        setIsSaveModalOpen(false);
        setIsEditing(false);
      } catch (error) {
        toast.error("Failed updating suplier");
        setIsSaveModalOpen(false);
        setIsEditing(false);
      }
    }
  }, [dispatch, name]);

  const fetchDetails = useCallback(async () => {
    dispatch(getSupplierInfo(name));
    dispatch(getSupplierGroup());
  }, [dispatch, name]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails, name]);

  const handleNavigation = () => {
    navigate("/suppliers");
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
        doctypeInfo={supplierInfo}
        name={name}
        isEditing={isEditing}
        moduleBreadcrumb={{ parentModule: "Entities", module: "Supplier" }}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        handleNavigation={handleNavigation}
        handleActivityLogClick={() => setIsActivityLogOpen(!isActivityLogOpen)}
      />

      <form onSubmit={handleSaveClick} ref={formRef}>
        <div className="mb-8">
          <h2 className="text-md lg:text-lg font-semibold mb-4">
            A. Supplier details
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:w-1/2 lg:pl-6">
            <div className="grid lg:grid-cols-2 gap-4">
              <Input
                label="Supplier"
                type="text"
                name="supplier_name"
                required
                defaultValue={supplierInfo?.supplier_name}
                disabled={!isEditing}
                key={supplierInfo?.supplier_name}
              />

              <SelectInput
                label="Supplier Type"
                name="supplier_type"
                isDisabled={!isEditing}
                defaultValue={supplierType
                  .map((item) => ({
                    value: item.id,
                    label: (
                      <p className="flex flex-col">
                        <span className="font-md">{item.id}</span>
                      </p>
                    ),
                  }))
                  .find(
                    (option) => option.value === supplierInfo?.supplier_type
                  )}
                doctypeList={supplierType}
              />

              <SelectInput
                label="Supplier Group"
                name="supplier_group"
                isDisabled={!isEditing}
                defaultValue={supplierGroup
                  .map((item: any) => ({
                    value: item.name,
                    label: (
                      <p className="flex flex-col">
                        <span className="font-md">{item.name}</span>
                      </p>
                    ),
                  }))
                  .find(
                    (option) => option.value === supplierInfo?.supplier_group
                  )}
                doctypeList={supplierGroup.map((item: any) => ({
                  id: item.name,
                }))}
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
        doctypeInfo={supplierInfo}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        actionType="delete"
        doctype="Supplier"
      />
      <ConfirmModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onConfirm={handleConfirmSave}
        actionType="save"
        doctype="Supplier"
      />
    </>
  );
};

export default SuppliersInfo;
