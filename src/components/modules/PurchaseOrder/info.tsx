import React, { useCallback, useEffect, useRef, useState } from "react";
import ButtonUI from "../../ui/ButtonUI";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { toast } from "react-toastify";
import {
  deletePurchaseOrder,
  getPurchaseOrderInfo,
  updatePurchaseOrder,
} from "../../../store/services/PurchaseOrderService";
import Input from "../../shared/Input";
import { getItemList } from "../../../store/services/ItemService";
import SpinnerUI from "../../ui/SpinnerUI";
import ConfirmModal from "../../shared/ConfirmModal";
import { getSuppliersList } from "../../../store/services/SupplierService";
import Header from "../../shared/Header";
import SelectInput from "../../shared/SelectInput";
import ActivityLog from "../../shared/ActivityLog";

const PurchaseOrderInfo = () => {
  const { name }: any = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const { purchaseOrderInfo, isLoading } = useAppSelector(
    (state) => state.purchaseOrder
  );
  const { suppliersList } = useAppSelector((state) => state.suppliers);
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
    try {
      const payload = { docstatus: 1 };
      const updatePayload = { name, payload };
      await dispatch(updatePurchaseOrder(updatePayload)).unwrap();
      toast.success("Successfully submitted Purchase Order");
      dispatch(getPurchaseOrderInfo(name));
      setIsSubmitModalOpen(false);
    } catch (error) {
      toast.error("Failed submitting Purchase Order");
      setIsSubmitModalOpen(false);
    }
  }, [dispatch, name]);

  const handleConfirmDelete = useCallback(async () => {
    try {
      await dispatch(deletePurchaseOrder(name)).unwrap();
      toast.success("Successfully deleted Purchase Order");
      navigate("/purchase-order");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Failed deleting Purchase Order");
      setIsDeleteModalOpen(false);
    }
  }, [dispatch, name, navigate]);

  const handleConfirmSave = useCallback(async () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const supplier = formData.get("supplier") as string;
      const transaction_date = formData.get("transaction_date") as string;
      const schedule_date = formData.get("schedule_date") as string;

      const itemsPayload = items.map(({ item_name, ...rest }) => ({
        ...rest,
        schedule_date: schedule_date,
      }));

      const payload = {
        supplier,
        transaction_date,
        schedule_date,
        items: itemsPayload,
      };

      const updatePayload = { name, payload };
      try {
        await dispatch(updatePurchaseOrder(updatePayload)).unwrap();
        toast.success("Purchase order updated successfully!");
        await dispatch(getPurchaseOrderInfo(name)).unwrap();
        setIsEditing(false);
        setIsSaveModalOpen(false);
      } catch (error) {
        setIsSaveModalOpen(false);
        setIsEditing(false);
        toast.error("Failed to update purchase order.");
      }
    }
  }, [dispatch, name, items]);

  useEffect(() => {
    dispatch(getItemList());
    dispatch(getPurchaseOrderInfo(name));
    dispatch(getSuppliersList());
  }, [dispatch, name]);

  const loadInitialItems = useCallback(() => {
    if (purchaseOrderInfo?.items) {
      setItems(
        purchaseOrderInfo.items.map((item: any) => ({
          item_code: item.item_code || "",
          item_name: item.item_name || "",
          qty: item.qty || 0,
          rate: item.rate || 0,
        }))
      );
    }
  }, [purchaseOrderInfo]);

  useEffect(() => {
    loadInitialItems();
  }, [loadInitialItems]);

  const handleNavigation = () => {
    navigate("/purchase-order");
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
        doctypeInfo={purchaseOrderInfo}
        name={name}
        isEditing={isEditing}
        moduleBreadcrumb={{ parentModule: "Buying", module: "Purchase Order" }}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        handleSubmitClick={handleSubmitClick}
        handleNavigation={handleNavigation}
        handleActivityLogClick={() => setIsActivityLogOpen(!isActivityLogOpen)}
      />

      <form ref={formRef} onSubmit={handleSaveClick}>
        <div className="mb-8">
          <h2 className="text-md lg:text-lg font-semibold mb-4">
            A. Purchase order details
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:w-1/2 lg:pl-6">
            <SelectInput
              label="Supplier"
              name="supplier"
              isDisabled={!isEditing}
              key={purchaseOrderInfo?.supplier}
              defaultValue={suppliersList
                .map((supplier: any) => ({
                  value: supplier.name,
                  label: (
                    <p className="flex flex-col">
                      <span className="font-bold">
                        {supplier.supplier_name}
                      </span>
                      <span>
                        {supplier.supplier_name}, {supplier.supplier_group}
                      </span>
                    </p>
                  ),
                }))
                .find((option) => option.value === purchaseOrderInfo?.supplier)}
              doctypeList={suppliersList.map((supplier: any) => ({
                id: supplier.name,
                group: supplier.supplier_group,
                item_name: supplier.supplier_name,
              }))}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Transaction Date"
                type="date"
                name="transaction_date"
                defaultValue={purchaseOrderInfo?.transaction_date}
                required
                disabled={!isEditing}
              />
              <Input
                label="Schedule Date"
                type="date"
                name="schedule_date"
                defaultValue={purchaseOrderInfo?.schedule_date}
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
                    {purchaseOrderInfo?.docstatus !== 1 ? (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <SelectInput
                          name="item"
                          isDisabled={!isEditing}
                          key={purchaseOrderInfo?.supplier}
                          defaultValue={itemList
                            .map((item) => ({
                              value: item.name,
                              label: (
                                <p className="flex flex-col">
                                  <span className="font-md">{item.name}</span>
                                  <span>
                                    {item.item_name}, {item.item_group}
                                  </span>
                                </p>
                              ),
                            }))
                            .find((option) => option.value === item.item_code)}
                          onSelectChange={(selectedOption) => {
                            if (selectedOption) {
                              const newItems = [...items];
                              newItems[index].item_code = selectedOption.value;
                              setItems(newItems);
                            }
                          }}
                          doctypeList={itemList.map((item) => ({
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
                    {purchaseOrderInfo?.docstatus !== 1 ? (
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
                    {purchaseOrderInfo?.docstatus !== 1 ? (
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
        doctypeInfo={purchaseOrderInfo}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        actionType="delete"
        doctype="Purchase Order"
      />

      <ConfirmModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        actionType="submit"
        doctype="Purchase Order"
      />

      <ConfirmModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onConfirm={handleConfirmSave}
        actionType="save"
        doctype="Purchase Order"
      />
    </>
  );
};

export default PurchaseOrderInfo;
