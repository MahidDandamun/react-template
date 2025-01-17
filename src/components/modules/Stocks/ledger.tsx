import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getStockLedger } from "../../../store/services/ReportService";
import { debounce } from "lodash";
import Dtable from "../../shared/Dtable";
import NoData from "../../shared/NoData";

interface StockLedger {
  date: string;
  item_code: string;
  item_name: string;
  stock_uom: string;
  in_qty: number;
  out_qty: number;
  actual_qty: number;
  qty_after_transaction: number;
  warehouse: string;
  item_group: string;
  voucher_no: string;
  voucher_type: string;
}

const Ledger: React.FC = () => {
  const [stockLedger, setStockLedger] = useState<StockLedger[]>([]);
  // const [isLoading, setIsLoading] = useState(true)

  const fetchStockLedger = useCallback(async () => {
    // setIsLoading(true)
    try {
      const response = await getStockLedger("Software Builders");
      console.log(response);
      setStockLedger(response);
      // setIsLoading(false)
    } catch (error) {
      console.error("Error fetching stock ledger:", error);
      // setIsLoading(false)
    }
  }, []);

  useEffect(() => {
    fetchStockLedger();
  }, [fetchStockLedger]);

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
  }, [stockLedger, debouncedRerender]);
  console.log(stockLedger);

  if (stockLedger?.length === 0)
    return (
      <div>
        <NoData
          text="Create your first transacation"
          subText="Create a transaction by making documents"
        />
      </div>
    );

  return (
    <>
      <Dtable
        tableId="stock-ledger"
        headers={[
          "DATE",
          "ITEM CODE",
          "ITEM NAME",
          "ITEM GROUP",
          "UOM",
          "In Qty",
          "Out Qty",
          "Qty After",
          "VOUCHER NO.",
          "VOUCHER TYPE",
          "WAREHOUSE",
        ]}
        key={renderKey}
      >
        {stockLedger?.map((item, index) => (
          <tr key={index} className="text-black hover:bg-gray-100">
            <td className="cursor-default"> {item.date}</td>
            <td className="cursor-default underline underline-offset-1">
              {item.item_code}
            </td>
            <td className="cursor-default"> {item.item_name}</td>
            <td className="cursor-default"> {item.item_group}</td>
            <td className="cursor-default"> {item.stock_uom}</td>
            <td className="cursor-default"> {item.in_qty}</td>
            <td className="cursor-default"> {item.out_qty}</td>
            <td className="cursor-default"> {item.qty_after_transaction}</td>
            <td className="cursor-default"> {item.voucher_no}</td>
            <td className="cursor-default"> {item.voucher_type}</td>
            <td className="cursor-default"> {item.warehouse}</td>
          </tr>
        ))}
      </Dtable>
    </>
  );
};

export default Ledger;
