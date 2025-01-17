import React, { useState } from "react";
import HeaderUI from "../components/ui/HeaderUI";
import BreadcrumbsUI from "../components/ui/BreadcrumbsUI";
import Summary from "../components/modules/Stocks/summary";
const StockSummaryPage = () => {
  const [currentPage, setCurrentPage] = useState<"index" | "create">("index");

  return (
    <>
      {/* if the current page is index */}
      {currentPage === "index" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Inventory"
              breadcrumb2="Stock Summary"
              currentPage="index"
            ></BreadcrumbsUI>
            <HeaderUI
              variant="view"
              title="Stock Summary"
              primaryButton="Create Stock Summary"
              onCreateClick={() => setCurrentPage("create")}
            ></HeaderUI>
          </div>
          <Summary />
        </>
      )}

      {/* if the current page is create */}
      {currentPage === "create" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Inventory"
              breadcrumb2="Stock Summary"
              breadcrumb3="Create Stock Summary"
              currentPage="create"
              onBackClick={() => setCurrentPage("index")}
            ></BreadcrumbsUI>
            <HeaderUI title="Create Stock Summary"></HeaderUI>
          </div>
          {/* <Create /> */}
        </>
      )}
    </>
  );
};

export default StockSummaryPage;
