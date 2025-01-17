import React, { useCallback, useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import ButtonUI from "../../ui/ButtonUI";
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from "../../../hooks";
import Input from "../../shared/Input";
import SelectInput from "../../shared/SelectInput";
import { getOperationList, createOperation } from "../../../store/services/OperationService";
import { getWorkstationList } from "../../../store/services/WorkstationService";
 

const Create = () => {
 
  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const { workstationList } = useAppSelector((state) => state.workStations);
  const { operationList } = useAppSelector((state) => state.operation);
  const [sub_operations, setOperations] = useState<
    { operation: string; time_in_mins: number  }[]
    >([{ operation: '', time_in_mins: 0, }]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      
      const name = formData.get("name") as string;
      const workstation = formData.get("workstation") as string;
      const description = formData.get("description") as string;

      const newOperation = {
        name,
        workstation,
        description,
        sub_operations
      };

      try {
        const response = await dispatch(createOperation(newOperation)).unwrap();
        toast.success('Operation created successfully!');
        navigate(response.name);

      } catch (error) {
        toast.error('Failed to create Operation.');
      }
    }
  }, [dispatch, sub_operations, navigate]);

  const fetchDetails = useCallback(async () => {
    dispatch(getWorkstationList());
    dispatch(getOperationList());
  }, [dispatch]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails])

  // if (isLoading) return <div><SpinnerUI /></div>;
 
  return (

    <div className="p-2">
      <h1 className="text-3xl font-semibold mb-6">Create Operation</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">A. Operation details</h2>
          <div className="grid grid-cols-1 gap-4 w-1/2 pl-10">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input type="text" label="Operation Name" placeholder="Type Operation name" name="name"/>
              </div>
              <div>
                <SelectInput label="Workstation" name="workstation"
                doctypeList={workstationList.map((type) => ({
                  id: type?.name,
                }))}/>
              </div>
            </div>
            <div>
                <Input type="text" label="Operation Description" placeholder="Type description" name="description"/>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">B. Sub-operations</h2>
            <ButtonUI
              variant="primary"
              buttonName="Add Sub-operation"
              size="medium"
              iconName="add"
              onClick={() =>
                setOperations([...sub_operations, { operation: '', time_in_mins:0 }])
              }
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Operation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Operation Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sub_operations.map((operation, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <SelectInput
                        name={`item_${index}`}
                        doctypeList={operationList.map((operation) => ({
                          id: operation.name,
                        }))}
                        onSelectChange={(selectedOption) => {
                        if (selectedOption) {
                            const selectedItem = operationList.find(item => item.name === selectedOption.value);
                            if (selectedItem) {
                              const newOperations = [...sub_operations];
                              newOperations[index] = {
                                ...newOperations[index],
                                operation: selectedItem.name,
                              };
                              setOperations(newOperations);
                            }
                          }                 
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* <Input type="number" name="time_in_mins" min={1} /> */}
                      <Input
                        type="number"
                        // defaultValue={item.rate}
                        placeholder="0"
                        onChange={(selectedOption) => {
                          const newSubOperations = [...sub_operations];
                          newSubOperations[index].time_in_mins = Number(selectedOption.target.value);
                          setOperations(newSubOperations);
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
                          setOperations(sub_operations.filter((_, i) => i !== index))
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
          <ButtonUI variant="dark" type="submit" buttonName="Create" iconName="add" size="medium" />
        </div>
      </form>
    </div>
  );

};

export default Create;
