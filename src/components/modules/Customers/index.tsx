import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getCustomersList } from "../../../store/services/CustomerService";
import { debounce } from "lodash";
import NoDataUI from "../../ui/NoDataUI";
import Dtable from "../../shared/Dtable";
import Status from "../../shared/Status";

const Customers = () => {
  const dispatch = useAppDispatch();
  const { customersList, isLoading } = useAppSelector(
    (state) => state.customers
  );

  const fetchCustomersList = useCallback(async () => {
    dispatch(getCustomersList());
  }, [dispatch]);

  useEffect(() => {
    fetchCustomersList();
  }, [fetchCustomersList]);

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
  }, [customersList, debouncedRerender]);

  if (customersList.length === 0)
    return (
      <div>
        {" "}
        <NoDataUI
          text="Add your first customer"
          subText="Add a customer by clicking the add button."
        ></NoDataUI>
      </div>
    );

  return (
    <>
      {!isLoading && (
        <Dtable
          tableId="sales-order"
          headers={[
            "CUSTOMER",
            "STATUS",
            "CUSTOMER GROUP",
            "CUSTOMER TYPE",
            "TERRITORY",
            "CREATED BY",
          ]}
          key={renderKey}
        >
          {customersList.map((item, index) => (
            <tr key={index} className="text-black hover:bg-gray-100">
              <td className="cursor-default ">
                {" "}
                <a
                  href={`/customers/${item.name}`}
                  className="underline underline-offset-1"
                >
                  {item.name}
                </a>
              </td>
              <td>
                {" "}
                <Status status={item.disabled === 0 ? "Enabled" : "Disabled"} />
              </td>
              <td className="cursor-default"> {item.customer_group}</td>
              <td className="cursor-default"> {item.customer_type}</td>
              <td className="cursor-default"> {item.territory}</td>
              <td className="cursor-default"> {item.owner}</td>
            </tr>
          ))}
        </Dtable>
      )}
    </>
  );
};

export default Customers;
