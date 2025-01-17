import React, { useCallback, useEffect, useRef, useState } from "react";
import ButtonUI from "../../ui/ButtonUI";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getSuppliersList } from "../../../store/services/SupplierService";
import {
  createPurchaseReceipt,
  getUnreceivedPurchaseOrder,
} from "../../../store/services/PurchaseReceiptService";
import { PurchaseOrderItems } from "../../../interface/output/PurchaseOrder/PurchaseOrderList";
import { UnreceivedPurchaseOrders } from "../../../interface/output/PurchaseReceipt/PurchaseReceiptList";
import Spinner from "../../ui/SpinnerUI";
import ModalUI from "../../ui/ModalUI";
import NoDataUI from "../../ui/NoDataUI";
import { useNavigate } from "react-router-dom";
import Input from "../../shared/Input";
import SelectInput from "../../shared/SelectInput";

const Create = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const { suppliersList } = useAppSelector((state) => state.suppliers);
  const { unreceivedPurchaseOrders, isLoading } = useAppSelector(
    (state) => state.purchaseReceipt
  );
  const [selectedSupplier, setSelectedSupplier] = useState<
    { value: string; label: React.ReactNode } | null | undefined
  >(null);
  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState<
    { value: string; label: React.ReactNode } | null | undefined
  >();
  const [items, setItems] = useState<PurchaseOrderItems[]>([]);
  const [suppliersPO, setSupplierPO] = useState<UnreceivedPurchaseOrders[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (formRef.current) {
        const formData = new FormData(formRef.current);
        const supplier = formData.get("supplier") as string;
        const posting_date = formData.get("posting_date") as string;
        const posting_time = formData.get("posting_time") as string;

        const purchaseReceiptPayload = {
          supplier,
          posting_date,
          posting_time,
          items,
        };

        try {
          const response = await dispatch(
            createPurchaseReceipt(purchaseReceiptPayload)
          ).unwrap();
          toast.success("Successfully created Purchase Receipt");
          navigate(response.name);
        } catch (error) {
          toast.error("Failed to create Purchase Receipt");
        }
      }
    },
    [items, dispatch, navigate]
  );

  const handleSupplierChange = useCallback(
    (selectedOption: { value: string; label: React.ReactNode }) => {
      const selectedSupplier = selectedOption;
      setSelectedSupplier(selectedSupplier);
      setSelectedPurchaseOrder(null);
      const filteredPurchaseOrder = unreceivedPurchaseOrders.filter(
        (order) => order.supplier === selectedSupplier.value
      );
      setSupplierPO(filteredPurchaseOrder);
    },
    [unreceivedPurchaseOrders]
  );

  const handlePurchaseOrderChange = useCallback(
    (selectedOption: { value: string; label: React.ReactNode }) => {
      const purchaseOrderName = selectedOption;
      setSelectedPurchaseOrder(purchaseOrderName);
      const itemsOfSelectedPO =
        suppliersPO.find((po) => po.name === purchaseOrderName.value)?.items ||
        [];
      setItems(itemsOfSelectedPO);
    },
    [suppliersPO]
  );

  const fetchDetails = useCallback(async () => {
    dispatch(getSuppliersList());
    dispatch(getUnreceivedPurchaseOrder());
  }, [dispatch]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);
  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  return (
    <>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="mb-8">
          <h2 className="text-md lg:text-lg font-semibold mb-4">
            A. Purchase Receipt details
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:w-1/2 lg:pl-6">
            <SelectInput
              label="Supplier"
              name="supplier"
              onSelectChange={handleSupplierChange}
              defaultValue={selectedSupplier}
              doctypeList={suppliersList.map((supplier: any) => ({
                id: supplier.name,
                group: supplier.supplier_group,
                item_name: supplier.supplier_name,
              }))}
            />
            <SelectInput
              label="Purchase order number"
              name="purchase-order"
              isDisabled={!selectedSupplier}
              defaultValue={selectedPurchaseOrder}
              onSelectChange={handlePurchaseOrderChange}
              doctypeList={suppliersPO.map((supplier) => ({
                id: supplier.name,
              }))}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input type="date" name="posting_date" label="Posting date" />
              <Input type="time" name="posting_time" label="Posting time" />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-md lg:text-lg font-semibold mb-4">
            B. Item details
          </h2>
          {selectedPurchaseOrder === null || selectedSupplier === null ? (
            <div className="lg:pl-6">
              <NoDataUI
                text=" Select a purchase order number"
                subText=" Select a purchase order number to populate the items
                      table."
                simpleLayout
              ></NoDataUI>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto max-w-[345px] md:max-w-full lg:pl-6">
                <table className="min-w-max md:min-w-full divide-y divide-gray-200 border rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p>
                            {item.item_code}: {item.item_name}
                          </p>
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
        <div className="mt-8 flex justify-end space-x-2 lg:space-x-4">
          <ButtonUI
            variant="outline"
            type="button"
            buttonName="Cancel"
            size="medium"
            onClick={() => setIsModalOpen(true)}
          />
          <ButtonUI
            variant="dark"
            type="submit"
            buttonName="Save as draft"
            size="medium"
            disabled // the button will be enabled when the form was completed
          />
          <ButtonUI
            variant="dark"
            type="submit"
            buttonName="Save and submit"
            size="medium"
            disabled // the button will be enabled when the form was completed
          />
        </div>
      </form>

      {/* a modal will show if the form was not completed but they opt to cancel it */}
      {isModalOpen && (
        <ModalUI
          id="cancelModal"
          variant="info"
          title="Are you sure you want to leave this page?"
          subText="The unfinished form will not be saved."
          leftButtonText="No, wait"
          rightButtonText="Exit page"
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Create;
