import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  deleteSalesOrder,
  getSalesOrderInfo,
  updateSalesOrder,
} from "../../../store/services/SalesOrderService";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { toast } from "react-toastify";
import SpinnerUI from "../../ui/SpinnerUI";
import Header from "../../shared/Header";
import { getCustomersList } from "../../../store/services/CustomerService";
import Input from "../../shared/Input";
import ButtonUI from "../../ui/ButtonUI";
import { getItemList } from "../../../store/services/ItemService";
import ConfirmModal from "../../shared/ConfirmModal";
import SelectInput from "../../shared/SelectInput";
import { salesOrderType } from "../../../utils/doctypeOptions";
import ActivityLog from "../../shared/ActivityLog";

const SalesOrderInfo = () => {
  const { name }: any = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const { salesOrderInfo, isLoading } = useAppSelector(
    (state) => state.salesOrder
  );
  const { customersList } = useAppSelector((state) => state.customers);
  const navigate = useNavigate();

  const { itemList } = useAppSelector((state) => state.items);
  const [items, setItems] = useState<
    { item_code: string; item_name: string; qty: number; rate: number }[]
  >([]);

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
    loadInitialItems();
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

  const handleConfirmSubmit = useCallback(async () => {
    if (name) {
      try {
        const payload = { docstatus: 1 };
        const updatePayload = { name, payload };

        await dispatch(updateSalesOrder(updatePayload));
        toast.success("Successfully submitted Sales Order");
        dispatch(getSalesOrderInfo(name));
        setIsSubmitModalOpen(false);
      } catch (error) {
        toast.error("Failed submitting salesorder");
        setIsSubmitModalOpen(false);
      }
    }
  }, [dispatch, name]);

  const handleConfirmDelete = useCallback(async () => {
    try {
      await dispatch(deleteSalesOrder(name)).unwrap();
      toast.success("Successfully deleted Sales Order");
      navigate("/sales-order");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Failed deleting Sales Order");
      setIsDeleteModalOpen(false);
    }
  }, [dispatch, name, navigate]);

  const handleConfirmSave = useCallback(async () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const customer = formData.get("customer") as string;
      const order_type = formData.get("order_type") as string;
      const transaction_date = formData.get("transaction_date") as string;
      const delivery_date = formData.get("delivery_date") as string;
      const itemsPayload = items.map(({ item_name, ...rest }) => ({
        ...rest,
      }));
      const payload = {
        customer,
        order_type: order_type,
        transaction_date: transaction_date,
        delivery_date: delivery_date,
        items: itemsPayload,
      };
      const updatePayload = { name, payload };
      console.log(payload);
      try {
        await dispatch(updateSalesOrder(updatePayload)).unwrap();
        toast.success("Sales order updated successfully!");
        await dispatch(getSalesOrderInfo(name)).unwrap();
        setIsEditing(false);
        setIsSaveModalOpen(false);
      } catch (error) {
        toast.error("Failed to update sales order.");
        setIsSaveModalOpen(false);
        setIsEditing(false);
      }
    }
  }, [dispatch, name, items]);

  useEffect(() => {
    if (name) {
      dispatch(getSalesOrderInfo(name));
    }
    dispatch(getCustomersList());
    dispatch(getItemList());
  }, [dispatch, name]);

  const loadInitialItems = useCallback(() => {
    if (salesOrderInfo?.items) {
      setItems(
        salesOrderInfo.items.map((item: any) => ({
          item_code: item.item_code || "",
          item_name: item.item_name || "",
          qty: item.qty || 0,
          rate: item.rate || 0,
        }))
      );
    }
  }, [salesOrderInfo]);

  useEffect(() => {
    loadInitialItems();
  }, [loadInitialItems]);

  const handleNavigation = () => {
    navigate("/sales-order");
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
        doctypeInfo={salesOrderInfo}
        name={name}
        isEditing={isEditing}
        moduleBreadcrumb={{ parentModule: "Selling", module: "Sales Order" }}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        handleSubmitClick={handleSubmitClick}
        handleNavigation={handleNavigation}
        handleActivityLogClick={() => setIsActivityLogOpen(!isActivityLogOpen)}
      />

      <form ref={formRef} onSubmit={handleSaveClick}>
        <div className="mb-8">
          <h2 className="text-md lg:text-lg font-semibold mb-4">
            A. Sales order details
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:w-1/2 lg:pl-6">
            <div className="grid lg:grid-cols-2 gap-4">
              <SelectInput
                label="Customer"
                name="customer"
                isDisabled={!isEditing}
                defaultValue={customersList
                  .map((item:any) => ({
                    value: item.name,
                    label: (
                      <p className="flex flex-col">
                        <span className="font-bold">{item.name}</span>
                        <span>
                          {item.customer_name}, {item.customer_group}
                        </span>
                      </p>
                    ),
                  }))
                  .find((option:any) => option.value === salesOrderInfo?.customer)}
                doctypeList={customersList.map((item:any) => ({
                  id: item.name,
                  group: item.customer_group,
                  item_name: item.customer_name,
                }))}
              />
              <SelectInput
                label="Order Type"
                name="order_type"
                isDisabled={!isEditing}
                defaultValue={salesOrderType
                  .map((item) => ({
                    value: item.id,
                    label: (
                      <p className="flex flex-col">
                        <span className="font-bold">{item.id}</span>
                      </p>
                    ),
                  }))
                  .find(
                    (option) => option.value === salesOrderInfo?.order_type
                  )}
                doctypeList={salesOrderType}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Transaction Date"
                type="date"
                name="transaction_date"
                defaultValue={salesOrderInfo?.transaction_date}
                required
                disabled={!isEditing}
              />

              <Input
                label="Delivery Date"
                type="date"
                name="delivery_date"
                defaultValue={salesOrderInfo?.delivery_date}
                required
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-md lg:text-lg font-semibold mb-4">
              B. Item details
            </h2>
            {isEditing && (
              <ButtonUI
                variant="primary"
                buttonName="Add Item"
                size="small"
                iconName="add"
                onClick={() =>
                  setItems([
                    ...items,
                    { item_code: "", item_name: "", qty: 0, rate: 0 },
                  ])
                }
              />
            )}
          </div>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item, index) => (
                  <tr key={index}>
                    {salesOrderInfo?.docstatus !== 1 ? (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <SelectInput
                          name="item"
                          isDisabled={!isEditing}
                          defaultValue={itemList
                            .map((item:any) => ({
                              value: item.name,
                              label: (
                                <p className="flex flex-col">
                                  <span className="font-bold">{item.name}</span>
                                  <span>
                                    {item.item_name}, {item.item_group}
                                  </span>
                                </p>
                              ),
                            }))
                            .find((option:any) => option.value === item.item_code)}
                          onSelectChange={(selectedOption) => {
                            if (selectedOption) {
                              const newItems = [...items];
                              newItems[index].item_code = selectedOption.value;
                              setItems(newItems);
                            }
                          }}
                          doctypeList={itemList.map((item:any) => ({
                            id: item.name,
                            group: item.item_group,
                            item_name: item.item_name,
                          }))}
                        />
                      </td>
                    ) : (
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.item_code}: {item.item_name}
                      </td>
                    )}
                    {salesOrderInfo?.docstatus !== 1 ? (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Input
                          type="number"
                          value={item.qty}
                          onChange={(e) => {
                            const newItems = [...items];
                            newItems[index].qty = parseInt(e.target.value);
                            setItems(newItems);
                          }}
                          disabled={!isEditing}
                          required
                        />{" "}
                      </td>
                    ) : (
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.qty}
                      </td>
                    )}
                    {salesOrderInfo?.docstatus !== 1 ? (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Input
                          type="number"
                          value={item.rate}
                          prepend="currency"
                          onChange={(e) => {
                            const newItems = [...items];
                            newItems[index].rate = parseFloat(e.target.value);
                            setItems(newItems);
                          }}
                          disabled={!isEditing}
                          required
                        />
                      </td>
                    ) : (
                      <td className="px-6 py-4 whitespace-nowrap">
                        PHP {item.rate.toFixed(2)}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing && (
                        <ButtonUI
                          variant="danger"
                          buttonName="Remove"
                          size="small"
                          iconName="delete"
                          onClick={() => {
                            const newItems = items.filter(
                              (_, i) => i !== index
                            );
                            setItems(newItems);
                          }}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
        doctypeInfo={salesOrderInfo}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        actionType="delete"
        doctype="Sales Order"
      />

      <ConfirmModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        actionType="submit"
        doctype="Sales Order"
      />

      <ConfirmModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onConfirm={handleConfirmSave}
        actionType="save"
        doctype="Sales Order"
      />
    </>
  );
};

export default SalesOrderInfo;
