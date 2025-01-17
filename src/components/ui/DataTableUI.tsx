import React, { useEffect, useRef } from 'react';
import { DataTable } from 'simple-datatables';
// import StatusUI from "./StatusUI";

interface DataTableItem {
  data: { THeaders: string[]; TData: Array<any> }[];
  searchable?: boolean;
  cardTitle?: string;
}

const DataTableUI = ({ data, searchable = true, cardTitle }: DataTableItem) => {
  const dataTableRef = useRef<DataTable | null>(null);

  useEffect(() => {
    dataTableRef.current = new DataTable('#default-table', {
      searchable: searchable,
      fixedHeight: false,
    });
  }, [searchable]);

  return (
    <div
      className={`border rounded-lg py-4 h-full ${
        cardTitle ? 'px-6' : ''
      } [&_.datatable-dropdown]:hidden [&_.datatable-search]:mr-auto [&_.datatable-search]:ml-6 [&_.datatable-info]:hidden [&_.datatable-pagination]:m-auto`}
    >
      {cardTitle && <h2 className="text-xl font-medium">{cardTitle}</h2>}
      {data.map((item, index) => (
        <table
          key={index}
          id="default-table"
          className={cardTitle ? 'border' : 'border-t'}
        >
          <thead className="!bg-zinc-100">
            <tr>
              {item.THeaders.map((item, index) => (
                <th key={index} className="border-b text-sm">
                  <span className="flex items-center">
                    {item}
                    <svg
                      className="w-4 h-4 ms-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m8 15 4 4 4-4m0-6-4-4-4 4"
                      />
                    </svg>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {item.TData.map((item, index) => (
              <tr key={index} className="text-black hover:bg-gray-100">
                <td className="cursor-default"> {item.column1}</td>
                <td>{item.column2}</td>
                <td className="cursor-default"> {item.column3}</td>
                <td className="cursor-default"> {item.column4}</td>
                {item.column5 && (
                  <td className="cursor-default"> {item.column5}</td>
                )}
                {item.column6 && (
                  <td className="cursor-default"> {item.column6}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default DataTableUI;
