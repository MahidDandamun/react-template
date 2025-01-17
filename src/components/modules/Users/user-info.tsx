import React, { useCallback, useEffect, useRef, useState } from "react";
import ButtonUI from "../../ui/ButtonUI";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import Spinner from "../../ui/SpinnerUI";
import {
  deleteUser,
  getRoleList,
  getUserInfo,
  updateUser,
} from "../../../store/services/UserService";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../shared/Header";
import ConfirmModal from "../../shared/ConfirmModal";
import Input from "../../shared/Input";
import ActivityLog from "../../shared/ActivityLog";

const UserInfo = () => {
  const navigate = useNavigate();
  const { name }: any = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const { roleList, isLoading, user_info, userInitialRoles } = useAppSelector(
    (state) => state.users
  );
  const [selectedRoles, setSelectedRoles] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isActivityLogOpen, setIsActivityLogOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };
  const handleCancelClick = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setIsEditing(!isEditing);
    setSelectedRoles(
      userInitialRoles.map((role) => ({
        role: role.role,
      }))
    );
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleSaveClick = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaveModalOpen(true);
  };

  const handleConfirmSave = useCallback(async () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const first_name = formData.get("first_name") as string;
      const middle_name = formData.get("middle_name") as string;
      const last_name = formData.get("last_name") as string;

      const payload = {
        first_name,
        middle_name,
        last_name,
        roles: selectedRoles,
      };
      const updatePayload = { name, payload };

      try {
        await dispatch(updateUser(updatePayload)).unwrap();
        toast.success("Successfully updated user");
        setIsSaveModalOpen(false);
        setIsEditing(false);
      } catch (error) {
        toast.error("Failed to update user");
        setIsSaveModalOpen(false);
        setIsEditing(false);
      }
    }
  }, [dispatch, selectedRoles, name]);

  const handleRoleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = event.target;

      setSelectedRoles((prevState) => {
        if (checked) {
          return [...prevState, { role: value }];
        } else {
          return prevState.filter((role) => role.role !== value);
        }
      });
    },
    []
  );

  const fetchDetails = useCallback(async () => {
    dispatch(getRoleList());
    dispatch(getUserInfo(name));
  }, [dispatch, name]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  useEffect(() => {
    setSelectedRoles(
      userInitialRoles.map((role) => ({
        role: role.role,
      }))
    );
  }, [userInitialRoles]);

  const handleNavigation = () => {
    navigate("/users");
  };

  const handleConfirmDelete = useCallback(async () => {
    try {
      await dispatch(deleteUser(name)).unwrap();
      toast.success("Successfully deleted user");
      setIsDeleteModalOpen(false);
      navigate("/users");
    } catch (error) {
      toast.error("Failed deleting users");
      setIsDeleteModalOpen(false);
    }
  }, [dispatch, name, navigate]);

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  console.log(user_info);

  return (
    <>
      <Header
        doctypeInfo={user_info}
        name={name}
        isEditing={isEditing}
        moduleBreadcrumb={{ parentModule: "User Management", module: "User" }}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        handleNavigation={handleNavigation}
        handleActivityLogClick={() => setIsActivityLogOpen(!isActivityLogOpen)}
      />

      <form onSubmit={handleSaveClick} ref={formRef}>
        <div className="mb-8">
          <h2 className="text-md lg:text-lg font-semibold mb-4">
            A. User Information
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:w-9/12 lg:pl-6">
            <div className="grid lg:grid-cols-3 gap-4">
              <Input
                label="Email"
                type="text"
                name="email"
                required
                disabled={true}
                value={user_info?.email || ""}
              />
              <Input
                label="First Name"
                type="text"
                name="first_name"
                required
                defaultValue={user_info?.first_name || ""}
                disabled={!isEditing}
                key={user_info?.first_name}
              />

              <Input
                label="Middle Name"
                type="text"
                name="middle_name"
                required
                defaultValue={user_info?.middle_name || ""}
                disabled={!isEditing}
                key={user_info?.middle_name}
              />

              <Input
                label="Last Name"
                type="text"
                name="last_name"
                required
                defaultValue={user_info?.last_name || ""}
                disabled={!isEditing}
                key={user_info?.last_name}
              />
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
                    checked={
                      !!selectedRoles.find(
                        (initialRole) => initialRole.role === role.name
                      )
                    }
                    disabled={!isEditing}
                  />
                  <label className="text-gray-700">{role.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className="my-4" />
        {isEditing && (
          <div className="mt-8 flex justify-end space-x-2 lg:space-x-4">
            <ButtonUI
              variant="outline"
              buttonName="Cancel"
              size="medium"
              onClick={handleCancelClick}
            />
            <ButtonUI
              variant="dark"
              type="submit"
              buttonName="Save"
              size="medium"
            />
          </div>
        )}
      </form>

      <ActivityLog
        isOpen={isActivityLogOpen}
        onClose={() => setIsActivityLogOpen(false)}
        doctypeInfo={user_info}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        actionType="delete"
        doctype="User"
      />
      <ConfirmModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onConfirm={handleConfirmSave}
        actionType="save"
        doctype="User"
      />
    </>
  );
};

export default UserInfo;
