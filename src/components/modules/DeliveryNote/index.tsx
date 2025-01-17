import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getDeliveryNoteList } from "../../../store/services/DeliveryNoteService";
import Status from "../../shared/Status";
import { debounce } from "lodash";
import NoDataUI from "../../ui/NoDataUI";
import Dtable from "../../shared/Dtable";

const DeliveryNote = () => {
  const dispatch = useAppDispatch();
  const { deliveryNoteList, isLoading } = useAppSelector(
    (state) => state.deliveryNote
  );

  const fetchDeliveryNoteList = useCallback(async () => {
    dispatch(getDeliveryNoteList());
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
  }, [deliveryNoteList, debouncedRerender]);

  if (deliveryNoteList.length === 0)
    return (
      <div>
        <NoDataUI
          text="Create your first delivery note"
          subText="Create a delivery note by clicking the create button."
        ></NoDataUI>
      </div>
    );

  return (
    <>
      {!isLoading && (
        <Dtable
          tableId="purchase-order"
          headers={[
            "POSTING DATE",
            "NAME",
            "CUSTOMER",
            "STATUS",
            "CREATED BY",
            "GRAND TOTAL",
          ]}
          key={renderKey}
        >
          {deliveryNoteList.map((item, index) => (
            <tr key={index} className="text-black hover:bg-gray-100">
              <td className="cursor-default"> {item.posting_date}</td>
              <td className="cursor-default ">
                {" "}
                <a
                  href={`/delivery-note/${item.name}`}
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
        </Dtable>
      )}
    </>
  );
};

export default DeliveryNote;
