import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getWarehouseList } from "../../../store/services/WarehouseService";
import { getCompanyList } from "../../../store/services/CompanyService";
import { debounce } from "lodash";
import NoDataUI from "../../ui/NoDataUI";
import Dtable from "../../shared/Dtable";
import Status from "../../shared/Status";

const Warehouse = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useAppSelector((state) => state.warehouse);

  const fetchWarehouseList = useCallback(async () => {
    dispatch(getWarehouseList());
    dispatch(getCompanyList());
  }, [dispatch]);

  useEffect(() => {
    fetchWarehouseList();
  }, [fetchWarehouseList]);

  const [renderKey, setRenderKey] = useState(0);

  const debouncedRerender = useMemo(
    () =>
      debounce(() => {
        setRenderKey((prev) => prev + 1);
      }),
    []
  );

  useEffect(() => {
    debouncedRerender();
  }, [data, debouncedRerender]);

  if (data.length === 0)
    return (
      <div>
        {" "}
        <NoDataUI
          text="Add your first warehouse"
          subText="Add a warehouse by clicking the add button."
        ></NoDataUI>
      </div>
    );

  return (
    <>
      {!isLoading && (
        <Dtable
          tableId="warehouse-table"
          headers={["WAREHOUSE ID", "NAME", "STATUS", "COMPANY", "CREATED BY"]}
          key={renderKey}
        >
          {data.map((item, index) => (
            <tr key={index} className="text-black hover:bg-gray-100">
              <td className="cursor-default">
                {" "}
                <a
                  href={`/warehouse/${item.name}`}
                  className="underline underline-offset-1"
                >
                  {item.name}
                </a>
              </td>
              <td className="cursor-default "> {item.warehouse_name}</td>
              <td>
                {" "}
                <Status status={item.disabled === 0 ? "Enabled" : "Disabled"} />
              </td>
              <td className="cursor-default"> {item.company}</td>
              <td className="cursor-default"> {item.owner}</td>
            </tr>
          ))}
        </Dtable>
      )}
    </>
    // <td className="cursor-default"> <input type="checkbox" checked={item.is_group} readOnly /></td>
  );
};

export default Warehouse;
