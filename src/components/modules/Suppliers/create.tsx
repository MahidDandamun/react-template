import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  createSupplier,
  getSupplierGroup,
} from "../../../store/services/SupplierService";
import { SupplierInput } from "../../../interface/input/SupplierInput";
import { useNavigate } from "react-router-dom";
import ButtonUI from "../../ui/ButtonUI";
import SelectInput from "../../shared/SelectInput";
import Input from "../../shared/Input";
import { supplierType } from "../../../utils/doctypeOptions";
import SpinnerUI from "../../ui/SpinnerUI";
import ModalUI from "../../ui/ModalUI";

const Create = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const { supplierGroup, isLoading } = useAppSelector(
    (state) => state.suppliers
  );
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      let payload: SupplierInput = {
        supplier_name: formData.get("supplier_name") as string,
        supplier_type: formData.get("supplier_type") as string,
        supplier_group: formData.get("supplier_group") as string,
      };

      try {
        const response = await dispatch(createSupplier(payload)).unwrap();
        toast.success("Supplier created successfully!");
        navigate(response.name);
      } catch (error) {
        toast.error("Failed creating suplier");
      }
    },
    [dispatch, navigate]
  );

  const fetchDetails = useCallback(async () => {
    dispatch(getSupplierGroup());
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
            A. Supplier details
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:w-1/2 lg:pl-6">
            <div className="grid lg:grid-cols-2 gap-4">
              <Input
                label="Supplier"
                type="text"
                name="supplier_name"
                required
              />
              <SelectInput
                label="Supplier Type"
                name="supplier_type"
                doctypeList={supplierType}
              />
              <SelectInput
                label="Supplier Group"
                name="supplier_group"
                doctypeList={supplierGroup.map((item: any) => ({
                  id: item.name,
                }))}
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
