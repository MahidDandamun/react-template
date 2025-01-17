import React, { useState } from "react";
import HeaderUI from "../components/ui/HeaderUI";
import BreadcrumbsUI from "../components/ui/BreadcrumbsUI";
import DeliveryTrip from "../components/modules/DeliveryTrip";
import CreateDeliveryTrip from "../components/modules/DeliveryTrip/create";

const DeliveryTripPage = () => {
  const [currentPage, setCurrentPage] = useState<"index" | "create">("index");

  return (
    <>
      {currentPage === "index" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Selling"
              breadcrumb2="Delivery Trip"
              currentPage="index"
            ></BreadcrumbsUI>
            <HeaderUI
              variant="view"
              title="Delivery Trip"
              primaryButton="Create Delivery Trip"
              onCreateClick={() => setCurrentPage("create")}
            ></HeaderUI>
          </div>
          <DeliveryTrip />
        </>
      )}

      {currentPage === "create" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Selling"
              breadcrumb2="Delivery Trip"
              breadcrumb3="Create Delivery Trip"
              currentPage="create"
              onBackClick={() => setCurrentPage("index")}
            ></BreadcrumbsUI>
            <HeaderUI title="Create Delivery Trip"></HeaderUI>
          </div>
          <CreateDeliveryTrip />
        </>
      )}
    </>
  );
};

export default DeliveryTripPage;
