import React, { useCallback, useEffect, useRef, useState } from "react";
import ButtonUI from "../../ui/ButtonUI";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { toast } from "react-toastify";
import { getWorkstationInfo, deleteWorkstation, updateWorkstation } from "../../../store/services/WorkstationService";
import { getWorkstationTypeList} from "../../../store/services/WorkstationTypeService";
import Spinner from "../../ui/SpinnerUI";
import Input from "../../shared/Input";
import SelectInput from "../../shared/SelectInput";
import ConfirmModal from "../../shared/ConfirmModal";
import Header from "../../shared/Header";
import ActivityLog from "../../shared/ActivityLog";

const WorkStationInfo = () => {
  const { name }: any = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const { workstationInfo, isLoading } = useAppSelector((state) => state.workStations);
  const { workstationTypeList } = useAppSelector((state) => state.workStationType);
   
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

      await dispatch(updateWorkstation(updatePayload)).unwrap()
      toast.success('Successfully submitted workstation')
      dispatch(getWorkstationInfo(name))
      setIsSubmitModalOpen(false);
    } catch (error) {
      toast.error('Failed submitting workstation')
      setIsSubmitModalOpen(false)
    }
  }, [dispatch, name])

  const handleConfirmDelete = useCallback(async () => {
    try {
      await dispatch(deleteWorkstation(name)).unwrap();
      toast.success('Successfully deleted workstation')
      navigate('/workstation')
      setIsDeleteModalOpen(false)
    } catch (error) {
      toast.error('Failed deleting workstation')
      setIsDeleteModalOpen(false)
    }
  }, [dispatch, name, navigate])

  const handleConfirmSave = useCallback(async () => {

    if (formRef.current) {
      const formData = new FormData(formRef.current)
      const name = formData.get("workstation_name") as string;
      const production_capacity = parseFloat(formData.get("production_capacity") as string) || 0;
      const workstation_type = formData.get("workstation_type") as string;
      const description = formData.get("description") as string;
      
      const payload = {
        production_capacity,
        workstation_type,
        description,
        
      };
      const updatePayload = {payload, name };
      try {
        await dispatch(updateWorkstation(updatePayload)).unwrap();
        toast.success('Workstation updated successfully!');
        await dispatch(getWorkstationInfo(name)).unwrap();
        setIsEditing(false)
        setIsSaveModalOpen(false);
      } catch (error) {
        toast.error('Failed to update Workstation.');
        setIsSaveModalOpen(false)
        setIsEditing(false)
      }
    }
  }, [dispatch, ])

 

 
  useEffect(() => {
    dispatch(getWorkstationTypeList())
    dispatch(getWorkstationInfo(name))
  }, [dispatch, name]);

  const handleNavigation = () => {
    navigate('/workstation')
  }

  if (isLoading) return <div><Spinner /></div>;

  return (
    <div className="p-2">
      <Header doctypeInfo={workstationInfo} name={name} isEditing={isEditing} moduleBreadcrumb={({ parentModule: 'Manufacturing', module: 'Workstation' })}
        handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} handleSubmitClick={handleSubmitClick} handleNavigation={handleNavigation} editDisabled={false}
        handleActivityLogClick={() => setIsActivityLogOpen(!isActivityLogOpen)} />

      <form ref={formRef} onSubmit={handleSaveClick}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">A. Workstation details</h2>
          <div className="grid grid-cols-1 gap-4 w-1/2 pl-10">
            <div>
              <Input label="Workstation Name" type="text" name="workstation_name" defaultValue={workstationInfo?.workstation_name} required disabled={!isEditing} />     
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                <Input label="Production Capacity" type="number" name="production_capacity" min={1} defaultValue={workstationInfo?.production_capacity}
                  required disabled={!isEditing}
                />
                </div>
                <div>
                  <SelectInput label="Workstation Type" name="workstation_type" isDisabled={!isEditing}
                    defaultValue={workstationTypeList?.map((workstation:any) => ({
                      value: workstation?.name,
                      label: (
                        <p className="flex flex-col">
                          <span className="font-bold">{workstation?.name}</span>
                        </p>
                      ),
                    })).find(option => option.value === workstationInfo?.workstation_type)
                }
                doctypeList={workstationTypeList.map((workstationType) => ({
                  id: workstationType.name,
                }))}  
                />
                </div>
            </div>
            <div>
              <Input type="text" label="description" name="description" defaultValue={workstationInfo?.description}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
        <hr className="my-4" />
        {isEditing &&
          <div className="mt-8 flex justify-end space-x-4">
            <ButtonUI variant="danger" buttonName="Cancel" size="medium" iconName="cancel" onClick={handleCancelClick} />
            <ButtonUI variant="dark" type="submit" buttonName="Save" size="medium" />
          </div>}
      </form>

      <ActivityLog isOpen={isActivityLogOpen} onClose={() => setIsActivityLogOpen(false)} doctypeInfo={workstationInfo} />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        actionType="delete"
        doctype="Workstation"
      />

      <ConfirmModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        actionType="submit"
        doctype="Workstation"
      />

      <ConfirmModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onConfirm={handleConfirmSave}
        actionType="save"
        doctype="Workstation"
      />
    </div>
  );
};

export default WorkStationInfo;