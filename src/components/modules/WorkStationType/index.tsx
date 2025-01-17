import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {getWorkstationTypeList} from '../../../store/services/WorkstationTypeService'
// import Status from '../../shared/Status';
import DTable from '../../shared/Dtable';
import debounce from 'lodash/debounce';
import NoData from '../../shared/NoData';

const WorkStationType = () => {
  const dispatch = useAppDispatch();
  const { workstationTypeList, isLoading } = useAppSelector(
    (state) => state.workStationType
  );

  const fetchWorkStationTypeList = useCallback(async () => {
    dispatch(getWorkstationTypeList());
  }, [dispatch]);

  useEffect(() => {
    fetchWorkStationTypeList();
  }, [fetchWorkStationTypeList]);

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
  }, [workstationTypeList, debouncedRerender]);

  if (workstationTypeList.length === 0)
    return (
      <div>
        <NoData
          text="Create your first Workstation"
          subText="Create a Workstation Type by clicking the create button"
        />
      </div>
    );

  return (
    <div className="p-2 ">
      {!isLoading && (
        <DTable
          tableId="workstation"
          headers={['WORKSTATION TYPE', 'OWNER', 'DESCRIPTION']}
          key={renderKey}
        >
          {workstationTypeList.map((item, index) => (
            <tr key={index} className="text-black hover:bg-gray-100">
              <td className="cursor-default " > <a href={`/workstation-type/${item.name}`} className="underline underline-offset-1">{item.name}</a></td>
              <td className="cursor-default"> {item.owner}</td>
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

export default WorkStationType;
