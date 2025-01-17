import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  deleteDeliveryTrip,
  getAddress,
  getDeliveryTripInfo,
  updateDeliveryTrip,
} from "../../../store/services/DeliveryTripService";
import SpinnerUI from "../../ui/SpinnerUI";
import Header from "../../shared/Header";
import ButtonUI from "../../ui/ButtonUI";
import ConfirmModal from "../../shared/ConfirmModal";
import { toast } from "react-toastify";
import Input from "../../shared/Input";
import SelectInput from "../../shared/SelectInput";
import ActivityLog from "../../shared/ActivityLog";

const InfoDeliveryTrip = () => {
  const { name }: any = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  // const { companyList } = useAppSelector((state) => state.company);
  const { driverList } = useAppSelector((state) => state.drivers);
  const { vehicleList } = useAppSelector((state) => state.vehicles);
  const { customersList } = useAppSelector((state) => state.customers);
  const { deliveryTripInfo, isLoading } = useAppSelector(
    (state) => state.deliveryTrip
  );
  const { addressList } = useAppSelector((state) => state.deliveryTrip);

  const [deliveryStops, setDeliveryStops] = useState<DeliveryStop[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
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

  const handleSubmitClick = () => {
    setIsSubmitModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleSaveClick = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaveModalOpen(true);
  };

  const handleDeliveryStopList = () => {
    setDeliveryStops(deliveryTripInfo.delivery_stops);
  };

  useEffect(handleDeliveryStopList, [deliveryTripInfo]);

  const fetchEntryList = useCallback(async () => {
    dispatch(getVehicleList());
    dispatch(getCompanyList());
    dispatch(getDriversList());
    dispatch(getCustomersList());
    dispatch(getDeliveryTripInfo(name));
    dispatch(getAddress());
  }, [dispatch, name]);

  useEffect(() => {
    fetchEntryList();
  }, [fetchEntryList]);

  const handleConfirmSubmit = useCallback(async () => {
    try {
      const payload = { docstatus: 1 };
      const updatePayload = { name, payload };
      await dispatch(updateDeliveryTrip(updatePayload)).unwrap();
      toast.success("Successfully submitted Delivery trip");
      dispatch(getDeliveryTripInfo(name));
      setIsSubmitModalOpen(false);
    } catch (error) {
      toast.error("Failed submitting Delivery trip");
      setIsSubmitModalOpen(false);
    }
  }, [dispatch, name]);

  const handleConfirmDelete = useCallback(async () => {
    try {
      await dispatch(deleteDeliveryTrip(name)).unwrap();
      toast.success("Successfully deleted Delivery trip");
      navigate("/delivery-trip");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Failed deleting Delivery trip");
      setIsDeleteModalOpen(false);
    }
  }, [dispatch, name, navigate]);

  const handleConfirmSave = useCallback(async () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      let payload: DeliveryTripInput = {
        company_name: formData.get("company_name") as string,
        driver_name: formData.get("driver_name") as string,
        vehicle: formData.get("vehicle") as string,
        departure_time: formData.get("departure_time") as string,
        delivery_stops: deliveryStops,
      };
      const updatedPayload = { name, payload };
      console.log(deliveryStops);
      try {
        await dispatch(updateDeliveryTrip(updatedPayload)).unwrap();
        toast.success("Delivery Trip updated successfully!");
        await dispatch(getDeliveryTripInfo(name)).unwrap();
        setIsEditing(false);
        setIsSaveModalOpen(false);
      } catch (error) {
        console.log("Error saving update: ", error);
        toast.error("Failed to update delivery trip.");
        setIsEditing(false);
        setIsSaveModalOpen(false);
      }
    }
  }, [deliveryStops, dispatch, name]);

  const handleNavigation = () => {
    navigate("/delivery-trip");
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
        doctypeInfo={deliveryTripInfo}
        name={name}
        isEditing={isEditing}
        moduleBreadcrumb={{ parentModule: "Selling", module: "Delivery Trip" }}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        handleSubmitClick={handleSubmitClick}
        handleNavigation={handleNavigation}
        handleActivityLogClick={() => setIsActivityLogOpen(!isActivityLogOpen)}
      />

      <form onSubmit={handleSaveClick} ref={formRef}>
        <div className="mb-8">
          <h2 className="text-md lg:text-lg font-semibold mb-4">
            A. Delivery details
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:w-1/2 lg:pl-6">
            <div className="grid lg:grid-cols-2 gap-4">
              <Input
                label="Company"
                type="text"
                name="company"
                defaultValue={deliveryTripInfo.company}
                required
                disabled={true}
              />

              <SelectInput
                label="Driver"
                name="driver_name"
                isDisabled={!isEditing}
                key={deliveryTripInfo.driver_name}
                defaultValue={driverList
                  .map((driver: any) => ({
                    value: driver.full_name,
                    label: (
                      <p className="flex flex-col">
                        <span className="font-md">{driver.full_name}</span>
                      </p>
                    ),
                  }))
                  .find(
                    (option:any) => option.value === deliveryTripInfo.driver_name
                  )}
                doctypeList={driverList.map((driver: any) => ({
                  id: driver.full_name,
                }))}
              />

              <SelectInput
                label="Vehicle"
                name="vehicle"
                isDisabled={!isEditing}
                key={deliveryTripInfo.vehicle}
                defaultValue={vehicleList
                  .map((vehicle: any) => ({
                    value: vehicle.name,
                    label: (
                      <p className="flex flex-col">
                        <span className="font-md">{vehicle.name}</span>
                      </p>
                    ),
                  }))
                  .find((option:any) => option.value === deliveryTripInfo.vehicle)}
                doctypeList={vehicleList.map((vehicle: any) => ({
                  id: vehicle.name,
                }))}
              />

              <Input
                label="Departure Time"
                type="datetime-local"
                name="departure_time"
                defaultValue={deliveryTripInfo.departure_time}
                required
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-md lg:text-lg font-semibold mb-4">
              B. Delivery Stops
            </h2>
            {isEditing && (
              <ButtonUI
                variant="primary"
                buttonName="Add Delivery Stop"
                size="small"
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
            )}
          </div>
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
              {deliveryStops &&
                deliveryStops.map((stop, index) => (
                  <tr key={index}>
                    {deliveryTripInfo?.docstatus !== 1 ? (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <SelectInput
                          name="customer_stop"
                          isDisabled={!isEditing}
                          defaultValue={customersList
                            .map((item:any) => ({
                              value: item.name,
                              label: (
                                <p className="flex flex-col">
                                  <span className="font-bold">{item.name}</span>
                                </p>
                              ),
                            }))
                            .find((option:any) => option.value === stop.customer)}
                          onSelectChange={(selectedOption) => {
                            const newStops = [...deliveryStops];
                            newStops[index].customer = selectedOption.value;
                            setDeliveryStops(newStops);
                          }}
                          doctypeList={customersList.map((item:any) => ({
                            id: item.name,
                          }))}
                        />
                      </td>
                    ) : (
                      <td className="px-6 py-4 whitespace-nowrap">
                        {stop.customer}
                      </td>
                    )}
                    {deliveryTripInfo?.docstatus !== 1 ? (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <SelectInput
                          name="address_stop"
                          isDisabled={!isEditing}
                          defaultValue={addressList
                            .map((item: any) => ({
                              value: item.name,
                              label: (
                                <p className="flex flex-col">
                                  <span className="font-bold">{item.name}</span>
                                </p>
                              ),
                            }))
                            .find((option:any) => option.value === stop.address)}
                          onSelectChange={(selectedOption) => {
                            const newStops = [...deliveryStops];
                            newStops[index].address = selectedOption.value;
                            setDeliveryStops(newStops);
                          }}
                          doctypeList={addressList.map((item: any) => ({
                            id: item.name,
                          }))}
                        />
                      </td>
                    ) : (
                      <td className="px-6 py-4 whitespace-nowrap">
                        {stop.address}
                      </td>
                    )}
                    {/* <td className="px-6 py-4 whitespace-nowrap flex justify-center self-center">
                    <input
                      name="locked"
                      type="checkbox"
                      checked={stop.locked}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                      disabled={!isEditing}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      name="delivery_note"
                      value={stop.delivery_notes}
                      className="border border-gray-300 p-1 rounded-lg w-full"
                      disabled={!isEditing}
                    />
                  </td> */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* <input
                      type="datetime-local"
                      name="estimated_arrival"
                      value={stop.estimated_arrival}
                      className="border border-gray-300 p-1 rounded-lg w-full"
                      disabled={!isEditing}
                    /> */}
                      <Input
                        type="datetime-local"
                        name="estimated_arrival"
                        defaultValue={stop.estimated_arrival}
                        required={false}
                        disabled={!isEditing}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing && (
                        <ButtonUI
                          variant="danger"
                          buttonName="Remove"
                          size="small"
                          iconName="delete"
                          onClick={() =>
                            setDeliveryStops(
                              deliveryStops.filter((_, i) => i !== index)
                            )
                          }
                        />
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
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
        doctypeInfo={deliveryTripInfo}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        actionType="delete"
        doctype="Delivery Trip"
      />

      <ConfirmModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        actionType="submit"
        doctype="Delivery Trip"
      />

      <ConfirmModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onConfirm={handleConfirmSave}
        actionType="save"
        doctype="Delivery Trip"
      />
    </>
  );
};

export default InfoDeliveryTrip;
