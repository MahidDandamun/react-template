import React, { useState } from "react";
import HeaderUI from "../components/ui/HeaderUI";
import BreadcrumbsUI from "../components/ui/BreadcrumbsUI";
import PurchaseReceipt from "../components/modules/PurchaseReceipt";
import Create from "../components/modules/PurchaseReceipt/create";

const PurchaseReceiptPage = () => {
  const [currentPage, setCurrentPage] = useState<"index" | "create">("index");

  return (
    <>
      {/* if the current page is index */}
      {currentPage === "index" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Buying"
              breadcrumb2="Purchase Receipt"
              currentPage="index"
            ></BreadcrumbsUI>
            <HeaderUI
              variant="view"
              title="Purchase Receipt"
               primaryButton="Create Purchase Receipt"
              onCreateClick={() => setCurrentPage("create")}
            ></HeaderUI>
          </div>
          <PurchaseReceipt />
        </>
      )}

      {/* if the current page is create */}
      {currentPage === "create" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Buying"
              breadcrumb2="Purchase Receipt"
              breadcrumb3="Create Purchase Receipt"
              currentPage="create"
              onBackClick={() => setCurrentPage("index")}
            ></BreadcrumbsUI>
            <HeaderUI title="Create Purchase Receipt"></HeaderUI>
          </div>
          <Create />
        </>
      )}
    </>
  );
};

export default PurchaseReceiptPage;
