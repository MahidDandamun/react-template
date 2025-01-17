import React, { useState } from "react";
import HeaderUI from "../components/ui/HeaderUI";
import BreadcrumbsUI from "../components/ui/BreadcrumbsUI";
import SalesOrder from "../components/modules/SalesOrder";
import Create from "../components/modules/SalesOrder/create";

const SalesOrderPage = () => {
  const [currentPage, setCurrentPage] = useState<"index" | "create">("index");

  return (
    <>
     {/* if the current page is index */}
      {currentPage === "index" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Selling"
              breadcrumb2="Sales Order"
              currentPage="index"
            ></BreadcrumbsUI>
            <HeaderUI
              variant="view"
              title="Sales Order"
              primaryButton="Create Sales Order"
              onCreateClick={() => setCurrentPage("create")}
            ></HeaderUI>
          </div>
          <SalesOrder />
        </>
      )}

       {/* if the current page is create */}
      {currentPage === "create" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Selling"
              breadcrumb2="Sales Order"
              breadcrumb3="Create Sales Order"
              currentPage="create"
              onBackClick={() => setCurrentPage("index")}
            ></BreadcrumbsUI>
            <HeaderUI title="Create Sales Order"></HeaderUI>
          </div>
          <Create />
        </>
      )}
    </>
  );
};

export default SalesOrderPage;
