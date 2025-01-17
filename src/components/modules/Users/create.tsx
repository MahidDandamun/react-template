import React, { useCallback, useEffect, useRef, useState } from "react";
import ButtonUI from "../../ui/ButtonUI";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import Spinner from "../../ui/SpinnerUI";
import ModalUI from "../../ui/ModalUI";
import { createUser, getRoleList } from "../../../store/services/UserService";
import { useNavigate } from "react-router-dom";
import Input from "../../shared/Input";

const Create = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const { roleList, isLoading } = useAppSelector((state) => state.users);
  const [selectedRoles, setSelectedRoles] = useState<{ role: string }[]>([]);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (formRef.current) {
        const formData = new FormData(formRef.current);
        const email = formData.get("email") as string;
        const first_name = formData.get("first_name") as string;
        const middle_name = formData.get("middle_name") as string;
        const last_name = formData.get("last_name") as string;

        const payload = {
          email,
          first_name,
          middle_name,
          last_name,
          roles: selectedRoles,
        };
        console.log(payload);
        console.log(selectedRoles);

        try {
          const response = await dispatch(createUser(payload)).unwrap();
          toast.success("Successfully created user");
          navigate(response.name);
        } catch (error) {
          toast.error("Failed to create user");
        }
      }
    },
    [dispatch, selectedRoles, navigate]
  );

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    setSelectedRoles((prevState) => {
      if (checked) {
        return [...prevState, { role: value }];
      } else {
        return prevState.filter((role) => role.role !== value);
      }
    });
  };

  const fetchDetails = useCallback(async () => {
    dispatch(getRoleList());
  }, [dispatch]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );

  return (
    <>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="mb-8">
          <h2 className="text-md lg:text-lg font-semibold mb-4">
            A. User Information
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:w-9/12 lg:pl-6">
            <div className="grid lg:grid-cols-3 gap-4">
              <Input
                label="First Name"
                type="text"
                name="first_name"
                required
              />
              <Input
                label="Middle Name"
                type="text"
                name="middle_name"
                required
              />
              <Input label="Last Name" type="text" name="last_name" required />
              <Input label="Email" type="text" name="email" required />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-md lg:text-lg font-semibold mb-4">
            B. Roles Assignment
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:pl-6">
            <div className="grid lg:grid-cols-4 gap-4">
              {roleList.map((role, index) => (
                <div className="flex items-center" key={index}>
                  <input
                    type="checkbox"
                    value={role.name}
                    className="mr-2"
                    onChange={handleRoleChange}
                  />
                  <label className="text-gray-700">{role.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="mt-8 flex justify-end space-x-2 lg:space-x-4">
          <ButtonUI
            variant="outline"
            type="button"
            buttonName="Cancel"
            size="medium"
            onClick={() => setIsModalOpen(true)}
          />
          <ButtonUI
            variant="dark"
            type="submit"
            buttonName="Save as draft"
            size="medium"
            disabled // the button will be enabled when the form was completed
          />
          <ButtonUI
            variant="dark"
            type="submit"
            buttonName="Save and submit"
            size="medium"
            disabled // the button will be enabled when the form was completed
          />
        </div>
      </form>

      {/* a modal will show if the form was not completed but they opt to cancel it */}
      {isModalOpen && (
        <ModalUI
          id="cancelModal"
          variant="info"
          title="Are you sure you want to leave this page?"
          subText="The unfinished form will not be saved."
          leftButtonText="No, wait"
          rightButtonText="Exit page"
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Create;
