 import React, { useCallback, useEffect, useRef, } from "react";
import ButtonUI from "../../ui/ButtonUI";
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from "../../../hooks";

import { getWorkstationTypeList} from "../../../store/services/WorkstationTypeService";
import { createWorkstation} from "../../../store/services/WorkstationService";
import Input from "../../shared/Input";
import SpinnerUI from "../../ui/SpinnerUI";
import { useNavigate } from "react-router-dom";
import SelectInput from "../../shared/SelectInput";

const Create = () => {
 
  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const { workstationTypeList } = useAppSelector((state) => state.workStationType)
  const { isLoading } = useAppSelector((state) => state.workStations)


  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current)
      
      const workstation_name = formData.get("workstation_name") as string;
      const production_capacity = parseFloat(formData.get("production_capacity") as string) || 0;
      const workstation_type = formData.get("workstation_type") as string;
      const description = formData.get("description") as string;

      const newWorkstation = {
        workstation_name,
        production_capacity,
        workstation_type,
        description,

      };

      try {
        const response = await dispatch(createWorkstation(newWorkstation)).unwrap();
        toast.success('Workstation created successfully!');
        navigate(response.name)

      } catch (error) {
        toast.error('Failed to create Workstation.');
      }
    }
  }, [dispatch,  navigate])

  const fetchDetails = useCallback(async () => {
    dispatch(getWorkstationTypeList());
  }, [dispatch]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails])

  if (isLoading) return <div><SpinnerUI /></div>;
 
  return (

    <div className="p-2">
      <h1 className="text-3xl font-semibold mb-6">Create Workstation</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">A. Workstation details</h2>
          <div className="grid grid-cols-1 gap-4 w-1/2 pl-10">
            <div>
              <Input type="text" label="Workstation Name" placeholder="Enter Workstation Name" name="workstation_name"/>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input label="Production Capacity" type="number" placeholder="Enter Production Capacity" name="production_capacity" min={1} required />
              </div>
              <div>
                <SelectInput label="Workstation Type" name="workstation_type"
                doctypeList={workstationTypeList.map((type) => ({
                  id: type?.name,
                }))}/>
              </div>
            </div>
            <div>
              <Input type="text" label="description" placeholder="Enter Description" name="description"/>
            </div>
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
