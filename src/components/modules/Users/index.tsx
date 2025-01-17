import React, { useEffect, useMemo, useState } from "react";
import { getUsers } from "../../../store/services/UserService";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import Spinner from "../../ui/SpinnerUI";
import { debounce } from "lodash";
import NoDataUI from "../../ui/NoDataUI";
import Dtable from "../../shared/Dtable";
import Status from "../../shared/Status";

const Users: React.FC = () => {
  const dispatch = useAppDispatch();

  const { users, isLoading } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

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
  }, [users, debouncedRerender]);

  if (users.length === 0)
    return (
      <div>
        {" "}
        <NoDataUI
          text="Add your first user"
          subText="Add a user by clicking the add button."
        ></NoDataUI>
      </div>
    );

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-2 ">
      {!isLoading && (
        <Dtable
          tableId="sales-order"
          headers={["ID", "NAME", "STATUS", "USER TYPE", "CREATED BY"]}
          key={renderKey}
        >
          {users.map((item, index) => (
            <tr key={index} className="text-black hover:bg-gray-100">
              <td className="cursor-default ">
                {" "}
                <a
                  href={`/users/${item.email}`}
                  className="underline underline-offset-1"
                >
                  {item.email}
                </a>
              </td>
              <td className="cursor-default">
                {" "}
                {item.first_name} {item.last_name}
              </td>
              <td>
                {" "}
                <Status status={item.enabled === 1 ? "Enabled" : "Disabled"} />
              </td>
              <td className="cursor-default"> {item.user_type}</td>
              <td className="cursor-default"> {item.owner}</td>
            </tr>
          ))}
        </Dtable>
      )}
    </div>
  );
};

export default Users;
