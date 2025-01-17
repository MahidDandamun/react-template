import React, { useCallback, useEffect, useRef, useState } from "react";
import ButtonUI from "../../ui/ButtonUI";
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getItemList } from "../../../store/services/ItemService";
import { createWorkOrder } from "../../../store/services/WorkOrderService";
import { getSuppliersList } from "../../../store/services/SupplierService";
import Input from "../../shared/Input";
import SpinnerUI from "../../ui/SpinnerUI";
import { useNavigate } from "react-router-dom";
import SelectInput from "../../shared/SelectInput";

const Create = () => {
  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const { suppliersList } = useAppSelector((state) => state.suppliers)
  const { itemList } = useAppSelector((state) => state.items)
  const { isLoading } = useAppSelector((state) => state.workOrder)
  const [items, setItems] = useState<
    { item_code: string; qty: number; rate: number }[]
  >([{ item_code: '', qty: 0, rate: 0 }]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current)
      const supplier = formData.get("supplier") as string;
      const transaction_date = formData.get("transaction_date") as string;
      const schedule_date = formData.get("schedule_date") as string;

      const newWorkOrder = {
        supplier,
        transaction_date,
        schedule_date,
        items,
      };

      try {
        const response = await dispatch(createWorkOrder(newWorkOrder)).unwrap();
        toast.success('Work Order created successfully!');
        navigate(response.name)

      } catch (error) {
        toast.error('Failed to create work order.');
      }
    }
  }, [dispatch, items, navigate])

  const fetchDetails = useCallback(async () => {
    dispatch(getSuppliersList());
    dispatch(getItemList());
  }, [dispatch]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails])

  if (isLoading) return <div><SpinnerUI /></div>;
  console.log(suppliersList)
  return (

    <div className="p-2">

      <h1 className="text-3xl font-semibold mb-6">Create Work Order</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">A. Work order details</h2>
          <div className="grid grid-cols-1 gap-4 w-1/2 pl-10">
            <div>
              <SelectInput label="Supplier" name="supplier" doctypeList={suppliersList.map((supplier: any) => ({
                id: supplier.name,
                group: supplier.supplier_group,
                item_name: supplier.supplier_name,
              }))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input label="Transaction Date" type="date" name="transaction_date" required />
              </div>
              <div>
                <Input label="Schedule Date" type="date" name="schedule_date" required />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">B. Item details</h2>
            <ButtonUI variant="primary" buttonName="Add Item" size="medium" iconName="add" onClick={() =>
              setItems([...items, { item_code: "", qty: 0, rate: 0 }])} />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
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
                      <Input type="number" defaultValue={item.qty} onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].qty = Number(e.target.value);
                        setItems(newItems);
                      }} min={1} required />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Input type="number" defaultValue={item.rate} prepend="currency" onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].rate = Number(e.target.value);
                        setItems(newItems);
                      }} min={1} required />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ButtonUI variant="danger" buttonName="Delete" size="medium" iconName="delete" onClick={() =>
                        setItems(items.filter((_, i) => i !== index))
                      } />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <hr className="my-4" />
        <div className="mt-8 flex justify-end space-x-4">
          <ButtonUI variant="dark" type="submit" buttonName="Create" iconName="add" size="medium" />
        </div>
      </form>
    </div>
  );

};

export default Create;
