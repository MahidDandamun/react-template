import React, { useState } from "react";
import HeaderUI from "../components/ui/HeaderUI";
import BreadcrumbsUI from "../components/ui/BreadcrumbsUI";
import Drivers from "../components/modules/Driver";
import CreateDriver from "../components/modules/Driver/create";

const DriversPage = () => {
  const [currentPage, setCurrentPage] = useState<"index" | "create">("index");

  return (
    <>
      {/* if the current page is index */}
      {currentPage === "index" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Entities"
              breadcrumb2="Drivers"
              currentPage="index"
            ></BreadcrumbsUI>
            <HeaderUI
              variant="view"
              title="Drivers"
              primaryButton="Add Driver"
              onCreateClick={() => setCurrentPage("create")}
            ></HeaderUI>
          </div>
          <Drivers />
        </>
      )}

      {/* if the current page is create */}
      {currentPage === "create" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Entities"
              breadcrumb2="Drivers"
              breadcrumb3="Add Driver"
              currentPage="create"
              onBackClick={() => setCurrentPage("index")}
            ></BreadcrumbsUI>
            <HeaderUI title="Add Driver"></HeaderUI>
          </div>
          <CreateDriver />
        </>
      )}
    </>
  );
};

export default DriversPage;
