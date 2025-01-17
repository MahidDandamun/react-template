import React, { useState } from "react";
import HeaderUI from "../components/ui/HeaderUI";
import BreadcrumbsUI from "../components/ui/BreadcrumbsUI";
import Item from "../components/modules/Item";
import Create from "../components/modules/Item/create";

const ItemsPage = () => {
  const [currentPage, setCurrentPage] = useState<"index" | "create">("index");

  return (
    <>
      {/* if the current page is index */}
      {currentPage === "index" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Inventory"
              breadcrumb2="Items"
              currentPage="index"
            ></BreadcrumbsUI>
            <HeaderUI
              variant="view"
              title="Items"
              primaryButton="Add Item"
              onCreateClick={() => setCurrentPage("create")}
            ></HeaderUI>
          </div>
          <Item />
        </>
      )}

      {currentPage === "create" && (
        <>
          <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="Inventory"
              breadcrumb2="Items"
              breadcrumb3="Add Item"
              currentPage="create"
              onBackClick={() => setCurrentPage("index")}
            ></BreadcrumbsUI>
            <HeaderUI title="Add Item"></HeaderUI>
          </div>
          <Create />
        </>
      )}
    </>
  );
};

export default ItemsPage;
