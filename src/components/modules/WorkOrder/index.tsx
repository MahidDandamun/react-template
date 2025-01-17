import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getWorkOrderList } from "../../../store/services/WorkOrderService";
import Status from "../../shared/Status";
import DTable from "../../shared/Dtable";
import debounce from 'lodash/debounce';
import NoData from "../../shared/NoData";

const WorkOrder = () => {
  const dispatch = useAppDispatch();
  const { workOrderList, isLoading } = useAppSelector((state) => state.workOrder)

  const fetchWorkOrderList = useCallback(async () => {
    dispatch(getWorkOrderList());
  }, [dispatch]);

  useEffect(() => {
    fetchWorkOrderList();
  }, [fetchWorkOrderList]);

  const [renderKey, setRenderKey] = useState(0);

  const debouncedRerender = useMemo(() =>
    debounce(() => {
      setRenderKey(prev => prev + 1);
    }), []);

  useEffect(() => {
    debouncedRerender();
  }, [workOrderList, debouncedRerender]);

  if (workOrderList.length === 0) return <div><NoData text="Create your first work order"
    subText="Create a work order by clicking the create button" /></div>;

  return (
    <div className="p-2 ">
      {
        !isLoading &&
        <DTable tableId="work-order" headers={["PRODUCTION ITEM", "STATUS", "NAME", "OWNER"]} key={renderKey}>
          {workOrderList.map((item, index) => (
            <tr key={index} className="text-black hover:bg-gray-100">
              <td className="cursor-default"> {item.production_item}</td>
              <td className="cursor-default"> {item.name}</td>
              <td> <Status status={item.status} /></td>
              <td className="cursor-default"> {item.owner}</td>
              {/* <td className="cursor-default"> PHP {item.grand_total.toFixed(2)}</td> */}
            </tr>
          ))}
        </DTable>
      }

    </div>
  );
};

export default WorkOrder;
