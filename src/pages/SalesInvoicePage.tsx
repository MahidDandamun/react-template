import React, { useState } from "react";
import HeaderUI from "../components/ui/HeaderUI";
import BreadcrumbsUI from "../components/ui/BreadcrumbsUI";
import SalesInvoice from "../components/modules/Accounting/SalesInvoice";
import Create from "../components/modules/Accounting/SalesInvoice/create";

const SalesInvoicePage = () => {
  const [currentPage, setCurrentPage] = useState<"index" | "create">("index");

  return (
    <>
      {/* if the current page is index */}
      {currentPage === "index" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Accounting"
              breadcrumb2="Sales Invoice"
              currentPage="index"
            ></BreadcrumbsUI>
            <HeaderUI
              variant="view"
              title="Sales Invoice"
              primaryButton="Create Sales Invoice"
              onCreateClick={() => setCurrentPage("create")}
            ></HeaderUI>
          </div>
          <SalesInvoice />
        </>
      )}

      {/* if the current page is create */}
      {currentPage === "create" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Accounting"
              breadcrumb2="Sales Invoice"
              breadcrumb3="Create Sales Invoice"
              currentPage="create"
              onBackClick={() => setCurrentPage("index")}
            ></BreadcrumbsUI>
            <HeaderUI title="Create Sales Invoice"></HeaderUI>
          </div>
          <Create />
        </>
      )}
    </>
  );
};

export default SalesInvoicePage;
