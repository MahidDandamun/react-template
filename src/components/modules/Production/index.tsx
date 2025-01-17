import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getBillOfMaterialsList } from '../../../store/services/BillOfMaterialsService';
import Status from '../../shared/Status';
import DTable from '../../shared/Dtable';
import debounce from 'lodash/debounce';
import NoData from '../../shared/NoData';

const BillOfMaterials = () => {
  const dispatch = useAppDispatch();
  const { billOfMaterialsList, isLoading } = useAppSelector(
    (state) => state.billOfMaterials
  );

  const fetchBillOfMaterialsList = useCallback(async () => {
    dispatch(getBillOfMaterialsList());
  }, [dispatch]);

  useEffect(() => {
    fetchBillOfMaterialsList();
  }, [fetchBillOfMaterialsList]);

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
  }, [billOfMaterialsList, debouncedRerender]);

  if (billOfMaterialsList.length === 0)
    return (
      <div>
        <NoData
          text="Create your first Bill of Materials"
          subText="Create a Bill of Materials by clicking the create button"
        />
      </div>
    );

  return (
    <div className="p-2 ">
      {!isLoading && (
        <DTable
          tableId="bill-of-materials"
          headers={['ID', 'ITEM', 'OWNER', 'STATUS','GRAND TOTAL']}
          key={renderKey}
        >
          {billOfMaterialsList.map((item, index) => (
            <tr key={index} className="text-black hover:bg-gray-100">
              <td className="cursor-default">
                <a href={`/bill-of-materials/${item.name}`} className="underline underline-offset-1">{item.name}</a>
              </td>
              <td className="cursor-default ">{item.item}</td>
              <td className="cursor-default"> {item.owner}</td>
              <td className="cursor-default">
                  <Status status={item.docstatus === 1 ?'Submitted':'Draft'} />
              </td> 
              <td className="cursor-default">PHP {String(item.total_cost.toFixed(2))}</td>
            </tr>
          )
           
          )
          }
        </DTable>
 
        
        
      )}
    </div>
  );
};

export default BillOfMaterials;
