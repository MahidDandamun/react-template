import { useMemo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  getDeliveryTripCount,
  paginateDeliveryTripList,
} from "../../../store/services/DeliveryTripService";
import Status from "../../shared/Status";
import NoDataUI from "../../ui/NoDataUI";

const DeliveryTrip = () => {
  const dispatch = useAppDispatch();
  const { deliveryTripList, isLoading, deliveryTripCount } = useAppSelector(
    (state) => state.deliveryTrip
  );
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("name desc");
  const [perPage, setPerPage] = useState<number>(10);

  useEffect(() => {
    dispatch(
      paginateDeliveryTripList({ page: page * perPage, search, sort, perPage })
    ).unwrap();
  }, [dispatch, search, page, sort, perPage]);

  useEffect(() => {
    dispatch(getDeliveryTripCount());
  }, [dispatch]);

  const toggleSort = (field: string) => {
    setSort((prevSort) =>
      prevSort === `${field} desc` ? `${field} asc` : `${field} desc`
    );
    setPage(0);
  };

  const getNumberOfPages = useMemo(() => {
    return Math.ceil(deliveryTripCount / perPage);
  }, [deliveryTripCount, perPage]);

  const pageRange = useMemo(() => {
    const range: number[] = [];
    const start = Math.max(0, Math.min(page - 2, getNumberOfPages - 5));
    const end = Math.min(start + 5, getNumberOfPages);

    for (let i = start; i < end; i++) {
      range.push(i);
    }

    return range;
  }, [page, getNumberOfPages]);

  const handlePageClick = (pageNum: number) => {
    if (pageNum >= 0 && pageNum < getNumberOfPages) {
      setPage(pageNum);
    }
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value));
    setPage(0);
  };

  if (deliveryTripList.length === 0)
    return (
      <div>
        <NoDataUI
          text="Create your first delivery trip"
          subText="Create a delivery trip by clicking the create button."
        ></NoDataUI>
      </div>
    );

  return (
    <div className="border rounded-lg">
      <div className="flex my-4 mx-6 justify-between align-items">
        <input
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          className="rounded-lg px-[0.75rem] border-[#D1D5DB] leading-6 py-2 bg-[#F9FAFB] text-sm focus:bg-white min-w-[12rem] lg:min-w-[16rem]"
          placeholder="Search..."
        />

        <select
          value={perPage}
          onChange={handlePerPageChange}
          className="rounded-lg px-[0.75rem] border-[#D1D5DB] leading-6 py-2 bg-[#F9FAFB] text-sm focus:bg-white"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>

      <div className="overflow-x-auto max-w-[345px] md:max-w-full">
        <table className="min-w-max md:min-w-full divide-y divide-gray-200 border rounded-lg">
          <thead className="bg-gray-50 text-sm font-semibold text-gray-500">
            <tr>
              <th className="px-6 py-3 text-left tracking-wider">
                <button onClick={() => toggleSort("creation")}>
                  <span className="flex items-center">
                    TRANSACTION DATE
                    <svg
                      className="w-4 h-4 ms-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m8 15 4 4 4-4m0-6-4-4-4 4"
                      />
                    </svg>
                  </span>
                </button>
              </th>
              <th className="px-6 py-3 text-left tracking-wider">
                <button onClick={() => toggleSort("name")}>
                  <span className="flex items-center">
                    ID
                    <svg
                      className="w-4 h-4 ms-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m8 15 4 4 4-4m0-6-4-4-4 4"
                      />
                    </svg>
                  </span>
                </button>
              </th>
              <th className="px-6 py-3 text-left tracking-wider">
                <button onClick={() => toggleSort("driver_name")}>
                  <span className="flex items-center">
                    DRIVER NAME
                    <svg
                      className="w-4 h-4 ms-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m8 15 4 4 4-4m0-6-4-4-4 4"
                      />
                    </svg>
                  </span>
                </button>
              </th>
              <th className="px-6 py-3 text-left tracking-wider">
                <button onClick={() => toggleSort("status")}>
                  <span className="flex items-center">
                    STATUS
                    <svg
                      className="w-4 h-4 ms-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m8 15 4 4 4-4m0-6-4-4-4 4"
                      />
                    </svg>
                  </span>
                </button>
              </th>
              <th className="px-6 py-3 text-left tracking-wider">
                <button onClick={() => toggleSort("owner")}>
                  <span className="flex items-center">
                    CREATED BY
                    <svg
                      className="w-4 h-4 ms-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m8 15 4 4 4-4m0-6-4-4-4 4"
                      />
                    </svg>
                  </span>
                </button>
              </th>
              <th className="px-6 py-3 text-left tracking-wider">
                <button onClick={() => toggleSort("departure_time")}>
                  <span className="flex items-center">
                    DEPARTURE TIME
                    <svg
                      className="w-4 h-4 ms-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m8 15 4 4 4-4m0-6-4-4-4 4"
                      />
                    </svg>
                  </span>
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-sm">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-6 py-3 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : deliveryTripList && deliveryTripList.length > 0 ? (
              deliveryTripList.map((item, index) => (
                <tr key={index} className="text-black hover:bg-gray-100">
                  <td className="px-6 py-3 whitespace-nowrap">
                    {item.creation.split(" ")[0]}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <a
                      href={`/delivery-trip/${item.name}`}
                      className="underline underline-offset-1"
                    >
                      {item.name}
                    </a>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {item.driver_name}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <Status status={item.status} />
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">{item.owner}</td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {item.departure_time}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-3 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="py-4 flex justify-center items-center px-5 w-full">
        <div className="flex">
          <button
            onClick={() => handlePageClick(page - 1)}
            disabled={page === 0}
            className={`px-[0.75rem] h-[2rem] text-[0.875rem] text-[#6B7280] font-medium border border-r-0 border-[#D1D5DB] rounded-l-lg ${
              page === 0 ? "bg-zinc-100 cursor-not-allowed" : "bg-zinc-100"
            }`}
          >
            {"<"}
          </button>
          {pageRange.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageClick(pageNum)}
              className={`px-[0.75rem] h-[2rem] text-[0.875rem] text-[#6B7280] font-medium border last:border-l-0 border-[#D1D5DB] ${
                page === pageNum ? "bg-zinc-100" : "bg-white"
              }`}
            >
              {pageNum + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageClick(page + 1)}
            disabled={page >= getNumberOfPages - 1}
            className={`px-[0.75rem] h-[2rem] text-[0.875rem] text-[#6B7280] font-medium border border-l-0 border-[#D1D5DB] rounded-r-lg ${
              page >= getNumberOfPages - 1
                ? "bg-zinc-100 cursor-not-allowed"
                : "bg-white"
            }`}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTrip;
