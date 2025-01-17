import React, { useState } from "react";
import HeaderUI from "../components/ui/HeaderUI";
import BreadcrumbsUI from "../components/ui/BreadcrumbsUI";
import Suppliers from "../components/modules/Suppliers";
import Create from "../components/modules/Suppliers/create";

const SuppliersPage = () => {
  const [currentPage, setCurrentPage] = useState<"index" | "create">("index");

  return (
    <>
      {/* if the current page is index */}
      {currentPage === "index" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Entities"
              breadcrumb2="Suppliers"
              currentPage="index"
            ></BreadcrumbsUI>
            <HeaderUI
              variant="view"
              title="Suppliers"
              primaryButton="Add Supplier"
              onCreateClick={() => setCurrentPage("create")}
            ></HeaderUI>
          </div>
          <Suppliers />
        </>
      )}

      {/* if the current page is create */}
      {currentPage === "create" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Entities"
              breadcrumb2="Suppliers"
              breadcrumb3="Add Supplier"
              currentPage="create"
              onBackClick={() => setCurrentPage("index")}
            ></BreadcrumbsUI>
            <HeaderUI title="Add Supplier"></HeaderUI>
          </div>
          <Create />
        </>
      )}
    </>
  );
};

export default SuppliersPage;
