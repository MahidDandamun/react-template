import React, { useCallback, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { createWarehouse } from "../../../store/services/WarehouseService";
import { WarehouseDetails } from "../../../interface/input/WarehouseInput";
import Input from "../../shared/Input";
import SelectInput from "../../shared/SelectInput";
import ButtonUI from "../../ui/ButtonUI";
import ModalUI from "../../ui/ModalUI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpinnerUI from "../../ui/SpinnerUI";

const CreateWarehouse = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const { companyList } = useAppSelector((state) => state.company);
  const { isLoading } = useAppSelector((state) => state.warehouse);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // const convertToBoolean = (val: any) => {
  //   if (val) {
  //     return true;
  //   } else return false;
  // }

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      let payload: WarehouseDetails = {
        warehouse_name: formData.get("warehouse_name") as string,
        // is_group: convertToBoolean(formData.get("is_group")),
        company: formData.get("company") as string,
      };
      try {
        const response = await dispatch(createWarehouse(payload)).unwrap();
        navigate(response.data.name);
        toast.success("Successfully created warehouse!");
      } catch (error) {
        toast.error("Failed creating warehouse!");
      }
    },
    [dispatch, navigate]
  );
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
            A. Warehouse details
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:w-1/2 lg:pl-6">
            <div className="grid lg:grid-cols-2 gap-4">
              <Input
                label="Warehouse Name"
                type="text"
                name="warehouse_name"
                required
              />
              <SelectInput
                label="Company"
                name="company"
                doctypeList={companyList.map((item: any) => ({
                  id: item.name,
                }))}
              />
            </div>
            {/* <div className="flex py-4">
              <div className="ms-2 text-sm">
                <Input type="checkbox" name="is_group" required />
              </div>
              <div className="flex items-center h-5">
                <label
                  htmlFor="Is group warehouse"
                  className={`block mb-2 text-base font-medium text-gray-900 mt-6 ml-2`}
                >
                  Is Group Warehouse
                </label>
              </div>

            </div> */}
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

export default CreateWarehouse;
