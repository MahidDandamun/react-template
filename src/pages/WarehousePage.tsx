import React, { useState } from "react";
import HeaderUI from "../components/ui/HeaderUI";
import BreadcrumbsUI from "../components/ui/BreadcrumbsUI";
import Warehouse from "../components/modules/Warehouse";
import CreateWarehouse from "../components/modules/Warehouse/create";

const WarehousePage = () => {
  const [currentPage, setCurrentPage] = useState<'index' | 'create'>("index");

  return (
    <>
      {/* if the current page is index */}
      {currentPage === "index" && (
        <>
         <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Inventory"
              breadcrumb2="Warehouse"
              currentPage="index"
            ></BreadcrumbsUI>
            <HeaderUI
              variant="view"
              title="Warehouse"
              primaryButton="Add Warehouse"
              onCreateClick={() => setCurrentPage("create")}
            ></HeaderUI>
          </div>
          <Warehouse />
        </>
      )}

      {currentPage === "create" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Inventory"
              breadcrumb2="Warehouse"
              breadcrumb3="Add Warehouse"
              currentPage="create"
              onBackClick={() => setCurrentPage("index")}
            ></BreadcrumbsUI>
            <HeaderUI title="Add Warehouse"></HeaderUI>
          </div>
          <CreateWarehouse />
        </>
      )}
    </>
  )
};

export default WarehousePage;
