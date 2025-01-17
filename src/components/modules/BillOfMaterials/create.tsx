import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonUI from '../../ui/ButtonUI';
import { toast } from 'react-toastify';
// import SpinnerUI from '../../ui/SpinnerUI';
import Input from '../../shared/Input';
import SelectInput from '../../shared/SelectInput';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getItemList } from '../../../store/services/ItemService';
import { getCompanyList } from "../../../store/services/CompanyService";
import { createBillOfMaterials} from '../../../store/services/BillOfMaterialsService';

const Create = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const { itemList } = useAppSelector((state) => state.items);
  // const { isLoading } = useAppSelector((state) => state.billOfMaterials);
  const { companyList } = useAppSelector((state) => state.company);
  const [items, setItems] = useState<
    { item_code: string; qty: number; rate: number }[]
  >([{ item_code: '', qty: 1, rate:0}]);


  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (formRef.current) {
        const formData = new FormData(formRef.current);
        const item = formData.get('item') as string;
        const company = formData.get('company') as string;
        const quantity = parseFloat(formData.get('quantity') as string) || 0;
        const newBillOfMaterials = {
          item,
          company,
          quantity,
          items
        };

        try {
          const response = await dispatch(  
            createBillOfMaterials(newBillOfMaterials)
          ).unwrap();
          
          toast.success('Bill of Materials created successfully!');
          navigate(response.name);
        } catch (error) {
          console.log(error);
        }
      }
    },
    [dispatch, items, navigate]
  );

  const fetchDetails = useCallback(async () => {
    dispatch(getItemList());
    dispatch(getCompanyList());
  }, [dispatch]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

 

  return (
    <div className="p-2">
      <h1 className="text-3xl font-semibold mb-6">Create Bill of Materials</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            A. Bill of materials details
          </h2>
          <div className="grid grid-cols-1 gap-4 w-1/2 pl-10">
            <div>
              <SelectInput name={`item`} label={"Item"} doctypeList={itemList.filter((data) => data.item_group === "Products")
                .map((data) => ({
                    id: data.name,
                    group: data.item_group,
                    item_name: data.item_name,
                  }))}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <SelectInput label="Company" name="company" doctypeList={companyList
                  .map((company: any) => ({id: company.name}))} />
              </div>
              <div>
                <Input label="Quantity" type="number" name="quantity" min={1} required />               
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">B. Raw materials</h2>
            <ButtonUI
              variant="primary"
              buttonName="Add Item"
              size="medium"
              iconName="add"
              onClick={() =>
                setItems([...items, { item_code: '', qty: 0, rate:0 }])
              }
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
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
                        doctypeList={itemList.filter((item)=>item.item_group!=="Products").map((item) => ({
                          id: item.name,
                          group: item.item_group,
                          item_name: item.item_name,
                          rate:item.rate
                        }))}
                        onSelectChange={(selectedOption) => {
                        if (selectedOption) {
                            const selectedItem = itemList.find(item => item.name === selectedOption.value);
                            if (selectedItem) {
                              const newItems = [...items];
                              newItems[index] = {
                                ...newItems[index],
                                item_code: selectedItem.name,
              
                                rate: selectedItem.rate || 0
                              };
                              setItems(newItems);
                            }
                          }                 
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
                        required
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Input 
                        type="number" 
                        defaultValue={item.rate}
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[index].rate = Number(e.target.value);
                          setItems(newItems);
                        }} 
                        prepend="currency" 
                        min={1} 
                        required 
                        disabled={true}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ButtonUI
                        variant="danger"
                        buttonName="Delete"
                        size="medium"
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
        <div className="mt-8 flex justify-end space-x-4">
          <ButtonUI
            variant="dark"
            type="submit"
            buttonName="Create"
            iconName="add"
            size="medium"
          />
        </div>
      </form>
    </div>
  );
};

export default Create;
