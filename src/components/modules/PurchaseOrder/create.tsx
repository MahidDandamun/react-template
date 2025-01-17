import React, { useCallback, useEffect, useRef, useState } from "react";
import ButtonUI from "../../ui/ButtonUI";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getItemList } from "../../../store/services/ItemService";
import { createPurchaseOrder } from "../../../store/services/PurchaseOrderService";
import { getSuppliersList } from "../../../store/services/SupplierService";
import Input from "../../shared/Input";
import SpinnerUI from "../../ui/SpinnerUI";
import ModalUI from "../../ui/ModalUI";
import { useNavigate } from "react-router-dom";
import SelectInput from "../../shared/SelectInput";

const Create = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const { suppliersList } = useAppSelector((state) => state.suppliers);
  const { itemList } = useAppSelector((state) => state.items);
  const { isLoading } = useAppSelector((state) => state.purchaseOrder);
  const [items, setItems] = useState<
    { item_code: string; qty: number; rate: number }[]
  >([{ item_code: "", qty: 0, rate: 0 }]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (formRef.current) {
        const formData = new FormData(formRef.current);
        const supplier = formData.get("supplier") as string;
        const transaction_date = formData.get("transaction_date") as string;
        const schedule_date = formData.get("schedule_date") as string;

        const newPurchaseOrder = {
          supplier,
          transaction_date,
          schedule_date,
          items,
        };

        try {
          const response = await dispatch(
            createPurchaseOrder(newPurchaseOrder)
          ).unwrap();
          toast.success("Purchase Order created successfully!");
          navigate(response.name);
        } catch (error) {
          toast.error("Failed to create purchase order.");
        }
      }
    },
    [dispatch, items, navigate]
  );

  const fetchDetails = useCallback(async () => {
    dispatch(getSuppliersList());
    dispatch(getItemList());
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
  console.log(suppliersList);

  return (
    <>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="mb-8">
          <h2 className="text-md lg:text-lg font-semibold mb-4">
            A. Purchase order details
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:w-1/2 lg:pl-6">
            <SelectInput
              label="Supplier"
              name="supplier"
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
                required
              />
              <Input
                label="Schedule Date"
                type="date"
                name="schedule_date"
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-md lg:text-lg font-semibold">B. Item details</h2>
            <ButtonUI
              variant="primary"
              buttonName="Add Item"
              size="small"
              iconName="add"
              onClick={() =>
                setItems([...items, { item_code: "", qty: 0, rate: 0 }])
              }
            />
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <SelectInput
                        name={`item_${index}`}
                        doctypeList={itemList.map((data) => ({
                          id: data.name,
                          group: data.item_group,
                          item_name: data.item_name,
                        }))}
                        onSelectChange={(selectedOption) => {
                          const newItems = [...items];
                          newItems[index].item_code = selectedOption.value;
                          setItems(newItems);
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Input
                        type="number"
                        defaultValue={item.qty}
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[index].qty = Number(e.target.value);
                          setItems(newItems);
                        }}
                        min={1}
                        placeholder="0"
                        required
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Input
                        type="number"
                        defaultValue={item.rate}
                        prepend="currency"
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[index].rate = Number(e.target.value);
                          setItems(newItems);
                        }}
                        min={1}
                        placeholder="0.00"
                        required
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ButtonUI
                        variant="danger"
                        buttonName="Delete"
                        size="small"
                        iconName="delete"
                        onClick={() =>
                          setItems(items.filter((_, i) => i !== index))
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

export default Create;
