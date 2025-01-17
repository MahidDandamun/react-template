import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getDriversList } from '../../../store/services/DriversService';
import { debounce } from 'lodash';
import NoDataUI from '../../ui/NoDataUI';
import Dtable from '../../shared/Dtable';
import Status from '../../shared/Status';

const Drivers = () => {
  const dispatch = useAppDispatch();
  const {driverList, isLoading} = useAppSelector((state) => state.drivers);

  const fetchDriversList = useCallback(async () => {
    dispatch(getDriversList());
  }, [dispatch]);

  useEffect(() => {
    fetchDriversList();
  }, [fetchDriversList]);

  const [renderKey, setRenderKey] = useState(0);

  const debouncedRerender = useMemo(() =>
    debounce(() => {
      setRenderKey(prev => prev + 1);
    }), []);

  useEffect(() => {
    debouncedRerender();
  }, [driverList, debouncedRerender]);

  if (driverList.length === 0) return <div><NoDataUI
  text="Add your first driver"
  subText="Add a driver by clicking the add button"
></NoDataUI></div>;

  return (
    <>
     {
        !isLoading &&
        <Dtable tableId="sales-order" headers={["ID","DRIVER", "STATUS", "CREATED BY"]} key={renderKey}>
          {driverList.map((item, index) => (
            <tr key={index} className="text-black hover:bg-gray-100">
              <td className="cursor-default " > <a href={`/drivers/${item.name}`} className="underline underline-offset-1">{item.name}</a></td>
              <td className="cursor-default"> {item.full_name}</td>
              <td> <Status status={item.status} /></td>
              <td className="cursor-default"> {item.owner}</td>
            </tr>
          ))}
        </Dtable>
      }
    </>
    
)
};

export default Drivers;
