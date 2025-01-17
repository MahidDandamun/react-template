import React from "react";
// import Table from "../components/ui/Table";
import ButtonUI from "../components/ui/ButtonUI";
import StatusUI from "../components/ui/StatusUI";
// import SpinnerUI from "../components/ui/SpinnerUI";
import BreadcrumbsUI from "../components/ui/BreadcrumbsUI";
import HeaderUI from "../components/ui/HeaderUI";
// import ToastUI from "../components/ui/ToastUI";
import InputUI from "../components/ui/InputUI";
import SelectUI from "../components/ui/SelectUI";
import InputPickerUI from "../components/ui/InputPickerUI";
import DataTableUI from "../components/ui/DataTableUI";
import NoDataUI from "../components/ui/NoDataUI";
// import ModalUI from "../components/ui/ModalUI";
// import ActivityLogUI from "../components/ui/ActivityLogUI";

const UITest = () => {
  const data = [
    {
      THeaders: [
        "Transaction Date",
        "Purchase Number",
        "Supplier Name",
        "Status",
        "Created By",
        "Grand Total",
      ],
      TData: [
        {
          column1: "2024-07-19",
          column2: (
            <a href="/uitest" className="underline underline-offset-1">
              PUR-ORD-2024-00005
            </a>
          ),
          column3: "XURPAS",
          column4: <StatusUI variant="draft"></StatusUI>,
          column5: "Maria De Jesus",
          column6: "PHP 450.00",
        },
        {
          column1: "2024-07-18",
          column2: (
            <a href="/uitest" className="underline underline-offset-1">
              PUR-ORD-2024-00005
            </a>
          ),
          column3: "UNILEVER",
          column4: <StatusUI variant="completed"></StatusUI>,
          column5: "Abby Gonzales",
          column6: "PHP 450.00",
        },
        {
          column1: "2024-07-17",
          column2: (
            <a href="/uitest" className="underline underline-offset-1">
              PUR-ORD-2024-00005
            </a>
          ),
          column3: "ABOITIZ",
          column4: <StatusUI variant="toReceiveAndBill"></StatusUI>,
          column5: "Cynthia Martinez",
          column6: "PHP 450.00",
        },
        {
          column1: "2024-07-16",
          column2: (
            <a href="/uitest" className="underline underline-offset-1">
              PUR-ORD-2024-00005
            </a>
          ),
          column3: "NESTLE",
          column4: <StatusUI variant="toBill"></StatusUI>,
          column5: "Llyode De Leon",
          column6: "PHP 450.00",
        },
        {
          column1: "2024-07-15",
          column2: (
            <a href="/uitest" className="underline underline-offset-1">
              PUR-ORD-2024-00005
            </a>
          ),
          column3: "NISSIN",
          column4: <StatusUI variant="toReceiveAndBill"></StatusUI>,
          column5: "Gregorio Sanchez",
          column6: "PHP 450.00",
        },
        {
          column1: "2024-07-15",
          column2: (
            <a href="/uitest" className="underline underline-offset-1">
              PUR-ORD-2024-00005
            </a>
          ),
          column3: "NISSIN",
          column4: <StatusUI variant="toReceiveAndBill"></StatusUI>,
          column5: "Gregorio Sanchez",
          column6: "PHP 450.00",
        },
        {
          column1: "2024-07-15",
          column2: (
            <a href="/uitest" className="underline underline-offset-1">
              PUR-ORD-2024-00005
            </a>
          ),
          column3: "NISSIN",
          column4: <StatusUI variant="toReceiveAndBill"></StatusUI>,
          column5: "Gregorio Sanchez",
          column6: "PHP 450.00",
        },
        {
          column1: "2024-07-15",
          column2: (
            <a href="/uitest" className="underline underline-offset-1">
              PUR-ORD-2024-00005
            </a>
          ),
          column3: "NISSIN",
          column4: <StatusUI variant="toReceiveAndBill"></StatusUI>,
          column5: "Gregorio Sanchez",
          column6: "PHP 450.00",
        },
        {
          column1: "2024-07-15",
          column2: (
            <a href="/uitest" className="underline underline-offset-1">
              PUR-ORD-2024-00005
            </a>
          ),
          column3: "NISSIN",
          column4: <StatusUI variant="toReceiveAndBill"></StatusUI>,
          column5: "Gregorio Sanchez",
          column6: "PHP 450.00",
        },
        {
          column1: "2024-07-15",
          column2: (
            <a href="/uitest" className="underline underline-offset-1">
              PUR-ORD-2024-00005
            </a>
          ),
          column3: "NISSIN",
          column4: <StatusUI variant="toReceiveAndBill"></StatusUI>,
          column5: "Gregorio Sanchez",
          column6: "PHP 450.00",
        },
        {
          column1: "2024-07-15",
          column2: (
            <a href="/uitest" className="underline underline-offset-1">
              PUR-ORD-2024-00005
            </a>
          ),
          column3: "NISSIN",
          column4: <StatusUI variant="toReceiveAndBill"></StatusUI>,
          column5: "Gregorio Sanchez",
          column6: "PHP 450.00",
        },
        {
          column1: "2024-07-15",
          column2: (
            <a href="/uitest" className="underline underline-offset-1">
              PUR-ORD-2024-00005
            </a>
          ),
          column3: "NISSIN",
          column4: <StatusUI variant="toReceiveAndBill"></StatusUI>,
          column5: "Gregorio Sanchez",
          column6: "PHP 450.00",
        },
      ],
    },
  ];

  return (
    <>
      <p className="mb-3">Buttons</p>
      <div className="flex gap-3 flex-wrap">
        <ButtonUI
          id="1"
          variant="outline"
          buttonName="Generate Report"
          iconName="report"
          size="medium"
        ></ButtonUI>
        <ButtonUI
          id="2"
          variant="dark"
          buttonName="Create a delivery note"
          iconName="add"
          size="medium"
        ></ButtonUI>
        <ButtonUI
          id="3"
          variant="primary"
          buttonName="Add Item"
          iconName="add"
          size="medium"
        ></ButtonUI>
        <ButtonUI
          id="4"
          variant="danger"
          buttonName="Delete"
          iconName="delete"
          size="medium"
        ></ButtonUI>
        <ButtonUI
          id="5"
          variant="danger"
          buttonName="Delete"
          iconName="delete"
          size="small"
        ></ButtonUI>
        <ButtonUI
          id="6"
          variant="warning"
          buttonName="Edit"
          iconName="edit"
          size="medium"
        ></ButtonUI>
        <ButtonUI
          id="7"
          variant="danger"
          buttonName="Cancel"
          iconName="cancel"
          size="medium"
        ></ButtonUI>
        <ButtonUI
          id="8"
          variant="danger"
          buttonName="Cancel"
          iconName="cancel"
          disabled={true}
          size="medium"
        ></ButtonUI>
        <ButtonUI
          id="9"
          variant="outline"
          buttonName="View Logs"
          iconName="logs"
          size="medium"
        ></ButtonUI>
        <ButtonUI
          id="10"
          variant="secondary"
          buttonName="Cancel"
          size="medium"
        ></ButtonUI>
      </div>
      <p className="mt-3 mb-3">Status</p>
      <div className="flex gap-3 flex-wrap">
        <StatusUI variant="draft" />
        <StatusUI variant="submitted" />
        <StatusUI variant="enabled" />
        <StatusUI variant="disabled" />
        <StatusUI variant="toReceiveAndBill" />
        <StatusUI variant="toDeliverAndBill" />
        <StatusUI variant="toBill" />
        <StatusUI variant="inProcess" />
        <StatusUI variant="completed" />
        <StatusUI variant="cancelled" />
        <StatusUI variant="returned" />
      </div>
      <p className="mt-3 mb-3">Spinner</p>
      <div className="flex flex-col gap-3">
        *Uncomment the component to see how it will look
      </div>
      {/* <SpinnerUI id="spinner"></SpinnerUI> */}
      <p className="mt-3 mb-3">Breadcrumbs</p>
      <div className="flex gap-3">
        <BreadcrumbsUI></BreadcrumbsUI>
      </div>
      <p className="mt-3 mb-3">Header</p>
      <div className="flex flex-col gap-3">
        <HeaderUI variant="viewCreate" title="Dashboard"></HeaderUI>
        <HeaderUI variant="default" title="Create Purchase Order"></HeaderUI>
        <HeaderUI
          variant="edit"
          title="PUR-ORD-2024-00008"
          status="draft"
        ></HeaderUI>
        <HeaderUI
          variant="cancel"
          title="PUR-ORD-2024-00008"
          status="toReceiveAndBill"
        ></HeaderUI>
      </div>
      <p className="mt-3 mb-3">Toast</p>
      <div className="flex flex-col gap-3">
        *Uncomment the component to see how it will look
      </div>
      {/* <ToastUI variant="success" message="Saved successfully"></ToastUI> */}
      <p className="mt-3 mb-3">Input boxes</p>
      <div className="flex flex-row gap-3 item-center flex-wrap">
        <InputUI
          id="sample"
          type="text"
          label="Full name"
          placeholder="Juan Dela Cruz"
          required
        ></InputUI>
        <InputUI
          id="sample2"
          type="number"
          label="Amount"
          placeholder="0.00"
          prepend="currency"
          required
        ></InputUI>
        <InputUI
          id="sample3"
          type="number"
          label="Amount"
          placeholder="0.00"
          prepend="currency"
          disabled={true}
          required
        ></InputUI>
        <InputUI
          id="sample4"
          type="number"
          label="Amount"
          placeholder="0.00"
          prepend="currency"
          error="Error amount. Please try again."
          required
        ></InputUI>
        <div className="mt-6">
          <InputUI
            id="sample5"
            type="text"
            placeholder="Search anything..."
            prepend="search"
            required
          ></InputUI>
        </div>
        <InputUI
          id="sample6"
          type="password"
          label="Password"
          placeholder="********"
          append="password"
          required
        ></InputUI>
      </div>
      <p className="mt-3 mb-3">Select</p>
      <div className="flex flex-col gap-3 max-w-xs flex-wrap">
        <SelectUI label="Select a customer"></SelectUI>
      </div>
      <p className="mt-3 mb-3">Time picker</p>
      <div className="flex flex-row gap-3 item-center flex-wrap">
        <InputPickerUI
          id="sample"
          type="time"
          label="Select time"
          required
        ></InputPickerUI>
        <InputPickerUI
          id="sample2"
          type="time"
          label="Select time"
          required
          disabled={true}
        ></InputPickerUI>
        <InputPickerUI
          id="time"
          type="time"
          label="Select time"
          required
          error="Please select a time."
        ></InputPickerUI>
      </div>
      <p className="mt-3 mb-3">Date picker</p>
      <div className="flex flex-row gap-3 item-center flex-wrap">
        <InputPickerUI
          id="sample"
          type="date"
          label="Select a date"
          required
        ></InputPickerUI>
        <InputPickerUI
          id="sample"
          type="date"
          label="Select a date"
          required
          disabled={true}
        ></InputPickerUI>
        <InputPickerUI
          id="sample"
          type="date"
          label="Select a date"
          required
          error="Please select a date."
        ></InputPickerUI>
      </div>
      <p className="mt-3 mb-3">Data Table</p>
      <div className="grid">
        <div className="col-span-1 overflow-x-auto">
          <DataTableUI data={data}></DataTableUI>
        </div>
      </div>

      <p className="mt-3 mb-3">No Data</p>
      <NoDataUI
        text="Create your first item"
        subText="This is where you can create your first item"
        buttonName="Create an item"
      ></NoDataUI>
      <p className="mt-3 mb-3">Modals</p>
      <div className="flex flex-col gap-3">
        *Uncomment the component to see how it will look
      </div>
      {/* <ModalUI
        id="modal"
        variant="form"
        title="Add a new customer"
        subText="Add a new customer for your sales order."
        leftButtonText="Cancel"
        rightButtonText="Add customer"
        alertModal={false}
        formName="addCustomer"
      ></ModalUI> */}
      <p className="mt-3 mb-3">Activity logs</p>
      <div className="flex flex-col gap-3">
        *Uncomment the component to see how it will look
      </div>
      {/* <ActivityLogUI id="activityLogs"></ActivityLogUI> */}
    </>
  );
};

export default UITest;
