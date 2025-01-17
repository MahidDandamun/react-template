import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getSuppliersList } from "../../../store/services/SupplierService";
import { debounce } from "lodash";
import NoDataUI from "../../ui/NoDataUI";
import Dtable from "../../shared/Dtable";
import Status from "../../shared/Status";

const Suppliers = () => {
  const dispatch = useAppDispatch();
  const { suppliersList, isLoading } = useAppSelector(
    (state) => state.suppliers
  );

  const fetchSuppliersList = useCallback(async () => {
    dispatch(getSuppliersList());
  }, [dispatch]);

  useEffect(() => {
    fetchSuppliersList();
  }, [fetchSuppliersList]);

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
  }, [suppliersList, debouncedRerender]);

  if (suppliersList.length === 0)
    return (
      <div>
        <NoDataUI
          text="Add your first supplier"
          subText="Add a supplier by clicking the add button."
        ></NoDataUI>
      </div>
    );
  return (
    <>
      {!isLoading && (
        <Dtable
          tableId="sales-order"
          headers={[
            "SUPPLIER",
            "STATUS",
            "SUPPLIER GROUP",
            "SUPPLIER TYPE",
            "CREATED BY",
          ]}
          key={renderKey}
        >
          {suppliersList.map((item, index) => (
            <tr key={index} className="text-black hover:bg-gray-100">
              <td className="cursor-default ">
                {" "}
                <a
                  href={`/suppliers/${item.name}`}
                  className="underline underline-offset-1"
                >
                  {item.name}
                </a>
              </td>
              <td>
                {" "}
                <Status status={item.disabled === 0 ? "Enabled" : "Disabled"} />
              </td>
              <td className="cursor-default"> {item.supplier_group}</td>
              <td className="cursor-default"> {item.supplier_type}</td>
              <td className="cursor-default"> {item.owner}</td>
            </tr>
          ))}
        </Dtable>
      )}
    </>
  );
};

export default Suppliers;
