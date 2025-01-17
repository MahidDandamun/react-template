import React, { useState } from "react";
import HeaderUI from "../components/ui/HeaderUI";
import BreadcrumbsUI from "../components/ui/BreadcrumbsUI";
import Customers from "../components/modules/Customers";
import Create from "../components/modules/Customers/create";

const CustomersPage = () => {
  const [currentPage, setCurrentPage] = useState<"index" | "create">("index");

  return (
    <>
      {/* if the current page is index */}
      {currentPage === "index" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Entities"
              breadcrumb2="Customers"
              currentPage="index"
            ></BreadcrumbsUI>
            <HeaderUI
              variant="view"
              title="Customers"
              primaryButton="Add Customer"
              onCreateClick={() => setCurrentPage("create")}
            ></HeaderUI>
          </div>
          <Customers />
        </>
      )}

      {/* if the current page is create */}
      {currentPage === "create" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Entities"
              breadcrumb2="Customers"
              breadcrumb3="Add Customer"
              currentPage="create"
              onBackClick={() => setCurrentPage("index")}
            ></BreadcrumbsUI>
            <HeaderUI title="Add Customer"></HeaderUI>
          </div>
          <Create />
        </>
      )}
    </>
  );
};

export default CustomersPage;
