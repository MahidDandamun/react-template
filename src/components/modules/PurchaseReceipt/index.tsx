import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import Status from "../../shared/Status";
import { getPurchaseReceiptList } from "../../../store/services/PurchaseReceiptService";
import DTable from "../../shared/Dtable";
import { debounce } from "lodash";
import NoDataUI from "../../ui/NoDataUI";

const PurchaseReceipt = () => {
  const dispatch = useAppDispatch();
  const { purchaseReceiptList, isLoading } = useAppSelector(
    (state) => state.purchaseReceipt
  );

  const fetchPurchaseReceiptList = useCallback(async () => {
    dispatch(getPurchaseReceiptList());
  }, [dispatch]);

  useEffect(() => {
    fetchPurchaseReceiptList();
  }, [fetchPurchaseReceiptList]);

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
  }, [purchaseReceiptList, debouncedRerender]);

  if (purchaseReceiptList.length === 0)
    return (
      <div>
        {" "}
        <NoDataUI
          text="Create your first purchase receipt"
          subText="Create a purchase receipt by clicking the create button."
        ></NoDataUI>
      </div>
    );
  return (
    <>
      {!isLoading && (
        <DTable
          tableId="purchase-receipt"
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
          {purchaseReceiptList.map((item, index) => (
            <tr key={index} className="text-black hover:bg-gray-100">
              <td className="cursor-default"> {item.posting_date}</td>
              <td className="cursor-default">
                {" "}
                <a
                  href={`/purchase-receipt/${item.name}`}
                  className="underline underline-offset-1"
                >
                  {item.name}
                </a>
              </td>
              <td className="cursor-default"> {item.title}</td>
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

export default PurchaseReceipt;
