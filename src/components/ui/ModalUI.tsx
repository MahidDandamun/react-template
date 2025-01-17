import React from "react";
import ButtonUI from "./ButtonUI";
import successIcon from "../../assets/icons/success.svg";
import infoIcon from "../../assets/icons/info.svg";
import errorIcon from "../../assets/icons/error.svg";
import InputUI from "./InputUI";
import SelectUI from "./SelectUI";

type VariantStatus = "success" | "danger" | "info" | "form";

type FormVariant = "addCustomer" | "addSupplier";

interface ModalProps {
  id: string;
  variant: VariantStatus;
  title: string;
  subText?: string;
  leftButtonText?: string;
  rightButtonText?: string;
  alertModal?: boolean;
  formName?: FormVariant;
  onBack?: () => void;
  onClose?: () => void;
}

const variantStyles: Record<VariantStatus, { bg: string; icon: string }> = {
  success: { bg: "bg-green-200", icon: successIcon },
  danger: { bg: "bg-red-200", icon: errorIcon },
  info: { bg: "bg-blue-200", icon: infoIcon },
  form: { bg: "", icon: "" },
};

const formVariantStyles: Record<FormVariant, JSX.Element> = {
  addSupplier: (
    <form>
      <div
        className="grid gap-4 grid-cols-2 px-10 max-h-[55vh] overflow-y-auto [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-thumb]:bg-zinc-400 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-zinc-200 [&::-webkit-scrollbar-track]:rounded-full"
      >
        <div className="col-span-2">
          <p className="text-md font-bold">A. Main details</p>
        </div>
        <div className="col-span-2">
          <InputUI
            id="sample"
            type="text"
            label="Supplier name"
            placeholder="XYZ Company"
            required
          ></InputUI>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <SelectUI label="Supplier group"></SelectUI>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <SelectUI label="Supplier type"></SelectUI>
        </div>
        <div className="col-span-2 mt-3">
          <p className="text-md font-bold">B. Contact details</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <InputUI
            id="sample"
            type="text"
            label="Email address"
            placeholder="xyzcompany@email.com"
            required
          ></InputUI>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <InputUI
            id="sample2"
            type="number"
            label="Mobile number"
            placeholder="000-0000-000"
            prepend="mobileNumber"
            required
          ></InputUI>
        </div>
        <div className="col-span-2">
          <p className="text-md font-bold mt-3">B. Address details</p>
        </div>
        <div className="col-span-2">
          <InputUI
            id="sample"
            type="text"
            label="Address line 1"
            placeholder="Bldg., Floor #, Unit #, Room #"
            required
          ></InputUI>
        </div>
        <div className="col-span-2">
          <InputUI
            id="sample"
            type="text"
            label="Address line 2"
            placeholder="Bldg., Floor #, Unit #, Room #"
            required
          ></InputUI>
        </div>
      </div>
      <div className="flex flex-row gap-3 justify-end mt-10 border-t pt-7 px-10">
        <ButtonUI
          id="close"
          variant="outline"
          buttonName="Cancel"
          size="medium"
        ></ButtonUI>
        <ButtonUI
          id="submit"
          variant="dark"
          buttonName="Add supplier"
          size="medium"
          disabled
        ></ButtonUI>
      </div>
    </form>
  ),
  addCustomer: (
    <form>
      <div
        className="grid gap-4 grid-cols-2 px-10 max-h-[55vh] overflow-y-auto [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-thumb]:bg-zinc-400 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-zinc-200 [&::-webkit-scrollbar-track]:rounded-full"
      >
        <div className="col-span-2">
          <p className="text-md font-bold">A. Main details</p>
        </div>
        <div className="col-span-2">
          <InputUI
            id="sample"
            type="text"
            label="Customer name"
            placeholder="XYZ Company"
            required
          ></InputUI>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <SelectUI label="Customer group"></SelectUI>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <SelectUI label="Customer type"></SelectUI>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <SelectUI label="Territory"></SelectUI>
        </div>
        <div className="col-span-2 mt-3">
          <p className="text-md font-bold">B. Contact details</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <InputUI
            id="sample"
            type="text"
            label="Email address"
            placeholder="xyzcompany@email.com"
            required
          ></InputUI>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <InputUI
            id="sample2"
            type="number"
            label="Mobile number"
            placeholder="000-0000-000"
            prepend="mobileNumber"
            required
          ></InputUI>
        </div>
        <div className="col-span-2">
          <p className="text-md font-bold mt-3">B. Address details</p>
        </div>
        <div className="col-span-2">
          <InputUI
            id="sample"
            type="text"
            label="Address line 1"
            placeholder="Bldg., Floor #, Unit #, Room #"
            required
          ></InputUI>
        </div>
        <div className="col-span-2">
          <InputUI
            id="sample"
            type="text"
            label="Address line 2"
            placeholder="Bldg., Floor #, Unit #, Room #"
            required
          ></InputUI>
        </div>
      </div>
      <div className="flex flex-row gap-3 justify-end mt-10 border-t pt-7 px-10">
        <ButtonUI
          id="close"
          variant="outline"
          buttonName="Cancel"
          size="medium"
        ></ButtonUI>
        <ButtonUI
          id="submit"
          variant="dark"
          buttonName="Add supplier"
          size="medium"
          disabled
        ></ButtonUI>
      </div>
    </form>
  ),
};

const ModalUI = ({
  id,
  variant,
  title,
  subText,
  leftButtonText,
  rightButtonText,
  alertModal = true,
  formName,
  onBack,
  onClose,
}: ModalProps) => {
  return (
    <div
      id={id}
      className="fixed left-0 top-0 z-50 items-center overflow-x-hidden overflow-y-hidden block w-full backdrop-blur-sm h-screen p-6 bg-gray-800/40"
    >
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
        {alertModal ? (
          <div className="flex flex-col gap-8 items-center justify-center relative bg-white rounded-lg shadow p-10 w-[22rem] lg:w-[28rem]">
            <div className="flex flex-col gap-3 text-center">
              <img
                className={`mx-auto rounded-full p-1 ${variantStyles[variant].bg}`}
                src={variantStyles[variant].icon}
                alt=""
                width="50"
                height="50"
              />
              <h3 className="text-xl lg:text-2xl font-bold text-black">
                {title}
              </h3>
              {subText && (
                <p className="font-normal text-gray-500">{subText}</p>
              )}
            </div>
            <div className="flex justify-center gap-3">
              <ButtonUI
                variant="outline"
                buttonName={leftButtonText}
                size="medium"
                onClick={onClose}
              ></ButtonUI>
              <ButtonUI
                variant="dark"
                buttonName={rightButtonText}
                size="medium"
                onClick={onBack}
              ></ButtonUI>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-8 relative bg-white rounded-lg shadow py-10 w-[22rem] lg:w-[40rem]">
            <div className="flex flex-col px-10">
              <h3 className="text-xl lg:text-2xl font-bold text-black">
                {title}
              </h3>
              <p className="font-normal text-gray-500">{subText}</p>
            </div>
            {formName && formVariantStyles[formName]}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalUI;
