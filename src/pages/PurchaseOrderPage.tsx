import React, { useState } from "react";
import HeaderUI from "../components/ui/HeaderUI";
import BreadcrumbsUI from "../components/ui/BreadcrumbsUI";
import PurchaseOrder from "../components/modules/PurchaseOrder";
import Create from "../components/modules/PurchaseOrder/create";

const PurchaseOrderPage = () => {
  const [currentPage, setCurrentPage] = useState<"index" | "create">("index");

  return (
    <>
      {/* if the current page is index */}
      {currentPage === "index" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Buying"
              breadcrumb2="Purchase Order"
              currentPage="index"
            ></BreadcrumbsUI>
            <HeaderUI
              variant="view"
              title="Purchase Order"
               primaryButton="Create Purchase Order"
              onCreateClick={() => setCurrentPage("create")}
            ></HeaderUI>
          </div>
          <PurchaseOrder />
        </>
      )}

      {/* if the current page is create */}
      {currentPage === "create" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Buying"
              breadcrumb2="Purchase Order"
              breadcrumb3="Create Purchase Order"
              currentPage="create"
              onBackClick={() => setCurrentPage("index")}
            ></BreadcrumbsUI>
            <HeaderUI title="Create Purchase Order"></HeaderUI>
          </div>
          <Create />
        </>
      )}
    </>
  );
};

export default PurchaseOrderPage;
