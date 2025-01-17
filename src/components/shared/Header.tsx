import React from "react";
import Status from "./Status";
import ButtonUI from "../ui/ButtonUI";

interface HeaderProps {
  name: string;
  doctypeInfo: any;
  isEditing?: boolean;
  handleNavigation: () => void;
  handleEditClick?: () => void;
  handleDeleteClick: () => void;
  handleSubmitClick?: () => void;
  handleActivityLogClick?: () => void;
  moduleBreadcrumb: { parentModule: string; module: string };
  editDisabled?: boolean;
  deleteDisabled?: boolean;
}

const Header = ({
  name,
  doctypeInfo,
  handleNavigation,
  isEditing,
  handleEditClick,
  handleDeleteClick,
  handleSubmitClick,
  handleActivityLogClick,
  moduleBreadcrumb,
  editDisabled,
  deleteDisabled,
}: HeaderProps) => (
  <>
    <div className="text-gray-500 mb-2">
      <ButtonUI
        breadcrumb={true}
        variant="link"
        buttonName={moduleBreadcrumb.parentModule}
        size="medium"
        onClick={handleNavigation}
      />
      <span className="text-gray-400 mx-2 lg:mx-3 text-zinc-500 cursor-default">
        /
      </span>
      <ButtonUI
        breadcrumb={true}
        variant="link"
        buttonName={moduleBreadcrumb.module}
        size="medium"
        onClick={handleNavigation}
      />
      <span className="text-gray-400 mx-2 lg:mx-3 text-zinc-500 cursor-default">
        /
      </span>
      <ButtonUI
        breadcrumb={true}
        variant="link"
        buttonName={`View ${moduleBreadcrumb.module}`}
        size="medium"
      />
    </div>

    <div className="flex flex-col justify-left items-left gap-4 lg:flex-row lg:justify-between lg:items-center mb-6">
      <div className="flex items-center space-x-2 lg:space-x-4 relative">
        <h1 className="text-xl font-semibold lg:text-3xl">{name}</h1>
        {doctypeInfo?.status ? (
          <Status status={doctypeInfo.status} />
        ) : doctypeInfo?.disabled !== undefined ? (
          <Status
            status={doctypeInfo.disabled === 0 ? "Enabled" : "Disabled"}
          />
        ) : doctypeInfo?.enabled !== undefined ? (
          <Status status={doctypeInfo.enabled === 1 ? "Enabled" : "Disabled"} />
        ) : doctypeInfo?.docstatus !== undefined ? (
          <Status status={doctypeInfo.docstatus === 1 ? "Submitted" : "Draft"} />
        ):null}
      </div>
      {!isEditing && (
        <div className="flex space-x-4 self-end">
          <ButtonUI
            variant="outline"
            buttonName="Print"
            iconName="print"
            size="medium"
          />
          <ButtonUI
            variant="outline"
            buttonName="View Logs"
            iconName="logs"
            size="medium"
            onClick={handleActivityLogClick}
          />
          {doctypeInfo?.docstatus !== 1 && (
            <>
              <ButtonUI
                variant="danger"
                buttonName="Delete"
                iconName="delete"
                size="medium"
                disabled={deleteDisabled || false}
                onClick={handleDeleteClick}
              />
              <ButtonUI
                variant="warning"
                buttonName="Edit"
                iconName="edit"
                size="medium"
                onClick={handleEditClick}
                disabled={editDisabled || false}
              />
              {handleSubmitClick && (
                <ButtonUI
                  variant="primary"
                  buttonName="Submit"
                  iconName="submit"
                  size="medium"
                  onClick={handleSubmitClick}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  </>
);

export default Header;
