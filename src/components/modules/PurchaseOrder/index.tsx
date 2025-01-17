import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getPurchaseOrderList } from "../../../store/services/PurchaseOrderService";
import Status from "../../shared/Status";
import DTable from "../../shared/Dtable";
import debounce from "lodash/debounce";
import NoDataUI from "../../ui/NoDataUI";

const PurchaseOrder = () => {
  const dispatch = useAppDispatch();
  const { purchaseOrderList, isLoading } = useAppSelector(
    (state) => state.purchaseOrder
  );

  const fetchPurchaseOrderList = useCallback(async () => {
    dispatch(getPurchaseOrderList());
  }, [dispatch]);

  useEffect(() => {
    fetchPurchaseOrderList();
  }, [fetchPurchaseOrderList]);

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
  }, [purchaseOrderList, debouncedRerender]);

  if (purchaseOrderList.length === 0)
    return (
      <div>
        {" "}
        <NoDataUI
          text="Create your first purchase order"
          subText="Create a purchase order by clicking the create button"
        ></NoDataUI>
      </div>
    );

  return (
    <>
      {!isLoading && (
        <DTable
          tableId="purchase-order"
          headers={[
            "TRANSACTION_DATE",
            "NAME",
            "SUPPLIER",
            "STATUS",
            "OWNER",
            "GRAND TOTAL",
          ]}
          key={renderKey}
        >
          {purchaseOrderList.map((item, index) => (
            <tr key={index} className="text-black hover:bg-gray-100">
              <td className="cursor-default"> {item.transaction_date}</td>
              <td className="cursor-default ">
                {" "}
                <a
                  href={`/purchase-order/${item.name}`}
                  className="underline underline-offset-1"
                >
                  {item.name}
                </a>
              </td>
              <td className="cursor-default"> {item.supplier_name}</td>
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
        </DTable>
      )}
    </>
  );
};

export default PurchaseOrder;
