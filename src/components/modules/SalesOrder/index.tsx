import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getSalesOrderList } from "../../../store/services/SalesOrderService";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { debounce } from "lodash";
import NoDataUI from "../../ui/NoDataUI";
import Dtable from "../../shared/Dtable";
import Status from "../../shared/Status";

const SalesOrder = () => {
  const dispatch = useAppDispatch();
  const { salesOrderList, isLoading } = useAppSelector(
    (state) => state.salesOrder
  );

  const fetchDeliveryNoteList = useCallback(async () => {
    dispatch(getSalesOrderList());
  }, [dispatch]);

  useEffect(() => {
    fetchDeliveryNoteList();
  }, [fetchDeliveryNoteList]);
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
  }, [salesOrderList, debouncedRerender]);

  if (salesOrderList.length === 0)
    return (
      <div>
        {" "}
        <NoDataUI
          text="Create your first sales order"
          subText="Create a sales order by clicking the create button."
        ></NoDataUI>
      </div>
    );

  return (
    <>
      {!isLoading && (
        <Dtable
          tableId="sales-order"
          headers={[
            "DELIVERY DATE",
            "NAME",
            "CUSTOMER",
            "STATUS",
            "OWNER",
            "GRAND TOTAL",
          ]}
          key={renderKey}
        >
          {salesOrderList.map((item, index) => (
            <tr key={index} className="text-black hover:bg-gray-100">
              <td className="cursor-default"> {item.delivery_date}</td>
              <td className="cursor-default ">
                {" "}
                <a
                  href={`/sales-order/${item.name}`}
                  className="underline underline-offset-1"
                >
                  {item.name}
                </a>
              </td>
              <td className="cursor-default"> {item.customer_name}</td>
              <td>
                {" "}
                <Status status={item.status} />
              </td>
              <td className="cursor-default"> {item.owner}</td>
              <td className="cursor-default">
                {" "}
                PHP {item.grand_total.toFixed(2)}
              </td>
            </tr>
          ))}
        </Dtable>
      )}
    </>
  );
};

export default SalesOrder;
