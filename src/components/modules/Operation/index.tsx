import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
 
import { getOperationList } from '../../../store/services/OperationService';
import DTable from '../../shared/Dtable';
import debounce from 'lodash/debounce';
import NoData from '../../shared/NoData';

const Operation = () => {
  const dispatch = useAppDispatch();
  const { operationList, isLoading } = useAppSelector(
    (state) => state.operation
  );

  const fetchWorkOperationList = useCallback(async () => {
    dispatch(getOperationList());
  }, [dispatch]);

  useEffect(() => {
    fetchWorkOperationList();
  }, [fetchWorkOperationList]);

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
  }, [operationList, debouncedRerender]);

  if (operationList.length === 0)
    return (
      <div>
        <NoData
          text="Create your first Operation"
          subText="Create a Operation by clicking the create button"
        />
      </div>
    );

  return (
    <div className="p-2 ">
      {!isLoading && (
        <DTable
          tableId="operation"
          headers={['NAME', 'DEFAULT WORKSTATION', 'DESCRIPTION', 'OWNER']}
          key={renderKey}
        >
          {operationList.map((item, index) => (
            <tr key={index} className="text-black hover:bg-gray-100">
              <td className="cursor-default " > <a href={`/operation/${item.name}`} className="underline underline-offset-1">
                {item.name}</a>
              </td>
              <td className="cursor-default ">{item.workstation}</td>
              <td className="cursor-default"> {item.description}</td>
              <td className="cursor-default">{item.owner}</td>
            </tr>
          ))
          }
        </DTable>
      )}
    </div>
  );
};

export default Operation;
