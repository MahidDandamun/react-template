import React, { useState } from 'react';

import Create from '../components/modules/Production/create';
import ButtonUI from '../components/ui/ButtonUI';
import Production from './../components/modules/Production';
 
 

const ProductionPage = () => {
  const [currentPage, setCurrentPage] = useState<'index' | 'create'>("index");

  return (
    <>
    {currentPage === "index" && (
        <>
            <div className="flex flex-col">
                <div className="text-gray-500 -ml-4">
                    <ButtonUI variant="link" buttonName="Manufacturing" size="medium" onClick={() => setCurrentPage("index")} />/
                    <ButtonUI variant="link" buttonName="Production" size="medium" onClick={() => setCurrentPage("index")} />
                </div>
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-semibold">Production</h1>
                    <div className="flex space-x-4">
                        <ButtonUI variant="outline" buttonName="Generate Report" iconName="report" size="medium" />
                        <ButtonUI variant="dark" buttonName="Add production" iconName="add" size="medium" onClick={() => setCurrentPage("create")} />
                    </div>
                </div>
            </div>

            <Production />
        </>
    )}

    {currentPage === "create" && (
        <>
            <div className="text-gray-500 -ml-4">
                <ButtonUI variant="link" buttonName="Manufacturing" size="medium" onClick={() => setCurrentPage("index")} />/
                <ButtonUI variant="link" buttonName="Production" size="medium" onClick={() => setCurrentPage("index")} />/
                <ButtonUI variant="link" buttonName="Add production" size="medium" />
            </div>

            <Create />
        </>
    )}
</>
  )
};

export default ProductionPage;
