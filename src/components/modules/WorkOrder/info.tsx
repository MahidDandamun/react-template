import React, { useCallback, useEffect, useRef, useState } from "react";
import ButtonUI from "../../ui/ButtonUI";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { toast } from "react-toastify";
import { deleteWorkOrder, getWorkOrderInfo, updateWorkOrder } from "../../../store/services/WorkOrderService";
import Input from "../../shared/Input";
import { getItemList } from "../../../store/services/ItemService";
import SpinnerUI from "../../ui/SpinnerUI";
import ConfirmModal from "../../shared/ConfirmModal";
import { getSuppliersList } from "../../../store/services/SupplierService";
import Header from "../../shared/Header";
import SelectInput from "../../shared/SelectInput";
import ActivityLog from "../../shared/ActivityLog";

const WorkOrderInfo = () => {
  const { name }: any = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const { workOrderInfo, isLoading } = useAppSelector((state) => state.workOrder);
  const { suppliersList } = useAppSelector((state) => state.suppliers);
  const navigate = useNavigate();
  const { itemList } = useAppSelector((state) => state.items)
  const [items, setItems] = useState<{ item_code: string; item_name: string; qty: number; rate: number }[]>([]);

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
    loadInitialItems()
  };

  const handleSubmitClick = () => {
    setIsSubmitModalOpen(true);
  }

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  }

  const handleSaveClick = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaveModalOpen(true);
  }

  const handleConfirmSubmit = useCallback(async () => {
    try {
      const payload = { docstatus: 1 };
      const updatePayload = { name, payload };
      await dispatch(updateWorkOrder(updatePayload)).unwrap();
      toast.success('Successfully submitted Work Order');
      dispatch(getWorkOrderInfo(name));
      setIsSubmitModalOpen(false);
    } catch (error) {
      toast.error('Failed submitting Work Order');
      setIsSubmitModalOpen(false);
    }
  }, [dispatch, name]);

  const handleConfirmDelete = useCallback(async () => {
    try {
      await dispatch(deleteWorkOrder(name)).unwrap();
      toast.success('Successfully deleted Work Order');
      navigate('/work-order');
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error('Failed deleting Work Order');
      setIsDeleteModalOpen(false)
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
        await dispatch(updateWorkOrder(updatePayload)).unwrap();
        toast.success('Work order updated successfully!');
        await dispatch(getWorkOrderInfo(name)).unwrap();
        setIsEditing(false);
        setIsSaveModalOpen(false);
      } catch (error) {
        setIsSaveModalOpen(false)
        setIsEditing(false)
        toast.error('Failed to update work order.');
      }
    }
  }, [dispatch, name, items]);

  useEffect(() => {
    dispatch(getItemList());
    dispatch(getWorkOrderInfo(name));
    dispatch(getSuppliersList())

  }, [dispatch, name]);

  const loadInitialItems = useCallback(() => {
    if (workOrderInfo?.items) {
      setItems(workOrderInfo.items.map((item: any) => ({
        item_code: item.item_code || '',
        item_name: item.item_name || '',
        qty: item.qty || 0,
        rate: item.rate || 0
      })));
    }
  }, [workOrderInfo]);

  useEffect(() => {
    loadInitialItems();
  }, [loadInitialItems]);

  const handleNavigation = () => {
    navigate('/work-order');
  };

  if (isLoading) return <div><SpinnerUI /></div>;
  return (
    <div className="p-2">
      <Header doctypeInfo={workOrderInfo} name={name} isEditing={isEditing} moduleBreadcrumb={({ parentModule: 'Buying', module: 'Work Order' })}
        handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} handleSubmitClick={handleSubmitClick} handleNavigation={handleNavigation} 
        handleActivityLogClick={() => setIsActivityLogOpen(!isActivityLogOpen)} />

      <form ref={formRef} onSubmit={handleSaveClick}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">A. Work order details</h2>
          <div className="grid grid-cols-1 gap-4 w-1/2 pl-10">
            <div>

              <SelectInput label="Supplier" name="supplier" isDisabled={!isEditing} key={workOrderInfo?.supplier}
                defaultValue={
                  suppliersList
                    .map((supplier: any) => ({
                      value: supplier.name,
                      label: (
                        <p className="flex flex-col">
                          <span className="font-bold">{supplier.supplier_name}</span>
                          <span>{supplier.supplier_name}, {supplier.supplier_group}</span>
                        </p>
                      ),
                    }))
                    .find(option => option.value === workOrderInfo?.supplier)
                }
                doctypeList={suppliersList.map((supplier: any) => ({
                  id: supplier.name,
                  group: supplier.supplier_group,
                  item_name: supplier.supplier_name,
                }))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input label="Transaction Date" type="date" name="transaction_date" defaultValue={workOrderInfo?.transaction_date} required disabled={!isEditing} />
              </div>
              <div>
                <Input label="Schedule Date" type="date" name="schedule_date" defaultValue={workOrderInfo?.schedule_date} required disabled={!isEditing} />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">B. Item details</h2>
            {
              isEditing && <ButtonUI variant="primary" buttonName="Add Item" size="medium" iconName="add" onClick={() =>
                setItems([...items, { item_code: "", item_name: "", qty: 0, rate: 0 }])} />
            }
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
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
                    {workOrderInfo?.docstatus !== 1 ?
                      <td className="px-6 py-4 whitespace-nowrap">
                        <SelectInput name="item" isDisabled={!isEditing} key={workOrderInfo?.supplier}
                          defaultValue={
                            itemList
                              .map((item) => ({
                                value: item.name,
                                label: (
                                  <p className="flex flex-col">
                                    <span className="font-bold">{item.name}</span>
                                    <span>{item.item_name}, {item.item_group}</span>
                                  </p>
                                ),
                              }))
                              .find(option => option.value === item.item_code)
                          }
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
                          }))} />
                      </td>
                      : <td className="px-6 py-4 whitespace-nowrap">
                        {item.item_code}: {item.item_name}
                      </td>
                    }
                    {workOrderInfo?.docstatus !== 1 ?
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
                        /> </td>
                      : <td className="px-6 py-4 whitespace-nowrap">
                        {item.qty}
                      </td>
                    }
                    {workOrderInfo?.docstatus !== 1 ?
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
                      : <td className="px-6 py-4 whitespace-nowrap">
                        PHP {item.rate.toFixed(2)}
                      </td>
                    }
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing && (
                        <ButtonUI
                          variant="danger"
                          buttonName="Remove"
                          size="small"
                          iconName="delete"
                          onClick={() => {
                            const newItems = items.filter((_, i) => i !== index);
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
        {isEditing &&
          <div className="flex space-x-4 float-right">
            <ButtonUI variant="danger" buttonName="Cancel" iconName="cancel" size="medium" onClick={handleCancelClick} />
            <ButtonUI variant="dark" buttonName="Save changes" size="medium" type="submit" />
          </div>
        }
      </form>

      <ActivityLog isOpen={isActivityLogOpen} onClose={() => setIsActivityLogOpen(false)} doctypeInfo={workOrderInfo} />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        actionType="delete"
        doctype="Work Order"
      />

      <ConfirmModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        actionType="submit"
        doctype="Work Order"
      />

      <ConfirmModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onConfirm={handleConfirmSave}
        actionType="save"
        doctype="Work Order"
      />

    </div>
  );
};

export default WorkOrderInfo;
