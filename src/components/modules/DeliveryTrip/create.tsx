import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getVehicleList } from "../../../store/services/VehicleService";
import { getCompanyList } from "../../../store/services/CompanyService";
import { getDriversList } from "../../../store/services/DriversService";
import { getCustomersList } from "../../../store/services/CustomerService";
import {
  DeliveryStop,
  DeliveryTripInput,
} from "../../../interface/input/DeliveryTripInput";
import {
  createDeliveryTrip,
  getAddress,
} from "../../../store/services/DeliveryTripService";
import SpinnerUI from "../../ui/SpinnerUI";
import ModalUI from "../../ui/ModalUI";
import ButtonUI from "../../ui/ButtonUI";
import SelectInput from "../../shared/SelectInput";
import Input from "../../shared/Input";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateDeliveryTrip = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const [deliveryStops, setDeliveryStops] = useState<DeliveryStop[]>([
    {
      customer: "",
      address: "",
      locked: false,
      delivery_notes: "",
      estimated_arrival: "",
    },
  ]);

  const { companyList } = useAppSelector((state) => state.company);
  const { driverList } = useAppSelector((state) => state.drivers);
  const { vehicleList } = useAppSelector((state) => state.vehicles);
  const { customersList } = useAppSelector((state) => state.customers);
  const { addressList, isLoading } = useAppSelector(
    (state) => state.deliveryTrip
  );

  const fetchEntryList = useCallback(async () => {
    dispatch(getVehicleList());
    dispatch(getCompanyList());
    dispatch(getDriversList());
    dispatch(getCustomersList());
    dispatch(getAddress());
  }, [dispatch]);

  useEffect(() => {
    fetchEntryList();
  }, [fetchEntryList]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      let payload: DeliveryTripInput = {
        company_name: formData.get("company_name") as string,
        driver_name: formData.get("driver_name") as string,
        vehicle: formData.get("vehicle") as string,
        departure_time: formData.get("departure_time") as string,
        delivery_stops: deliveryStops,
      };
      try {
        const response = await dispatch(createDeliveryTrip(payload)).unwrap();
        toast.success("Delivery trip created successfully!");
        navigate(response.data.name);
      } catch (error) {
        toast.error("Failed to create delivery trip.");
      }
    },
    [deliveryStops, dispatch, navigate]
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
            A. Delivery Details
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:w-1/2 lg:pl-6">
            <div className="grid lg:grid-cols-2 gap-4">
              <SelectInput
                label="Company"
                name="company_name"
                doctypeList={companyList.map((company: any) => ({
                  id: company.name,
                }))}
              />
              <SelectInput
                label="Driver"
                name="driver_name"
                doctypeList={driverList.map((driver: any) => ({
                  id: driver.full_name,
                }))}
              />

              <SelectInput
                label="Vehicle"
                name="vehicle"
                doctypeList={vehicleList.map((vehicle: any) => ({
                  id: vehicle.name,
                  item_name: vehicle.name,
                  group: vehicle.model,
                }))}
              />
              <Input
                label="Departure Time"
                type="datetime-local"
                name="departure_time"
                required={false}
              />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-md lg:text-lg font-semibold">
              B. Delivery Stops
            </h2>
            <ButtonUI
              variant="primary"
              buttonName="Add Delivery Stop"
              size="medium"
              iconName="add"
              onClick={() =>
                setDeliveryStops([
                  ...deliveryStops,
                  {
                    customer: "",
                    address: "",
                    locked: false,
                    delivery_notes: "",
                    estimated_arrival: "",
                  },
                ])
              }
            />
          </div>
          <div className="overflow-x-auto max-w-[345px] md:max-w-full lg:pl-6">
            <table className="min-w-max md:min-w-full divide-y divide-gray-200 border rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Locked</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Note</th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estimated Arrival
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {deliveryStops.map((stop, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <SelectInput
                        name="customer_name"
                        doctypeList={customersList.map((customer: any) => ({
                          id: customer.name,
                        }))}
                        onSelectChange={(selectedOption) => {
                          const newStops = [...deliveryStops];
                          newStops[index].customer = selectedOption.value;
                          setDeliveryStops(newStops);
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <SelectInput
                        name="address"
                        doctypeList={addressList.map((data: any) => ({
                          id: data.name,
                        }))}
                        onSelectChange={(selectedOption) => {
                          const newStops = [...deliveryStops];
                          newStops[index].address = selectedOption.value;
                          setDeliveryStops(newStops);
                        }}
                      />
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap flex justify-center self-center">
                    <Input type="checkbox" name="locked" required={false}
                      onChange={(e) => {
                        const newStops = [...deliveryStops];
                        newStops[index].locked = e.target.checked;
                        setDeliveryStops(newStops);
                      }} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Input type="text" name="delivery_note" required={false} onChange={(e) => {
                      const newStops = [...deliveryStops];
                      newStops[index].delivery_notes = e.target.value;
                      setDeliveryStops(newStops);
                    }} />
                  </td> */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Input
                        type="datetime-local"
                        name="estimated_arrival"
                        required={false}
                        onChange={(e) => {
                          const newStops = [...deliveryStops];
                          newStops[index].estimated_arrival = e.target.value;
                          setDeliveryStops(newStops);
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ButtonUI
                        variant="danger"
                        buttonName="Delete"
                        size="medium"
                        iconName="delete"
                        onClick={() =>
                          setDeliveryStops(
                            deliveryStops.filter((_, i) => i !== index)
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default CreateDeliveryTrip;
