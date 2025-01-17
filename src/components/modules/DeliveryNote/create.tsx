import React, { useCallback, useEffect, useRef, useState } from "react";
import ButtonUI from "../../ui/ButtonUI";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getCustomersList } from "../../../store/services/CustomerService";
import {
  createDeliveryNote,
  getUndeliveredSalesOrder,
} from "../../../store/services/DeliveryNoteService";
import { DeliveryNoteItems } from "../../../interface/input/DeliveryNoteInput";
import ModalUI from "../../ui/ModalUI";
import NoDataUI from "../../ui/NoDataUI";
import { useNavigate } from "react-router-dom";
import Input from "../../shared/Input";
import SpinnerUI from "../../ui/SpinnerUI";
import SelectInput from "../../shared/SelectInput";

const Create = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const { customersList } = useAppSelector((state) => state.customers);
  const { undeliveredSalesOrder, isLoading } = useAppSelector(
    (state) => state.deliveryNote
  );
  const [selectedCustomer, setSelectedCustomer] = useState<
    { value: string; label: React.ReactNode } | null | undefined
  >(null);
  const [selectedSalesOrder, setSelectedSalesOrder] = useState<
    { value: string; label: React.ReactNode } | null | undefined
  >(null);
  // const [items, setItems] = useState<DeliveryNoteItems[]>([]);
  const [items, setItems] = useState<DeliveryNoteItems[]>([]);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (formRef.current) {
        const formData = new FormData(formRef.current);
        const customer = formData.get("customer") as string;
        const postingDate = formData.get("posting_date") as string;
        const postingTime = formData.get("posting_time") as string;

        const deliveryNotePayload = {
          customer,
          posting_date: postingDate,
          posting_time: postingTime,
          items,
        };

        try {
          const response = await dispatch(
            createDeliveryNote(deliveryNotePayload)
          ).unwrap();
          toast.success("Successfully created Delivery Note");
          navigate(response.name);
        } catch (error) {
          toast.error("Failed to create Delivery Note");
        }
      }
    },
    [items, dispatch, navigate]
  );

  const fetchCustomersList = useCallback(async () => {
    dispatch(getCustomersList());
  }, [dispatch]);

  const fetchSalesOrderOfCustomer = useCallback(
    async (customer_name: string) => {
      if (customer_name) {
        try {
          await dispatch(getUndeliveredSalesOrder(customer_name));
        } catch (error) {
          console.error("Failed to fetch sales orders of customer:", error);
        }
      }
    },
    [dispatch]
  );

  const handleCustomerChange = useCallback(
    (selectedOption: { value: string; label: React.ReactNode }) => {
      const selectedCustomer = selectedOption;
      setSelectedCustomer(selectedCustomer);
      setSelectedSalesOrder(null);
      fetchSalesOrderOfCustomer(selectedCustomer.value);
    },
    [fetchSalesOrderOfCustomer]
  );

  const handleSalesOrderChange = (selectedOption: {
    value: string;
    label: React.ReactNode;
  }) => {
    const salesOrderName = selectedOption;
    setSelectedSalesOrder(salesOrderName);

    const selectedOrderItems =
      undeliveredSalesOrder.find((order) => order.name === salesOrderName.value)
        ?.items || [];
    const formattedItems = selectedOrderItems.map((item) => ({
      item_name: item.item_name,
      item_code: item.item_code,
      qty: item.qty,
      rate: item.rate,
      amount: item.amount,
      so_detail: item.name,
      against_sales_order: salesOrderName.value,
    }));

    setItems(formattedItems);
  };

  useEffect(() => {
    fetchCustomersList();
  }, [fetchCustomersList]);
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
            A. Delivery note details
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:w-1/2 lg:pl-6">
            <div className="grid lg:grid-cols-2 gap-4">
              <SelectInput
                label="Customer"
                name="customer"
                onSelectChange={handleCustomerChange}
                defaultValue={selectedCustomer}
                doctypeList={customersList.map((item) => ({
                  id: item.name,
                  group: item.customer_group,
                  item_name: item.customer_name,
                }))}
              />
              <SelectInput
                label="Purchase order number"
                name="purchase-order"
                isDisabled={!selectedCustomer}
                defaultValue={selectedSalesOrder}
                onSelectChange={handleSalesOrderChange}
                doctypeList={undeliveredSalesOrder
                  .filter((order) => order.customer === selectedCustomer?.value)
                  .map((item) => ({ id: item.name }))}
              />
              <Input type="date" name="posting_date" label="Posting date" />
              <Input type="time" name="posting_time" label="Posting time" />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-md lg:text-lg font-semibold mb-4">
            B. Item details
          </h2>
          {selectedSalesOrder === null ? (
            <div className="lg:pl-6">
              <NoDataUI
                text=" Select a sales order number"
                subText=" Select a sales order number to populate the items
                    table."
                simpleLayout
              ></NoDataUI>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto max-w-[345px] md:max-w-full lg:pl-6">
                <table className="min-w-max md:min-w-full divide-y divide-gray-200 border rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p>
                            {item.item_code}: {item.item_name}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p>{item.qty}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p>PHP {item.rate.toFixed(2)}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p>PHP {item.amount.toFixed(2)}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
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
