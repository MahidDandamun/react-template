import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  deleteItem,
  getItemGroup,
  getItemInfo,
  getUOM,
  updateItem,
} from "../../../store/services/ItemService";
import { CreateItemInput } from "../../../interface/input/ItemInput";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import SpinnerUI from "../../ui/SpinnerUI";
import Header from "../../shared/Header";
import ButtonUI from "../../ui/ButtonUI";
import ConfirmModal from "../../shared/ConfirmModal";
import Input from "../../shared/Input";
import SelectInput from "../../shared/SelectInput";
import ActivityLog from "../../shared/ActivityLog";

const ItemInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const { itemGroup, itemInfo, isLoading } = useAppSelector(
    (state) => state.items
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
      await dispatch(deleteItem(name)).unwrap();
      toast.success("Successfully deleted item");
      navigate("/items");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Failed deleting item");
      setIsDeleteModalOpen(false);
    }
  }, [dispatch, name, navigate]);

  const handleConfirmSave = useCallback(async () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      let payload: CreateItemInput = {
        item_name: formData.get("item_name") as string,
        item_group: formData.get("item_group") as string,
        // stock_uom: formData.get("stock_uom") as string,
      };

      const updatePayload = { name, payload };

      try {
        await dispatch(updateItem(updatePayload)).unwrap();
        toast.success("Item updated successfully!");
        await dispatch(getItemInfo(name)).unwrap();
        setIsSaveModalOpen(false);
        setIsEditing(false);
      } catch (error) {
        toast.error("Failed updating item");
        setIsSaveModalOpen(false);
        setIsEditing(false);
      }
    }
  }, [dispatch, name]);

  const fetchDetails = useCallback(async () => {
    dispatch(getItemInfo(name));
    dispatch(getItemGroup());
    dispatch(getUOM());
  }, [dispatch, name]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails, name]);

  const handleNavigation = () => {
    navigate("/items");
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
        doctypeInfo={itemInfo}
        name={name}
        isEditing={isEditing}
        moduleBreadcrumb={{ parentModule: "Inventory", module: "Item" }}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        handleNavigation={handleNavigation}
        handleActivityLogClick={() => setIsActivityLogOpen(!isActivityLogOpen)}
      />

      <form onSubmit={handleSaveClick} ref={formRef}>
        <div className="mb-8">
          <h2 className="text-md lg:text-lg font-semibold mb-4">
            A. Item details
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:w-1/2 lg:pl-6">
            <div className="grid lg:grid-cols-2 gap-4">
              <Input
                label="Item Code"
                type="text"
                name="item_code"
                required
                defaultValue={itemInfo?.name}
                disabled={true}
                key={itemInfo?.name}
              />

              <Input
                label="Item Name"
                type="text"
                name="item_name"
                required
                defaultValue={itemInfo?.item_name}
                disabled={!isEditing}
                key={itemInfo?.item_name}
              />

              <SelectInput
                label="Item Group"
                name="item_group"
                isDisabled={!isEditing}
                defaultValue={itemGroup
                  .map((item: any) => ({
                    value: item.name,
                    label: (
                      <p className="flex flex-col">
                        <span className="font-md">{item.name}</span>
                      </p>
                    ),
                  }))
                  .find((option) => option.value === itemInfo?.item_group)}
                doctypeList={itemGroup}
              />
            </div>

            {/* <div>
              <SelectInput label="Unit of Measurement" name="stock_uom" isDisabled={!isEditing}
                  defaultValue={uom.map((item:any) => ({
                    value: item.name,
                    label: (
                      <p className="flex flex-col">
                        <span className="font-bold">{item.name}</span>
                      </p>
                    ),
                  })).find(option => option.value === itemInfo?.stock_uom)
                  }
                  doctypeList={uom} />
            </div> */}
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
        doctypeInfo={itemInfo}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        actionType="delete"
        doctype="Item"
      />

      <ConfirmModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onConfirm={handleConfirmSave}
        actionType="save"
        doctype="Item"
      />
    </>
  );
};

export default ItemInfo;
