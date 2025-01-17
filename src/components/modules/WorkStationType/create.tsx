import React, { useCallback,  useRef, } from 'react';
import ButtonUI from '../../ui/ButtonUI';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { createWorkstationType} from '../../../store/services/WorkstationTypeService';
import Input from '../../shared/Input';
import SpinnerUI from '../../ui/SpinnerUI';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.workStationType);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (formRef.current) {
        const formData = new FormData(formRef.current);
        const workstation_type = formData.get('name') as string;
        const description = formData.get('description') as string;
   
        const newWorkstationType = {
          workstation_type,
          description,
        };

        try {
          const response = await dispatch(
            createWorkstationType(newWorkstationType)
          ).unwrap();
          
          toast.success('Workstation Type created successfully!');
          navigate(response.name);
        } catch (error) {
          console.log(error);
        }
      }
    },
    [dispatch, navigate]
  );

 

  if (isLoading)
    return (
      <div>
        <SpinnerUI />
      </div>
    );

  return (
    <div className="p-2">
      <h1 className="text-3xl font-semibold mb-6">Create Workstation Type</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            A. Workstation Type details
          </h2>
          <div className="grid grid-cols-1 gap-4 pl-10">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input label="Workstation Type" type="text" name="name" placeholder="Enter Workstation Type" required />
              </div>
              <div>
                <Input label="Description" type="text" name="description" placeholder="Enter Description"/>
              </div>
            </div>
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
