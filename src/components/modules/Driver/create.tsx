import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
// CHANGE
import {
  createDriver,
  getSuppliersList,
} from "../../../store/services/DriversService";
import { DriverInput } from "../../../interface/input/DriverInput";
import Input from "../../shared/Input";
import SelectInput from "../../shared/SelectInput";
import ButtonUI from "../../ui/ButtonUI";
import { driverStatus } from "../../../utils/doctypeOptions";
import SpinnerUI from "../../ui/SpinnerUI";
import ModalUI from "../../ui/ModalUI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateDriver = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  // const {supplier_list} = useAppSelector((state) => state.drivers);
  const { isLoading } = useAppSelector((state) => state.drivers);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSupplierList = useCallback(async () => {
    dispatch(getSuppliersList());
  }, [dispatch]);

  useEffect(() => {
    fetchSupplierList();
  }, [fetchSupplierList]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      let payload: DriverInput = {
        full_name: formData.get("full_name") as string,
        status: formData.get("status") as string,
        // name: formData.get("name") as string,
      };

      try {
        const response = await dispatch(createDriver(payload)).unwrap();
        toast.success("Successfuly created driver!");
        navigate(response.data.name);
      } catch (error) {
        toast.error("Error creating driver!");
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
            A. Driver details
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:w-1/2 lg:pl-6">
            <div className="grid lg:grid-cols-2 gap-4">
              <Input
                label="Driver Name"
                type="text"
                name="full_name"
                required
              />
              <SelectInput
                label="Status"
                name="status"
                doctypeList={driverStatus}
              />
            </div>
            {/* <div className="flex flex-col space-y-2">
              <SelectInput label="Transporter" name="name" doctypeList={supplier_list.map((item: any) => ({
                id: item.supplier_name,
              }))} />
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

export default CreateDriver;
