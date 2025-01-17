import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  deleteDriver,
  getDriverInfo,
  getSuppliersList,
  updateDriver,
} from "../../../store/services/DriversService";
import { DriverInfoInput } from "../../../interface/input/DriverInput";
import { driverStatus } from "../../../utils/doctypeOptions";
import { toast } from "react-toastify";
import Header from "../../shared/Header";
import SpinnerUI from "../../ui/SpinnerUI";
import Input from "../../shared/Input";
import SelectInput from "../../shared/SelectInput";
import ButtonUI from "../../ui/ButtonUI";
import ConfirmModal from "../../shared/ConfirmModal";
import ActivityLog from "../../shared/ActivityLog";

const InfoDriver = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { name }: any = useParams();
  const { isLoading, driver_info } = useAppSelector((state) => state.drivers);

  const [isEditing, setIsEditing] = useState(false);
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
      await dispatch(deleteDriver(name)).unwrap();
      toast.success("Successfully deleted driver");
      navigate("/drivers");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Failed deleting driver");
      setIsDeleteModalOpen(false);
    }
  }, [dispatch, name, navigate]);

  const fetchDriverInfo = useCallback(async () => {
    try {
      dispatch(getDriverInfo(name));
      dispatch(getSuppliersList());
    } catch (error) {
      console.error("Error fetching driver info: ", error);
    }
  }, [dispatch, name]);

  useEffect(() => {
    fetchDriverInfo();
  }, [fetchDriverInfo]);

  const handleConfirmSave = useCallback(async () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      let payload: DriverInfoInput = {
        full_name: formData.get("full_name") as string,
        status: formData.get("status") as string,
      };
      const updatePayload = { name, payload };
      try {
        await dispatch(updateDriver(updatePayload)).unwrap();
        toast.success("Successfuly updated driver");
        await dispatch(getDriverInfo(name)).unwrap();
        setIsSaveModalOpen(false);
        setIsEditing(false);
      } catch (error) {
        toast.error(`Failed to update driver `);
        setIsSaveModalOpen(false);
        setIsEditing(false);
      }
    }
  }, [dispatch, name]);
  const handleNavigation = () => {
    navigate("/drivers");
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
        doctypeInfo={driver_info}
        name={name}
        isEditing={isEditing}
        moduleBreadcrumb={{ parentModule: "Entities", module: "Driver" }}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        handleNavigation={handleNavigation}
        handleActivityLogClick={() => setIsActivityLogOpen(!isActivityLogOpen)}
      />

      <form onSubmit={handleSaveClick} ref={formRef}>
        <div className="mb-8">
          <h2 className="text-md lg:text-lg font-semibold mb-4">
            A. Driver details
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:w-1/2 lg:pl-6">
            <div className="grid lg:grid-cols-2 gap-4">
              <Input
                label="Driver"
                type="text"
                name="full_name"
                required
                defaultValue={driver_info?.full_name}
                disabled={!isEditing}
                key={driver_info?.full_name}
              />

              <SelectInput
                label="Status"
                name="status"
                isDisabled={!isEditing}
                defaultValue={driverStatus
                  .map((item) => ({
                    value: item.id,
                    label: (
                      <p className="flex flex-col">
                        <span className="font-md">{item.id}</span>
                      </p>
                    ),
                  }))
                  .find((option) => option.value === driver_info?.status)}
                doctypeList={driverStatus}
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
        doctypeInfo={driver_info}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        actionType="delete"
        doctype="Driver"
      />
      <ConfirmModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onConfirm={handleConfirmSave}
        actionType="save"
        doctype="Driver"
      />
    </>
  );
};

export default InfoDriver;
