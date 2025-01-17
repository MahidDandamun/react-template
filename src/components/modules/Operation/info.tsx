import React, { useCallback, useEffect, useRef, useState } from "react";
import ButtonUI from "../../ui/ButtonUI";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { toast } from "react-toastify";
import Spinner from "../../ui/SpinnerUI";
import Input from "../../shared/Input";
import SelectInput from "../../shared/SelectInput";
import ConfirmModal from "../../shared/ConfirmModal";
import Header from "../../shared/Header";
import ActivityLog from "../../shared/ActivityLog";
import {
  getOperationList,
  getOperationInfo,
  updateOperation,
  deleteOperation
} from "../../../store/services/OperationService";

import { getWorkstationList } from "../../../store/services/WorkstationService";

const OperationInfo = () => {
  const { name }: any = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const { operationList, operationInfo, isLoading } = useAppSelector((state) => state.operation);
  const { workstationList} = useAppSelector((state) => state.workStations);

  const [sub_operations, setOperations] = useState<
  { operation: string; time_in_mins: number  }[]
  >([{ operation: '', time_in_mins: 0, }]);
   
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
    try {
      const payload = { docstatus: 1 };
      const updatePayload = { name, payload }
      await dispatch(updateOperation(updatePayload)).unwrap()
      toast.success('Successfully submitted operation')
      dispatch(getOperationInfo(name))
      setIsSubmitModalOpen(false);
    } catch (error) {
      toast.error('Failed submitting operation')
      setIsSubmitModalOpen(false)
    }
  }, [dispatch, name])

  const handleConfirmDelete = useCallback(async () => {
    try {
      await dispatch(deleteOperation(name)).unwrap();
      toast.success('Successfully deleted operation')
      navigate('/operation')
      setIsDeleteModalOpen(false)
    } catch (error) {
      toast.error('Failed deleting operation')
      setIsDeleteModalOpen(false)
    }
  }, [dispatch, name, navigate])

  const handleConfirmSave = useCallback(async () => {
 
    if (formRef.current) {
      const formData = new FormData(formRef.current)
      const workstation = formData.get("workstation") as string;
      const description = formData.get("description") as string;
      
      const payload = {
        name,
        workstation,
        description,
        sub_operations
      };
      const updatePayload = {payload, name };
      try {
        await dispatch(updateOperation(updatePayload)).unwrap();
        toast.success('Operation updated successfully!');
        await dispatch(getOperationInfo(name)).unwrap();
        setIsEditing(false)
        setIsSaveModalOpen(false);
      } catch (error) {
        toast.error('Failed to update Operation.');
        setIsSaveModalOpen(false)
        setIsEditing(false)
      }
    }
  }, [dispatch, name, sub_operations])
 
  useEffect(() => {
    dispatch(getOperationList())
    dispatch(getWorkstationList())
    dispatch(getOperationInfo(name))
  }, [dispatch, name]);

  const loadInitialItems = useCallback(() => {
    if (operationInfo?.sub_operations) {
      setOperations(operationInfo.sub_operations.map((operation) => ({
        operation: operation.operation || '',
        time_in_mins: operation.time_in_mins || 0,
      }))); 
    }
  }, [operationInfo]);


  useEffect(() => {
    loadInitialItems();
  }, [loadInitialItems]);
  const handleNavigation = () => {
    navigate('/operation')
  }

  if (isLoading) return <div><Spinner /></div>;
 
  return (
    <div className="p-2">
      <Header doctypeInfo={operationInfo} name={name} isEditing={isEditing} moduleBreadcrumb={({ parentModule: 'Manufacturing', module: 'Operation' })}
        handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} handleSubmitClick={handleSubmitClick} handleNavigation={handleNavigation} editDisabled={false}
        handleActivityLogClick={() => setIsActivityLogOpen(!isActivityLogOpen)} />

      <form ref={formRef} onSubmit={handleSaveClick}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">A. Operation details</h2>
          <div className="grid grid-cols-1 gap-4 w-1/2 pl-10">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input label="Operation Name" type="text" name="name" defaultValue={operationInfo?.name} key={operationInfo?.name} disabled={true} />     
              </div>
              <div>
                <SelectInput label="Workstation" name="workstation" isDisabled={!isEditing}
                  defaultValue={workstationList?.map((workstation:any)=>({
                    value:workstation?.name,
                    label:(
                      <p className="flex flex-col">
                          <span className="font-bold">{workstation?.name}</span>
                      </p>
                    )
                  })).find(option => option.value === operationInfo?.workstation)
                  }
                doctypeList={workstationList.map((workstation) => ({
                  id: workstation?.name,
                }))}/>
              </div>
            </div>
            <div>
              <Input type="text" label="Operation description" name="description" defaultValue={operationInfo?.description}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">B. Sub-operations</h2>
            {
              isEditing && <ButtonUI variant="primary" buttonName="Add Item" size="medium" iconName="add" onClick={() =>
              setOperations([...sub_operations, { operation: "",  time_in_mins: 0}])} />
            }      
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
                        isDisabled={!isEditing}
                        defaultValue={operationList.map((operation)=>({
                          value: operation.name,
                          label: (
                            <p className="flex flex-col">
                              <span className="font-bold">{operation.name}</span>
                            </p>
                          ),
                        })).find((option)=> option.value === operation.operation )

                        }
                        
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
                      <Input
                        type="number"
                        value={operation.time_in_mins}
                        onChange={(e) => {
                          const newOperations = [...sub_operations];
                          newOperations[index].time_in_mins = parseInt(e.target.value);
                          setOperations(newOperations);
                        }}
                        disabled={!isEditing}                        
                      /> 
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing && (
                      <ButtonUI
                        variant="danger"
                        buttonName="Delete"
                        size="medium"
                        iconName="delete"
                        onClick={() =>
                          setOperations(sub_operations.filter((_, i) => i !== index))
                        }
                      />)
                      }
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

      <ActivityLog isOpen={isActivityLogOpen} onClose={() => setIsActivityLogOpen(false)} doctypeInfo={operationInfo} />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        actionType="delete"
        doctype="Operation"
      />

      <ConfirmModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        actionType="submit"
        doctype="Operation"
      />

      <ConfirmModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onConfirm={handleConfirmSave}
        actionType="save"
        doctype="Operation"
      />
    </div>
  );
};

export default OperationInfo;