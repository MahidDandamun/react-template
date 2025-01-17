import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { CustomerInput } from "../../../interface/input/CustomerInput";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  createCustomer,
  getCustomerGroup,
  getTerritory,
} from "../../../store/services/CustomerService";
import Input from "../../shared/Input";
import ButtonUI from "../../ui/ButtonUI";
import { useNavigate } from "react-router-dom";
import SpinnerUI from "../../ui/SpinnerUI";
import ModalUI from "../../ui/ModalUI";
import SelectInput from "../../shared/SelectInput";
import { customerType } from "../../../utils/doctypeOptions";

const Create = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { territory, customer_group, isLoading } = useAppSelector(
    (state) => state.customers
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      let payload: CustomerInput = {
        customer_group: formData.get("customer_group") as string,
        customer_type: formData.get("customer_type") as string,
        territory: formData.get("territory") as string,
        customer_name: formData.get("customer_name") as string,
      };

      try {
        const response = await dispatch(createCustomer(payload)).unwrap();
        toast.success("Customer created successfully!");
        navigate(response.data.customer_name);
      } catch (error) {
        toast.error("Failed creating customer");
      }
    },
    [dispatch, navigate]
  );

  const fetchDetails = useCallback(async () => {
    dispatch(getCustomerGroup());
    dispatch(getTerritory());
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
            A. Customer details
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:w-1/2 lg:pl-6">
            <div className="grid lg:grid-cols-2 gap-4">
              <Input
                label="Customer"
                type="text"
                name="customer_name"
                required
              />
              <SelectInput
                label="Customer Type"
                name="customer_type"
                doctypeList={customerType}
              />
              <SelectInput
                label="Customer Group"
                name="customer_group"
                doctypeList={customer_group.map((item: any) => ({
                  id: item.name,
                }))}
              />

              <SelectInput
                label="Territory"
                name="territory"
                doctypeList={territory.map((item: any) => ({
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
