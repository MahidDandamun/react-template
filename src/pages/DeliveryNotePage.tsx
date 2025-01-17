import React, { useState } from "react";
import HeaderUI from "../components/ui/HeaderUI";
import BreadcrumbsUI from "../components/ui/BreadcrumbsUI";
import DeliveryNote from "../components/modules/DeliveryNote";
import Create from "../components/modules/DeliveryNote/create";

const DeliveryNotePage = () => {
  const [currentPage, setCurrentPage] = useState<"index" | "create">("index");

  return (
    <>
      {currentPage === "index" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Selling"
              breadcrumb2="Delivery Note"
              currentPage="index"
            ></BreadcrumbsUI>
            <HeaderUI
              variant="view"
              title="Delivery Note"
               primaryButton="Create Delivery Note"
              onCreateClick={() => setCurrentPage("create")}
            ></HeaderUI>
          </div>
          <DeliveryNote />
        </>
      )}

      {currentPage === "create" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Selling"
              breadcrumb2="Delivery Note"
              breadcrumb3="Create Delivery Note"
              currentPage="create"
              onBackClick={() => setCurrentPage("index")}
            ></BreadcrumbsUI>
            <HeaderUI title="Create Delivery Note"></HeaderUI>
          </div>
          <Create />
        </>
      )}
    </>
  );
};

export default DeliveryNotePage;
