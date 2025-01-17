import React, { useCallback, useEffect, useRef } from "react";
import { DataTable } from "simple-datatables";

interface Props {
  headers: string[];
  children: React.ReactNode;
  tableId: string;
  isLoading?: boolean;
}

const Dtable = ({ headers, children, tableId }: Props) => {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const datatableRef = useRef<DataTable | null>(null);

  const initializeDataTable = useCallback(() => {
    if (tableRef.current) {
      if (datatableRef.current) {
        datatableRef.current.destroy();
      }

      const options = {
        paging: true,
        searchable: true,
        fixedHeight: true,
        responsive: true
      };

      datatableRef.current = new DataTable(tableRef.current, options);
    }
  }, []);

  useEffect(() => {
    initializeDataTable();

    return () => {
      if (datatableRef.current) {
        datatableRef.current.destroy();
      }
    };
  }, [children, initializeDataTable]);

  return (
    <div className="overflow-x-auto max-w-[345px] md:max-w-full border rounded-lg py-4 [&_.datatable-dropdown]:hidden [&_.datatable-search]:mr-auto [&_.datatable-search]:ml-6 [&_.datatable-info]:hidden [&_.datatable-pagination]:m-auto">
      <table id={tableId} className="min-w-max md:min-w-full border-t" ref={tableRef}>
        <thead className="!bg-zinc-100">
          <tr>
            {headers.map((item, index) => (
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
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Dtable;
