import React from "react";
import ButtonUI from "./ButtonUI";
import StatusUI from "./StatusUI";

interface HeaderProps {
  variant?: string;
  title: string;
  primaryButton?: string;
  status?: any;
  onCreateClick?: () => void; // for navigating the create page
}

const HeaderUI = ({ variant, title, primaryButton, status, onCreateClick }: HeaderProps) => {
  return (
    <div className="flex justify-between flex-row flex-wrap gap-3 lg:gap-0 cursor-default">
      <div className="flex items-center gap-1 lg:gap-3">
        <h1 className="text-xl font-semibold lg:text-3xl">{title}</h1>
        {status && <StatusUI variant={status}></StatusUI>}
      </div>

      {/* if viewing of page only */}
      {variant === "view" && (
        <div className="flex gap-3 ml-auto">
          <ButtonUI
            variant="outline"
            buttonName="Generate Report"
            iconName="report"
            size="medium"
          ></ButtonUI>
          <ButtonUI
            variant="dark"
            buttonName={`${primaryButton}`}
            iconName="add"
            size="medium"
            onClick={onCreateClick}
          ></ButtonUI>
        </div>
      )}

      {/* if editing/creating new record only */}
      {variant === "create" && (
        <div className="flex gap-4 ml-auto">
          <ButtonUI
            id="1"
            variant="outline"
            buttonName="View Logs"
            iconName="logs"
            size="medium"
          ></ButtonUI>
          <ButtonUI
            id="2"
            variant="danger"
            buttonName="Delete"
            iconName="delete"
            size="medium"
          ></ButtonUI>
          <ButtonUI
            id="3"
            variant="warning"
            buttonName="Edit"
            iconName="edit"
            size="medium"
          ></ButtonUI>
          <ButtonUI
            id="3"
            variant="primary"
            buttonName="Submit"
            iconName="submit"
            size="medium"
          ></ButtonUI>
        </div>
      )}

      {/* if cancelling only */}
      {variant === "cancel" && (
        <div className="flex gap-4 ml-auto">
          <ButtonUI
            id="1"
            variant="outline"
            buttonName="View Logs"
            iconName="logs"
            size="medium"
          ></ButtonUI>
          <ButtonUI
            id="2"
            variant="danger"
            buttonName="Cancel"
            iconName="cancel"
            size="medium"
          ></ButtonUI>
        </div>
      )}
    </div>
  );
};

export default HeaderUI;
