import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getSalesInvoiceList } from "../../../../store/services/SalesInvoiceService";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { debounce } from "lodash";
import NoDataUI from "../../../ui/NoDataUI";
import Dtable from "../../../shared/Dtable";
import Status from "../../../shared/Status";

const SalesInvoice = () => {
  const dispatch = useAppDispatch();
  const { salesInvoiceList, isLoading } = useAppSelector(
    (state) => state.salesInvoice
  );

  const fetchDeliveryNoteList = useCallback(async () => {
    dispatch(getSalesInvoiceList());
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
  }, [salesInvoiceList, debouncedRerender]);

  if (salesInvoiceList.length === 0)
    return (
      <div>
        {" "}
        <NoDataUI
          text="Create your first sales invoice"
          subText="Create a sales invoice by clicking the create button."
        ></NoDataUI>
      </div>
    );

  return (
    <>
      {!isLoading && (
        <Dtable
          tableId="sales-invoice"
          headers={[
            "INVOICE DATE",
            "NAME",
            "CUSTOMER",
            "STATUS",
            "OWNER",
            "GRAND TOTAL",
          ]}
          key={renderKey}
        >
          {salesInvoiceList.map((item, index) => (
            <tr key={index} className="text-black hover:bg-gray-100">
              <td className="cursor-default"> {item.delivery_date}</td>
              <td className="cursor-default ">
                {" "}
                <a
                  href={`/sales-invoice/${item.name}`}
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
                PHP {item.grand_total?.toFixed(2) ?? "0.00"}
              </td>
            </tr>
          ))}
        </Dtable>
      )}
    </>
  );
};

export default SalesInvoice;
