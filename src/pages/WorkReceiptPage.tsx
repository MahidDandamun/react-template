import React, { useState } from 'react'
import ButtonUI from '../components/ui/ButtonUI'
import WorkReceipt from '../components/modules/WorkReceipt';
import Create from '../components/modules/WorkReceipt/create';

const WorkReceiptPage = () => {
  const [currentPage, setCurrentPage] = useState<"index" | "create">("index");

  return (
    <>
      {currentPage === "index" && (
        <>
          <div className="flex flex-col">
            <div className="text-gray-500 -ml-4">
              <ButtonUI variant="link" buttonName="Buying" size="medium" onClick={() => setCurrentPage("index")} />/
              <ButtonUI variant="link" buttonName="Work Receipt" size="medium" onClick={() => setCurrentPage("index")} />
            </div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-semibold">Work Receipt</h1>
              <div className="flex space-x-4">
                <ButtonUI variant="outline" buttonName="Generate Report" iconName="report" size="medium" />
                <ButtonUI variant="dark" buttonName="Create Work Receipt" iconName="add" size="medium" onClick={() => setCurrentPage("create")} />
              </div>
            </div>
          </div>

          <WorkReceipt />
        </>
      )}

      {currentPage === "create" && (
        <>
          <div className="text-gray-500 -ml-4">
            <ButtonUI variant="link" buttonName="Buying" size="medium" onClick={() => setCurrentPage("index")} />/
            <ButtonUI variant="link" buttonName="Work Receipt" size="medium" onClick={() => setCurrentPage("index")} />/
            <ButtonUI variant="link" buttonName="Create Work Receipt" size="medium" />
          </div>

          <Create />
        </>
      )}
    </>
  );
}

export default WorkReceiptPage