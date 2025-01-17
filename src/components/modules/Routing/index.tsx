import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import Status from '../../shared/Status';
import DTable from '../../shared/Dtable';
import debounce from 'lodash/debounce';
import NoData from '../../shared/NoData';

import { getRoutingList } from '../../../store/services/RoutingService';

const Routing = () => {
  const dispatch = useAppDispatch();
  const { routingList, isLoading } = useAppSelector(
    (state) => state.routing
  );

  const fetchRoutingList = useCallback(async () => {
    dispatch(getRoutingList());
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
      fetchRoutingList();
    }, [fetchRoutingList]);

    useEffect(() => {
      debouncedRerender();
    }, [routingList, debouncedRerender]);

  if (routingList.length === 0)
    return (
      <div>
        <NoData
          text="Create your first Routing"
          subText="Create a Routing by clicking the create button"
        />
      </div>
    );

  return (
    <div className="p-2 ">
      { (!isLoading&&
        <DTable
          tableId="routing"
          headers={['NAME', 'STATUS', 'OWNER']}
          key={renderKey}
        >
          {routingList.map((item, index) => (
            <tr key={index} className="text-black hover:bg-gray-100">
              <td className="cursor-default">
                <a href={`/routing/${item.name}`} className="underline underline-offset-1">{item.name}</a>
              </td>
              <td className="cursor-default ">
                <Status status={item.disabled === 1 ?'disabled':'enabled'} />
              </td>
              <td className="cursor-default"> {item.owner}</td>
            </tr>
          ))
          }
        </DTable>
      )}
    </div>
  );
};

export default Routing;
