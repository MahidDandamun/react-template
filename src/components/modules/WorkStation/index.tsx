import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {getWorkstationList} from '../../../store/services/WorkstationService'
import DTable from '../../shared/Dtable';
import debounce from 'lodash/debounce';
import NoData from '../../shared/NoData';

const WorkStation = () => {
  const dispatch = useAppDispatch();
  const { workstationList, isLoading } = useAppSelector(
    (state) => state.workStations
  );

  const fetchWorkStationList = useCallback(async () => {
    dispatch(getWorkstationList());
  }, [dispatch]);

  useEffect(() => {
    fetchWorkStationList();
  }, [fetchWorkStationList]);

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
  }, [workstationList, debouncedRerender]);

  if (workstationList.length === 0)
    return (
      <div>
        <NoData
          text="Create your first Workstation"
          subText="Create a Workstation by clicking the create button"
        />
      </div>
    );

  return (
    <div className="p-2 ">
      {!isLoading && (
        <DTable
          tableId="workstation"
          headers={['NAME', 'TYPE', 'OWNER', 'DESCRIPTION']}
          key={renderKey}
        >
          {workstationList.map((item, index) => (
            <tr key={index} className="text-black hover:bg-gray-100">
              <td className="cursor-default " > <a href={`/workstation/${item.name}`} className="underline underline-offset-1">{item.name}</a></td>
              <td className="cursor-default ">{item.workstation_type}</td>
              <td className="cursor-default"> {item.owner}</td>
              {/* <td> <Status status={String(item.is_active?'active':'default')} /></td>  */}
              <td className="cursor-default">{item.description}</td>
            </tr>
          )
           
          )
          }
        </DTable>
 
        
        
      )}
    </div>
  );
};

export default WorkStation;
