import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ButtonUI from '../../ui/ButtonUI';
import Input from '../../shared/Input';
import SelectInput from '../../shared/SelectInput';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { createRouting } from '../../../store/services/RoutingService';
import { getWorkstationTypeList } from '../../../store/services/WorkstationTypeService';
import { getOperationList } from '../../../store/services/OperationService';


const Create = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const { operationList } = useAppSelector((state) => state.operation);
  const { workstationTypeList } = useAppSelector((state) => state.workStationType);

  const [operations, setOperations] = useState<
    { sequence_id: number; operation: string; workstation_type: string, time_in_mins:number }[]
  >([{ sequence_id: 1, operation: '', workstation_type:'', time_in_mins:0}]);


  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        const routing_name = formData.get('routing_name') as string;
        const newRouting = {
          routing_name,
          operations
        };
        try {
          const response = await dispatch(  
            createRouting(newRouting)
          ).unwrap();
          
          toast.success('Routing created successfully!');
          navigate(response.name);
        } catch (error) {
          console.log(error);
        }
      }
    },
    [dispatch, operations, navigate]
  );

  const fetchDetails = useCallback(async () => {
    dispatch(getWorkstationTypeList());
    dispatch(getOperationList());
  }, [dispatch]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

 
  return (
    <div className="p-2">
      <h1 className="text-3xl font-semibold mb-6">Create Routing</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            A. Routing details
          </h2>
          <div className="grid grid-cols-1 gap-4 w-1/2 pl-10">
            <div>
                <Input label="Routing name" type="text" name="routing_name" placeholder='Enter routing name' required />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">B. BOM Operations</h2>
            <ButtonUI
              variant="primary"
              buttonName="Add Item"
              size="medium"
              iconName="add"
              onClick={() =>
                setOperations([...operations, { sequence_id: 1, operation: '', workstation_type:'', time_in_mins:1}])
              }
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sequence ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Operation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Workstation Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Operation Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {operations.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Input 
                        type="number" 
                        defaultValue={item.sequence_id}
                        placeholder='Sequence ID'
                        onChange={(e) => {
                          const newItems = [...operations];
                          newItems[index].sequence_id = Number(e.target.value);
                          setOperations(newItems);
                        }}
                        min={1} 
                        required />            
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <SelectInput
                        name={`item_${index}`}
                        doctypeList={operationList.map((operation) => ({
                          id: operation.name,
                        }))}
                        onSelectChange={(selectedOption) => {
                        if (selectedOption) {
                            const selectedItem = operationList.find(operation => operation.name === selectedOption.value);
                            if (selectedItem) {
                              const newBoms = [...operations];
                              newBoms[index] = {
                                ...newBoms[index],
                                operation: selectedItem.name,
                              };
                              setOperations(newBoms);
                            }
                          }                 
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <SelectInput
                        name={`item_${index}`}
                        doctypeList={workstationTypeList.map((workstation) => ({
                          id: workstation.name,
                        }))}
                        onSelectChange={(selectedOption) => {
                        if (selectedOption) {
                            const selectedItem = workstationTypeList.find(workstation => workstation.name === selectedOption.value);
                            if (selectedItem) {
                              const newBoms = [...operations];
                              newBoms[index] = {
                                ...newBoms[index],
                                workstation_type: selectedItem.name,
                              };
                              setOperations(newBoms);
                            }
                          }                 
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Input
                        type="number"
                        defaultValue={item.time_in_mins}
                        placeholder='Time in mins'
                        onChange={(e) => {
                          const newItems = [...operations];
                          newItems[index].time_in_mins = Number(e.target.value);
                          setOperations(newItems);
                        }}
                        min={1}
                        required
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ButtonUI
                        variant="danger"
                        buttonName="Delete"
                        size="medium"
                        iconName="delete"
                        onClick={() =>
                          setOperations(operations.filter((_, i) => i !== index))
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
