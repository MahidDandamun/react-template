import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getItemList } from "../../../store/services/ItemService";
import { debounce } from "lodash";
import NoDataUI from "../../ui/NoDataUI";
import Dtable from "../../shared/Dtable";
import Status from "../../shared/Status";

const Item = () => {
  const { itemList, isLoading } = useAppSelector((state) => state.items);
  const dispatch = useAppDispatch();

  const fetchItemList = useCallback(async () => {
    dispatch(getItemList());
  }, [dispatch]);

  useEffect(() => {
    fetchItemList();
  }, [fetchItemList]);

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
  }, [itemList, debouncedRerender]);

  if (itemList.length === 0)
    return (
      <div>
        {" "}
        <NoDataUI
          text="Add your first item"
          subText="Add an item by clicking the add button."
        ></NoDataUI>
      </div>
    );

  return (
    <>
      {!isLoading && (
        <Dtable
          tableId="sales-order"
          headers={["ID", "NAME", "STATUS", "ITEM GROUP", "CREATED BY"]}
          key={renderKey}
        >
          {itemList.map((item, index) => (
            <tr key={index} className="text-black hover:bg-gray-100">
              <td className="cursor-default">
                {" "}
                <a
                  href={`/items/${item.name}`}
                  className="underline underline-offset-1"
                >
                  {item.name}
                </a>
              </td>
              <td className="cursor-default"> {item.item_name}</td>
              <td>
                {" "}
                <Status status={item.disabled === 0 ? "Enabled" : "Disabled"} />
              </td>
              <td className="cursor-default"> {item.item_group}</td>
              <td className="cursor-default"> {item.owner}</td>
            </tr>
          ))}
        </Dtable>
      )}
    </>
  );
};

export default Item;
