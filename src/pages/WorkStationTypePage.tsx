import React, { useState } from 'react';
import WorkStationType from '../components/modules/WorkStationType';
import Create from '../components/modules/WorkStationType/create';
import ButtonUI from '../components/ui/ButtonUI';
 

const WorkStationTypePage = () => {
  const [currentPage, setCurrentPage] = useState<'index' | 'create'>("index");

  return (
    <>
    {currentPage === "index" && (
        <>
            <div className="flex flex-col">
                <div className="text-gray-500 -ml-4">
                    <ButtonUI variant="link" buttonName="Manufacturing" size="medium" onClick={() => setCurrentPage("index")} />/
                    <ButtonUI variant="link" buttonName="Workstation Type" size="medium" onClick={() => setCurrentPage("index")} />
                </div>
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-semibold">Workstation Type</h1>
                    <div className="flex space-x-4">
                        <ButtonUI variant="outline" buttonName="Generate Report" iconName="report" size="medium" />
                        <ButtonUI variant="dark" buttonName="Create Workstation Type" iconName="add" size="medium" onClick={() => setCurrentPage("create")} />
                    </div>
                </div>
            </div>

            <WorkStationType />
        </>
    )}

    {currentPage === "create" && (
        <>
            <div className="text-gray-500 -ml-4">
                <ButtonUI variant="link" buttonName="Manufacturing" size="medium" onClick={() => setCurrentPage("index")} />/
                <ButtonUI variant="link" buttonName="Workstation Type" size="medium" onClick={() => setCurrentPage("index")} />/
                <ButtonUI variant="link" buttonName="Create Workstation Type" size="medium" />
            </div>

            <Create />
        </>
    )}
</>
  )
};

export default WorkStationTypePage;
