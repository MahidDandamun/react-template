import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  deleteWarehouse,
  getWarehouseInfo,
  updateWarehouse,
} from "../../../store/services/WarehouseService";
import { WarehouseList } from "../../../interface/output/Warehouse/WarehouseList";
import Header from "../../shared/Header";
import SpinnerUI from "../../ui/SpinnerUI";
import ConfirmModal from "../../shared/ConfirmModal";
import ButtonUI from "../../ui/ButtonUI";
import { toast } from "react-toastify";
import Input from "../../shared/Input";
import ActivityLog from "../../shared/ActivityLog";

const InfoWarehouse = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name }: any = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const { warehouse_info, isLoading } = useAppSelector(
    (state) => state.warehouse
  );

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

  // const convertToBoolean = (val: any) => {
  //   if (val) {
  //     return true;
  //   } else return false;
  // }

  const handleConfirmDelete = useCallback(async () => {
    try {
      await dispatch(deleteWarehouse(name)).unwrap();
      toast.success("Successfully deleted warehouse");
      navigate("/warehouse");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Failed deleting warehouse");
      setIsDeleteModalOpen(false);
    }
  }, [dispatch, name, navigate]);

  const fetchWarehouseListDetails = useCallback(async () => {
    try {
      await dispatch(getWarehouseInfo(name));
    } catch (error) {
      console.error("Error fetching warehouse info:", error);
    }
  }, [dispatch, name]);

  useEffect(() => {
    fetchWarehouseListDetails();
  }, [name, fetchWarehouseListDetails]);

  const handleConfirmSave = useCallback(async () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      let payload: WarehouseList = {
        warehouse_name: formData.get("warehouse_name") as string,
        // is_group: convertToBoolean(formData.get("is_group")),
        company: warehouse_info.company,
      };
      const updatePayload = { name, payload };
      try {
        await dispatch(updateWarehouse(updatePayload)).unwrap();
        toast.success("Successfully updated warehouse information!");
        await dispatch(getWarehouseInfo(name)).unwrap();
        setIsSaveModalOpen(false);
        setIsEditing(false);
      } catch (error) {
        toast.error("Failed updating warehouse information!");
        setIsSaveModalOpen(false);
        setIsEditing(false);
      }
    }
  }, [dispatch, name, warehouse_info]);
  const handleNavigation = () => {
    navigate("/warehouse");
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
        doctypeInfo={warehouse_info}
        name={name}
        isEditing={isEditing}
        moduleBreadcrumb={{ parentModule: "Inventory", module: "Warehouse" }}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        handleNavigation={handleNavigation}
        handleActivityLogClick={() => setIsActivityLogOpen(!isActivityLogOpen)}
      />

      <form onSubmit={handleSaveClick} ref={formRef}>
        <div className="mb-8">
          <h2 className="text-md lg:text-lg font-semibold mb-4">
            A. Warehouse details
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:w-1/2 lg:pl-6">
            <div className="grid lg:grid-cols-2 gap-4">
              <Input
                label="Warehouse ID"
                type="text"
                name="name"
                required
                defaultValue={warehouse_info?.name}
                disabled={true}
                key={warehouse_info?.name}
              />

              <Input
                label="Warehouse Name"
                type="text"
                name="warehouse_name"
                required
                defaultValue={warehouse_info?.warehouse_name}
                disabled={!isEditing}
                key={warehouse_info?.warehouse_name}
              />

              <Input
                label="Company"
                type="text"
                name="company"
                required
                defaultValue={warehouse_info?.company}
                disabled={true}
                key={warehouse_info?.company}
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
        doctypeInfo={warehouse_info}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        actionType="delete"
        doctype="Warehouse"
      />
      <ConfirmModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onConfirm={handleConfirmSave}
        actionType="save"
        doctype="Warehouse"
      />
    </>
  );
};

export default InfoWarehouse;
