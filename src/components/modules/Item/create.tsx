import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  createItem,
  getItemGroup,
  getUOM,
} from "../../../store/services/ItemService";
import { CreateItemInput } from "../../../interface/input/ItemInput";
import { toast } from "react-toastify";
import SpinnerUI from "../../ui/SpinnerUI";
import ModalUI from "../../ui/ModalUI";
import Input from "../../shared/Input";
import SelectInput from "../../shared/SelectInput";
import ButtonUI from "../../ui/ButtonUI";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const { itemGroup, uom, isLoading } = useAppSelector((state) => state.items);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      let payload: CreateItemInput = {
        item_code: formData.get("item_code") as string,
        item_name: formData.get("item_name") as string,
        item_group: formData.get("item_group") as string,
        stock_uom: formData.get("stock_uom") as string,
        opening_stock: parseFloat(formData.get("opening_stock") as string) || 0,
        standard_rate: parseFloat(formData.get("standard_rate") as string) || 0,
      };

      try {
        const response = await dispatch(createItem(payload)).unwrap();
        toast.success("Item created successfully!");
        navigate(response.data.name);
      } catch (error) {
        toast.error("Failed creating item");
      }
    },
    [dispatch, navigate]
  );

  const fetchDetails = useCallback(async () => {
    dispatch(getItemGroup());
    dispatch(getUOM());
  }, [dispatch]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  if (isLoading)
    return (
      <div>
        <SpinnerUI />
      </div>
    );

  return (
    <>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="mb-8">
          <h2 className="text-md lg:text-lg font-semibold mb-4">
            A. Item details
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:w-1/2 lg:pl-6">
            <div className="grid lg:grid-cols-2 gap-4">
              <Input label="Item Code" type="text" name="item_code" required />
              <Input label="Item Name" type="text" name="item_name" required />
              <SelectInput
                label="Item Group"
                name="item_group"
                doctypeList={itemGroup.map((item: any) => ({
                  id: item.name,
                }))}
              />
              <SelectInput
                label="Unit of Measurement"
                name="stock_uom"
                doctypeList={uom.map((item: any) => ({
                  id: item.name,
                }))}
              />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-md lg:text-lg font-semibold mb-4">
            B. Inventory and Pricing
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:w-1/2 lg:pl-6">
            <div className="grid lg:grid-cols-2 gap-4">
              <Input
                label="Opening Stock"
                type="number"
                name="opening_stock"
                defaultValue={0}
                min={0}
              />
              <Input
                label="Selling Rate"
                type="number"
                name="standard_rate"
                prepend="currency"
                defaultValue={0}
              />
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="mt-8 flex justify-end space-x-2 lg:space-x-4">
          <ButtonUI
            variant="outline"
            type="button"
            buttonName="Cancel"
            size="medium"
            onClick={() => setIsModalOpen(true)}
          />
          <ButtonUI
            variant="dark"
            type="submit"
            buttonName="Save as draft"
            size="medium"
            disabled // the button will be enabled when the form was completed
          />
          <ButtonUI
            variant="dark"
            type="submit"
            buttonName="Save and submit"
            size="medium"
            disabled // the button will be enabled when the form was completed
          />
        </div>
      </form>

      {/* a modal will show if the form was not completed but they opt to cancel it */}
      {isModalOpen && (
        <ModalUI
          id="cancelModal"
          variant="info"
          title="Are you sure you want to leave this page?"
          subText="The unfinished form will not be saved."
          leftButtonText="No, wait"
          rightButtonText="Exit page"
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Create;
