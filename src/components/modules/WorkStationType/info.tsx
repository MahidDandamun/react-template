import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { deleteWorkstationType, getWorkstationTypeInfo, updateWorkstationType } from "../../../store/services/WorkstationTypeService";
import { WorkstationTypeList } from "../../../interface/output/WorkstationType/WorkstationTypeList";
import { getWorkstationList} from "../../../store/services/WorkstationService";
import Header from "../../shared/Header";
import SpinnerUI from "../../ui/SpinnerUI";
import ConfirmModal from "../../shared/ConfirmModal";
import ButtonUI from "../../ui/ButtonUI";
import { toast } from "react-toastify";
import Input from "../../shared/Input";
import ActivityLog from "../../shared/ActivityLog";

const WorkStationTypeInfo = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name }: any = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [isLinked, setIsLinked] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isActivityLogOpen, setIsActivityLogOpen] = useState(false);

  const { workstationTypeInfo, isLoading } = useAppSelector((state) => state.workStationType);
  const { workstationList } = useAppSelector((state) => state.workStations);

 

  const toggleEditing = useCallback(() => setIsEditing(prev => !prev), []);
  const handleCancelClick = useCallback(() => {
    formRef.current?.reset();
    toggleEditing();
  },[toggleEditing]);


  const handleDeleteClick = useCallback(() => setIsDeleteModalOpen(true), []);

  const handleSaveClick = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaveModalOpen(true);
  }

   useEffect(() => {
    const fetchWorkstationData = async () => {
      await dispatch(getWorkstationList());
      await dispatch(getWorkstationTypeInfo(name));
    };
    fetchWorkstationData();
  }, [dispatch, name]);
 

  const handleConfirmDelete = useCallback(async () => {
    try {
      await dispatch(deleteWorkstationType(name)).unwrap();
      toast.success('Successfully deleted workstation type');
      navigate('/workstation-type');
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error('Failed deleting workstation type');
      setIsDeleteModalOpen(false);
    }
  }, [dispatch, name, navigate]);

  useEffect(() => {
    const linkedTypes = workstationList
      .filter(workstation => workstation.workstation_type)
      .map(workstation => workstation.workstation_type);
    
    setIsLinked(linkedTypes.includes(workstationTypeInfo?.workstation_type || ''));
  }, [workstationList, workstationTypeInfo]);
 
 
 

  const handleConfirmSave = useCallback(
    async () => {

      if (formRef.current) {
        const formData = new FormData(formRef.current);
        let payload: WorkstationTypeList = {
          name: formData.get("name") as string,
          description: formData.get("description") as string,
        };
        const updatePayload = { name, payload };
        try {
          await dispatch(updateWorkstationType(updatePayload)).unwrap();
          toast.success("Successfully updated warehouse information!")
          await dispatch(getWorkstationTypeInfo(name)).unwrap();
          setIsSaveModalOpen(false)
          setIsEditing(false)
        } catch (error) {
          toast.error("Failed updating warehouse information!")
          setIsSaveModalOpen(false)
          setIsEditing(false)
        }
      }
    },
    [dispatch, name, ]
  );
  const handleNavigation = () => {
    navigate('/workstation-type')
  }
  if (isLoading) return <div><SpinnerUI /></div>;
  return (
    <>
      <div className="p-2">
        <Header doctypeInfo={workstationTypeInfo} name={name} isEditing={isEditing} moduleBreadcrumb={({ parentModule: 'Manufacturing', module: 'Workstation Type' })} deleteDisabled={isLinked}
          handleDeleteClick={handleDeleteClick} handleEditClick={toggleEditing} handleNavigation={handleNavigation}
          handleActivityLogClick={() => setIsActivityLogOpen(!isActivityLogOpen)} />

        <form onSubmit={handleSaveClick} ref={formRef} className="w-1/2">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">A. Warehouse details</h2>
            <div className="grid grid-cols-1 gap-4 pl-10">
              <div>
                <Input label="Workstation type" type="text" name="name" required defaultValue={workstationTypeInfo?.name} disabled={!isEditing} key={workstationTypeInfo?.name} />
              </div>
              <div>
                <Input label="Description" type="text" name="description" required defaultValue={workstationTypeInfo?.description} disabled={!isEditing} key={workstationTypeInfo?.description} />
              </div>
            </div>
          </div>


          <hr className="my-4" />
          {isEditing &&
            <div className="mt-8 flex justify-end space-x-4">
              <ButtonUI variant="danger" buttonName="Cancel" iconName="cancel" size="medium" onClick={handleCancelClick} />
              <ButtonUI variant="dark" buttonName="Save changes" size="medium" type="submit" />
            </div>}
        </form>

        <ActivityLog isOpen={isActivityLogOpen} onClose={() => setIsActivityLogOpen(false)} doctypeInfo={workstationTypeInfo} />

        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          actionType="delete"
          doctype="Warehouse"
        />
        <ConfirmModal
          isOpen={isSaveModalOpen}
          onClose={() => setIsSaveModalOpen(false)}
          onConfirm={handleConfirmSave}
          actionType="save"
          doctype="Warehouse"
        />
      </div>

    </>
  
  );
};
export default WorkStationTypeInfo;
