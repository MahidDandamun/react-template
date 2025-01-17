import React, { useState } from "react";
import BreadcrumbsUI from "../components/ui/BreadcrumbsUI";
import HeaderUI from "../components/ui/HeaderUI";
import Users from "../components/modules/Users";
import Create from "../components/modules/Users/create";

function UsersPage() {
  const [currentPage, setCurrentPage] = useState<"index" | "create">("index");

  return (
    <>
      {currentPage === "index" && (
        <>
         <div className="flex flex-col gap-2 mb-6">
            <HeaderUI
              variant="view"
              title="User Management"
              primaryButton="Add User"
              onCreateClick={() => setCurrentPage("create")}
            ></HeaderUI>
          </div>
          <Users />
        </>
      )}

      {currentPage === "create" && (
        <>
         <div className="flex flex-col gap-2 mb-6">
            <BreadcrumbsUI
              breadcrumb1="User Management"
              breadcrumb2="Add User"
              currentPage="create"
              onBackClick={() => setCurrentPage("index")}
            ></BreadcrumbsUI>
            <HeaderUI title="Add User"></HeaderUI>
          </div>
          <Create />
        </>
      )}
    </>
  );
}
export default UsersPage;
