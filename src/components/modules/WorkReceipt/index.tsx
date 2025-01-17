import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import Status from "../../shared/Status";
import { getWorkReceiptList } from "../../../store/services/WorkReceiptService";
import DTable from "../../shared/Dtable";
import { debounce } from "lodash";
import NoData from "../../shared/NoData";

const WorkReceipt = () => {
  const dispatch = useAppDispatch();
  const { workReceiptList, isLoading } = useAppSelector((state) => state.workReceipt)

  const fetchWorkReceiptList = useCallback(async () => {
    dispatch(getWorkReceiptList());
  }, [dispatch]);

  useEffect(() => {
    fetchWorkReceiptList();
  }, [fetchWorkReceiptList])

  const [renderKey, setRenderKey] = useState(0);

  const debouncedRerender = useMemo(() =>
    debounce(() => {
      setRenderKey(prev => prev + 1);
    }), []);

  useEffect(() => {
    debouncedRerender();
  }, [workReceiptList, debouncedRerender]);

  if (workReceiptList.length === 0) return <div><NoData text="Create your first work receipt"
    subText="Create a work receipt by clicking the create button" /></div>;
  return (
    <div className="p-2 ">

      {
        !isLoading &&
        <DTable tableId="work-receipt" headers={["TRANSACTION_DATE", "NAME", "SUPPLIER", "STATUS", "OWNER", "GRAND TOTAL"]} key={renderKey}>
          {workReceiptList.map((item, index) => (
            <tr key={index} className="text-black hover:bg-gray-100">
              <td className="cursor-default"> {item.posting_date}</td>
              <td className="cursor-default"> <a href={`/work-receipt/${item.name}`} className="underline underline-offset-1">{item.name}</a></td>
              <td className="cursor-default"> {item.title}</td>
              <td> <Status status={item.status} /></td>
              <td className="cursor-default"> {item.owner}</td>
              <td className="cursor-default"> PHP {item.grand_total.toFixed(2)}</td>
            </tr>
          ))}
        </DTable>
      }

    </div>
  );
};

export default WorkReceipt;
