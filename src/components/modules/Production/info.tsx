import React, { useCallback, useEffect, useRef, useState } from "react";
import ButtonUI from "../../ui/ButtonUI";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { toast } from "react-toastify";
import { getBillOFMaterialsInfo, deleteBillOfMaterials, updateBillOfMaterials } from "../../../store/services/BillOfMaterialsService";
import { getItemList } from "../../../store/services/ItemService";
import { getCompanyList } from "../../../store/services/CompanyService";
import SelectInput from "../../shared/SelectInput";
import Spinner from "../../ui/SpinnerUI";
import Input from "../../shared/Input";
import ConfirmModal from "../../shared/ConfirmModal"; 
import Header from "../../shared/Header";
import ActivityLog from "../../shared/ActivityLog";

const BillOfMaterialsInfo = () => {
  const { name }: any = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const { billOfMaterialsInfo, isLoading } = useAppSelector((state) => state.billOfMaterials);
  const { companyList } = useAppSelector((state) => state.company);
  const [items, setItems] = useState<{ item_code: string; item_name: string; qty: number; rate: number }[]>([]);
  const { itemList } = useAppSelector((state) => state.items)
  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isActivityLogOpen, setIsActivityLogOpen] = useState(false);

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


  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleConfirmSubmit = useCallback(async () => {
    if (name) {
      try {
        const payload = { docstatus: 1 };

        const updatePayload = { name, payload }

        await dispatch(updateBillOfMaterials(updatePayload)).unwrap()
        toast.success('Successfully submitted Bill of Materials')
        dispatch(getBillOFMaterialsInfo(name))
        setIsSubmitModalOpen(false);
      } catch (error) {
        toast.error('Failed submitting Bill of Materials')
        setIsSubmitModalOpen(false)
      }
    }
  }, [dispatch, name])

  const handleConfirmDelete = useCallback(async () => {
    try {
      await dispatch(deleteBillOfMaterials(name)).unwrap();
      toast.success('Successfully deleted Bill of Materials')
      navigate('/bill-of-materials')
      setIsDeleteModalOpen(false)
    } catch (error) {
      toast.error('Failed deleting Bill of Materials')
      setIsDeleteModalOpen(false)
    }
  }, [dispatch, name, navigate])

  const handleConfirmSave = useCallback(async () => {

    if (formRef.current) {
      const formData = new FormData(formRef.current)
        const item = formData.get('item') as string;
        const company = formData.get('company') as string;
        const quantity = parseFloat(formData.get('quantity') as string) || 0;
        const itemsPayload = items.map(({ item_name, ...rest }) => ({
        ...rest,
      }));
      const payload = {
        item,
        company,
        quantity,
        items:itemsPayload
      };
 
      const updatePayload = { name, payload };
      try {
        await dispatch(updateBillOfMaterials(updatePayload)).unwrap();
        toast.success('Bill of Materials updated successfully!');
        await dispatch(getBillOFMaterialsInfo(name)).unwrap();
        setIsEditing(false)
        setIsSaveModalOpen(false);
      } catch (error) {
        toast.error('Failed to update Bill of Materials.');
        setIsSaveModalOpen(false)
        setIsEditing(false)
      }
    }
  }, [dispatch, name, items])

  useEffect(() => {
    if (name) {
      dispatch(getBillOFMaterialsInfo(name));
    }
     dispatch(getItemList());
     dispatch(getCompanyList());
  }, [dispatch, name]);

  const loadInitialItems = useCallback(() => {
  if (billOfMaterialsInfo?.items) {
    setItems(billOfMaterialsInfo.items.map((item: any) => ({
      item_code: item.item_code || '',
      item_name: item.item_name || '',
      qty: item.qty || 0,
      rate: item.rate || 0
    }))); 
  }
  }, [billOfMaterialsInfo]);

  useEffect(() => {
    loadInitialItems();
  }, [loadInitialItems]);

  const handleNavigation = () => {
    navigate('/bill-of-materials')
  }

  if (isLoading) return <div><Spinner /></div>;

  return (
    <div className="p-2">
      <Header doctypeInfo={billOfMaterialsInfo} name={name} isEditing={isEditing} moduleBreadcrumb={({ parentModule: 'Manufacturing', module: 'BOM' })}
        handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} handleSubmitClick={handleSubmitClick} handleNavigation={handleNavigation} editDisabled={false}
        handleActivityLogClick={() => setIsActivityLogOpen(!isActivityLogOpen)} />

      <form ref={formRef} onSubmit={handleSaveClick}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">A. Bill of Material details</h2>
 
          <div className="grid grid-cols-1 gap-4 w-1/2 pl-10">
            <div>
              <Input label="item" type="text" name="item" defaultValue={billOfMaterialsInfo?.item} key={billOfMaterialsInfo?.item} disabled={true} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <SelectInput label="Company" name="company" isDisabled={!isEditing}
                    defaultValue={companyList?.map((company:any) => ({
                      value: company?.name,
                      label: (
                        <p className="flex flex-col">
                          <span className="font-bold">{company?.name}</span>
                        </p>
                      ),
                    })).find(option => option.value === billOfMaterialsInfo?.company)
                }
                doctypeList={companyList.map((company) => ({
                  id: company.name,
                }))}  
                />
              </div>
              <div>
                <Input label="Quantity" type="number" name="quantity" defaultValue={billOfMaterialsInfo?.quantity} key={billOfMaterialsInfo?.quantity} required disabled={!isEditing} />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold mb-6">B. Raw materials</h2>
              {
                isEditing && <ButtonUI variant="primary" buttonName="Add Item" size="medium" iconName="add" onClick={() =>
                  setItems([...items, { item_code: "", item_name: "", qty: 0, rate: 0 }])} />
              }
         </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item, index) => (
                  <tr key={index}>
                    {billOfMaterialsInfo?.docstatus !== 1 ? (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <SelectInput name="item" isDisabled={!isEditing} key={billOfMaterialsInfo?.item}
                          defaultValue={
                            itemList
                              .filter((data) => data.item_group !== "Products")
                              .map((data) => ({
                                value: data.name,
                                label: (
                                  <p className="flex flex-col">
                                    <span className="font-bold">{data.name}</span>
                                    <span>{data.item_name}, {data.item_group}</span>
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
                          doctypeList={itemList.map((item:any) => ({
                            id: item.name,
                            group: item.item_group,
                            item_name: item.item_name,
                          }))} />
                      </td>)
                      :( <td className="px-6 py-4 whitespace-nowrap">
                        {item.item_code}: {item.item_name}
                      </td>)
                    }
                    {billOfMaterialsInfo?.docstatus !== 1 ?
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      PHP {item.rate.toFixed(2)}
                    </td>
                    
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
        <hr className="my-4" />
        {isEditing &&
          <div className="mt-8 flex justify-end space-x-4">
            <ButtonUI variant="danger" buttonName="Cancel" size="medium" iconName="cancel" onClick={handleCancelClick} />
            <ButtonUI variant="dark" type="submit" buttonName="Save" size="medium" />
          </div>}
      </form>

      <ActivityLog isOpen={isActivityLogOpen} onClose={() => setIsActivityLogOpen(false)} doctypeInfo={billOfMaterialsInfo} />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        actionType="delete"
        doctype="BOM"
      />

      <ConfirmModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        actionType="submit"
        doctype="BOM"
      />

      <ConfirmModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onConfirm={handleConfirmSave}
        actionType="save"
        doctype="BOM"
      />
    </div>
  );
};

export default BillOfMaterialsInfo;
