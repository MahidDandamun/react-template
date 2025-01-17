import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { toast } from "react-toastify";
import SelectInput from "../../shared/SelectInput";
import Spinner from "../../ui/SpinnerUI";
import ButtonUI from "../../ui/ButtonUI";
import Input from "../../shared/Input";
import ConfirmModal from "../../shared/ConfirmModal"; 
import Header from "../../shared/Header";
import ActivityLog from "../../shared/ActivityLog";
import { deleteRouting, updateRouting, getRoutingInfo } from '../../../store/services/RoutingService';
import { getWorkstationTypeList } from '../../../store/services/WorkstationTypeService';
import { getOperationList } from '../../../store/services/OperationService';
 

const RoutingInfo = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name }: any = useParams();

  const { operationList } = useAppSelector((state) => state.operation);
  const { workstationTypeList } = useAppSelector((state) => state.workStationType);
  const {routingInfo, isLoading} = useAppSelector((state) => state.routing);

  const [isEditing, setIsEditing] = useState(false);
  const [operations, setOperations] = useState<
    { sequence_id: number; operation: string; workstation_type: string, time_in_mins:number }[]
  >([{ sequence_id: 0, operation: '', workstation_type:'', time_in_mins:0}]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isActivityLogOpen, setIsActivityLogOpen] = useState(false);

  const handleCancelClick = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setIsEditing(!isEditing);
    loadInitialItems();
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

        const updatePayload = { name, payload };

        await dispatch(updateRouting(updatePayload)).unwrap();
        toast.success('Successfully submitted Routing');
        dispatch(getRoutingInfo(name));
        setIsSubmitModalOpen(false);
      } catch (error) {
        toast.error('Failed submitting Routing');
        setIsSubmitModalOpen(false);
      }
    }
  }, [dispatch, name])

  const handleConfirmDelete = useCallback(async () => {
    try {
      await dispatch(deleteRouting(name)).unwrap();
      toast.success('Successfully deleted Routing');
      navigate('/routing');
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error('Failed deleting Routing');
      setIsDeleteModalOpen(false);
    }
  }, [dispatch, name, navigate])

  const handleConfirmSave = useCallback(async () => {

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const routing_name = formData.get('routing_name') as string;
      const payload = {
        routing_name,
        operations
      };
 
      const updatePayload = { name, payload };
      try {
        await dispatch(updateRouting(updatePayload)).unwrap();
        toast.success('Routing updated successfully!');
        await dispatch(getRoutingInfo(name)).unwrap();
        setIsEditing(false);
        setIsSaveModalOpen(false);
      } catch (error) {
        toast.error('Failed to update Routing.');
        setIsSaveModalOpen(false);
        setIsEditing(false);
      }
    }
  }, [dispatch, name, operations])

  useEffect(() => {
    if (name) {
      dispatch(getRoutingInfo(name));
    }
     dispatch(getOperationList());
     dispatch(getWorkstationTypeList());
  }, [dispatch, name]);


  const loadInitialItems = useCallback(() => {
    if (routingInfo?.operations) {
      setOperations(routingInfo.operations.map((operation: any) => ({
        operation: operation.operation || '',
        sequence_id: operation.sequence_id || '',
        workstation_type: operation.workstation_type || '',
        time_in_mins: operation.time_in_mins || 0
      }))); 
    }
  }, [routingInfo]);

  useEffect(() => {
    loadInitialItems();
  }, [loadInitialItems]);

  const handleNavigation = () => {
    navigate('/routing')
  }

  if (isLoading) return <div><Spinner /></div>;

  return (
    <div className="p-2">
      <Header doctypeInfo={routingInfo} name={name} isEditing={isEditing} moduleBreadcrumb={({ parentModule: 'Manufacturing', module: 'Routing' })}
        handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} handleSubmitClick={handleSubmitClick} handleNavigation={handleNavigation} editDisabled={false}
        handleActivityLogClick={() => setIsActivityLogOpen(!isActivityLogOpen)} />

      <form ref={formRef} onSubmit={handleSaveClick}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">A. Routing details</h2>
          <div className="grid grid-cols-1 gap-4 w-1/2 pl-10">
            <div>
              <Input label="Routing name" type="text" name="item" defaultValue={routingInfo?.name} key={routingInfo?.name} disabled={true} />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold mb-6">B. BOM Operations</h2>
              {
                isEditing && <ButtonUI variant="primary" buttonName="Add Item" size="medium" iconName="add" onClick={() =>
                  setOperations([...operations, { sequence_id: 0, operation: '', workstation_type:'', time_in_mins:0}])} />
              }
         </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sequence Id</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workstation Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operation Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {operations.map((operation, index) => (
                  <tr key={index}>
                    {routingInfo?.docstatus !== 1 ?
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Input
                          type="number"
                          value={operation.sequence_id}
                          onChange={(e) => {
                            const newItems = [...operations];
                            newItems[index].sequence_id = parseInt(e.target.value);
                            setOperations(newItems);
                          }}
                          min ={1}
                          disabled={!isEditing}
                          required
                        /> </td>
                      : <td className="px-6 py-4 whitespace-nowrap">
                        {operation.sequence_id}
                      </td>
                    }
                    {routingInfo?.docstatus !== 1 ? (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <SelectInput name="Operation" isDisabled={!isEditing} key={routingInfo?.name}
                          defaultValue={
                            operationList.map((operation) => ({
                                value: operation.name,
                                label: (
                                  <p className="flex flex-col">
                                    <span className="font-bold">{operation.name}</span>                    
                                  </p>
                                ),
                              }))
                              .find(option => option.value === operation.operation)
                          }
                          onSelectChange={(selectedOption) => {
                            if (selectedOption) {
                              const newItems = [...operations];
                              newItems[index].operation = selectedOption.value;
                              setOperations(newItems);
                            }
                          }}
                          doctypeList={operationList.map((operation:any) => ({
                            id: operation.name,
                          }))} />
                      </td>)
                      :( <td className="px-6 py-4 whitespace-nowrap">
                        {/* {operation.item_code}: {item.item_name} */}
                      </td>)
                    }
                    {routingInfo?.docstatus !== 1 ? (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <SelectInput name="Operation" isDisabled={!isEditing} key={routingInfo?.name}
                          defaultValue={
                            workstationTypeList.map((workstation) => ({
                                value: workstation?.name,
                                label: (
                                  <p className="flex flex-col">
                                    <span className="font-bold">{workstation?.name}</span>                    
                                  </p>
                                ),
                              }))
                              .find(option => option.value === operation.workstation_type)
                          }
                          onSelectChange={(selectedOption) => {
                            if (selectedOption) {
                              const newItems = [...operations];
                              newItems[index].workstation_type = selectedOption.value;
                              setOperations(newItems);
                            }
                          }}
                          doctypeList={workstationTypeList.map((workstation:any) => ({
                            id: workstation.name,
                          }))} />
                      </td>)
                      :( <td className="px-6 py-4 whitespace-nowrap">
                        {/* {operation.item_code}: {item.item_name} */}
                      </td>)
                    }
                    {routingInfo?.docstatus !== 1 ?
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Input
                          type="number"
                          value={operation.time_in_mins}
                          min={1}
                          onChange={(e) => {
                            const newItems = [...operations];
                            newItems[index].time_in_mins = parseInt(e.target.value);
                            setOperations(newItems);
                          }}
                          disabled={!isEditing}                         
                        /> </td>
                      : <td className="px-6 py-4 whitespace-nowrap">
                        {operation.time_in_mins}
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
                            const newItems = operations.filter((_, i) => i !== index);
                            setOperations(newItems);
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

      <ActivityLog isOpen={isActivityLogOpen} onClose={() => setIsActivityLogOpen(false)} doctypeInfo={routingInfo} />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        actionType="delete"
        doctype="Routing"
      />

      <ConfirmModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        actionType="submit"
        doctype="Routing"
      />

      <ConfirmModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onConfirm={handleConfirmSave}
        actionType="save"
        doctype="Routing"
      />
    </div>
  );
};

export default RoutingInfo;
