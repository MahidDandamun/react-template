import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getStockSummary } from "../../../store/services/ReportService";
import { debounce } from "lodash";
import NoData from "../../shared/NoData";
import Dtable from "../../shared/Dtable";

interface Items {
  item_code: string;
  item_name: string;
  warehouse: string;
  reserved_qty: number;
  actual_qty: number;
  projected_qty: number;
}

const Summary: React.FC = () => {
  const [stockSummary, setStockSummary] = useState<Items[]>([]);
  const fetchStockSummary = useCallback(async () => {
    try {
      const response = await getStockSummary();

      setStockSummary(response);
    } catch (error) {
      console.error("Error fetching stock summary:", error);
    }
  }, []);
  useEffect(() => {
    fetchStockSummary();
  }, [fetchStockSummary]);

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
  }, [stockSummary, debouncedRerender]);

  if (stockSummary?.length === 0)
    return (
      <div>
        <NoData
          text="Create your first item stock"
          subText="Add stock by making a purchase order or creating an item"
        />
      </div>
    );

  return (
    <>
      <Dtable
        tableId="stock-summary"
        headers={[
          "ITEM CODE",
          "ITEM NAME",
          "WAREHOUSE",
          "RESERVED QTY",
          "ACTUAL QTY",
          "PROJECTED QTY",
        ]}
        key={renderKey}
      >
        {stockSummary?.map((item, index) => (
          <tr key={index} className="text-black hover:bg-gray-100">
            <td className="cursor-default underline underline-offset-1">
              {item.item_code}
            </td>
            <td className="cursor-default"> {item.item_name}</td>
            <td className="cursor-default"> {item.warehouse}</td>
            <td className="cursor-default"> {item.reserved_qty}</td>
            <td className="cursor-default"> {item.actual_qty}</td>
            <td className="cursor-default"> {item.projected_qty}</td>
          </tr>
        ))}
      </Dtable>
      {/* <td>
        {" "}
        <Status status={item.disabled === 0 ? "Enabled" : "Disabled"} />
      </td> */}
    </>
  );
};

export default Summary;
