import React, { useCallback, useEffect, useRef, useState } from 'react';
import ButtonUI from '../../ui/ButtonUI';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getSuppliersList } from '../../../store/services/SupplierService';
import { createWorkReceipt, getUnreceivedWorkOrder } from '../../../store/services/WorkReceiptService';
import { WorkOrderItems } from '../../../interface/output/WorkOrder/WorkOrderList';
import { UnreceivedWorkOrders } from '../../../interface/output/WorkReceipt/WorkReceiptList';
import Spinner from '../../ui/SpinnerUI';
import { useNavigate } from 'react-router-dom';
import Input from '../../shared/Input';
import SelectInput from '../../shared/SelectInput';

const Create = () => {
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement>(null);
    const dispatch = useAppDispatch();
    const { suppliersList } = useAppSelector((state) => state.suppliers);
    const { unreceivedWorkOrders, isLoading } = useAppSelector((state) => state.workReceipt);
    const [selectedSupplier, setSelectedSupplier] = useState<{ value: string; label: React.ReactNode }|null|undefined>(null);
    const [selectedWorkOrder, setSelectedWorkOrder] = useState<{ value: string; label: React.ReactNode }|null|undefined>();
    const [items, setItems] = useState<WorkOrderItems[]>([]);
    const [suppliersPO, setSupplierPO] = useState<UnreceivedWorkOrders[]>([])

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (formRef.current) {
                const formData = new FormData(formRef.current);
                const supplier = formData.get("supplier") as string;
                const posting_date = formData.get("posting_date") as string;
                const posting_time = formData.get("posting_time") as string;

                const workReceiptPayload = {
                    supplier,
                    posting_date,
                    posting_time,
                    items,
                };

                try {
                    const response = await dispatch(createWorkReceipt(workReceiptPayload)).unwrap();
                    toast.success('Successfully created Work Receipt');
                    navigate(response.name)
                } catch (error) {
                    toast.error('Failed to create Work Receipt');
                }
            }
        },
        [items, dispatch, navigate]
    );

    const handleSupplierChange = useCallback((selectedOption: { value: string; label: React.ReactNode }) => {
        const selectedSupplier = selectedOption;
        setSelectedSupplier(selectedSupplier);
        setSelectedWorkOrder(null);
        const filteredWorkOrder = unreceivedWorkOrders.filter(order => order.supplier === selectedSupplier.value);
        setSupplierPO(filteredWorkOrder)
    }, [unreceivedWorkOrders])
    
    const handleWorkOrderChange = useCallback((selectedOption: { value: string; label: React.ReactNode }) => {
        const workOrderName = selectedOption
        setSelectedWorkOrder(workOrderName)
        const itemsOfSelectedPO = suppliersPO.find(po => po.name === workOrderName.value)?.items || [];
        setItems(itemsOfSelectedPO)
    }, [suppliersPO])

    const fetchDetails = useCallback(async () => {
        dispatch(getSuppliersList());
        dispatch(getUnreceivedWorkOrder());
    }, [dispatch])

    useEffect(() => {
        fetchDetails();
    }, [fetchDetails]);
    if (isLoading) return <div><Spinner /></div>;
    return (
        <div>
            <h1 className="text-3xl font-semibold mb-6">Create Work Receipt</h1>
            <form onSubmit={handleSubmit} ref={formRef}>
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">A. Work Receipt details</h2>
                    <div className="grid grid-cols-1 gap-4 w-1/2 pl-6">
                        <div>
                            <SelectInput label="Supplier" name="supplier" onSelectChange={handleSupplierChange} defaultValue={selectedSupplier} doctypeList={suppliersList.map((supplier: any) => ({
                                id: supplier.name,
                                group: supplier.supplier_group,
                                item_name: supplier.supplier_name,
                            }))} />
                        </div>
                        <div>
                            <SelectInput label="Work order number" name="work-order" isDisabled={!selectedSupplier} defaultValue={selectedWorkOrder} onSelectChange={handleWorkOrderChange} doctypeList={suppliersPO.map((supplier) => ({
                                id: supplier.name,
                            }))} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Input type="date" name="posting_date" label="Posting date" />
                            </div>
                            <div>
                                <Input type="time" name="posting_time" label="Posting time" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">B. Item details</h2>
                    {
                        (selectedWorkOrder === null||selectedSupplier === null) ? (
                            <>
                                <div className="grid grid-cols-1 gap-4 pl-10 bg-gray-100 rounded-lg h-80">
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <div className="text-center">
                                            <p className="text-xl font-semibold text-gray-500">Select a work order number</p>
                                        </div>
                                        <div className="text-center">
                                            <p>Select a work order number to populate the items table.</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Code</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {items.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <p>{item.item_code}: {item.item_name}</p>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <p>{item.qty}</p>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <p>PHP {item.rate.toFixed(2)}</p>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <p>PHP {item.amount.toFixed(2)}</p>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}

                </div>
                <hr className="my-4" />
                <div className="mt-8 flex justify-end space-x-4">
                    <ButtonUI buttonName="Create" size="medium" variant="dark" type="submit" />
                </div>
            </form>
        </div>
    );
};

export default Create;
