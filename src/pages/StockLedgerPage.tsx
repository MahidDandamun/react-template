import React, { useState } from "react";
import HeaderUI from "../components/ui/HeaderUI";
import BreadcrumbsUI from "../components/ui/BreadcrumbsUI";
import Ledger from "../components/modules/Stocks/ledger";
const StockLedgerPage = () => {
  const [currentPage, setCurrentPage] = useState<"index" | "create">("index");

  return (
    <>
      {/* if the current page is index */}
      {currentPage === "index" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Inventory"
              breadcrumb2="Stock Ledger"
              currentPage="index"
            ></BreadcrumbsUI>
            <HeaderUI
              variant="view"
              title="Stock Ledger"
              primaryButton="Create Stock Ledger"
              onCreateClick={() => setCurrentPage("create")}
            ></HeaderUI>
          </div>
          <Ledger />
        </>
      )}

      {/* if the current page is create */}
      {currentPage === "create" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Inventory"
              breadcrumb2="Stock Ledger"
              breadcrumb3="Create Stock Ledger"
              currentPage="create"
              onBackClick={() => setCurrentPage("index")}
            ></BreadcrumbsUI>
            <HeaderUI title="Create Stock Ledger"></HeaderUI>
          </div>
          {/* <Create /> */}
        </>
      )}
    </>
  );
};

export default StockLedgerPage;
