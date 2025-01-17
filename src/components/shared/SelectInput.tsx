// import React from "react";
// import Select, { StylesConfig } from "react-select";


// interface DoctypeList {
//   id: string;
//   group: string;
//   item_name: string;
// }

// interface SelectInputProps {
//   name: string;
//   defaultValue?: { value: string; label: React.ReactNode };
//   label?: string;
//   doctypeList: DoctypeList[];
//   onSelectChange?: (selectedOption: any) => void;
//   // onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
//   isDisabled?: boolean;
// }

// const SelectInput: React.FC<SelectInputProps> = ({ label, doctypeList, onSelectChange, defaultValue, name, isDisabled = false }) => {

//   // const handleChange = (selectedOption: any) => {
//   //   if (onSelectChange) {
//   //     onSelectChange(selectedOption);
//   //   }
//   // };

//   const handleChange = () => {
//     // if (onChange) {
//     //   return onChange
//     // }
//     return onSelectChange
//   }

//   const options = doctypeList.map(item => ({
//     value: item.id,
//     label: (
//       <p className="flex flex-col">
//         <span className="font-bold">{item.id}</span>
//         <span>{item.item_name}, {item.group}</span>
//       </p>
//     ),
//   }));

//   // Add a doctype
//   // options.push({
//   //   value: "add-new",
//   //   label: (
//   //     <button className="flex items-center text-blue-700">
//   //       <svg
//   //         xmlns="http://www.w3.org/2000/svg"
//   //         height="24px"
//   //         viewBox="0 -960 960 960"
//   //         width="24px"
//   //         fill="#1c64f2"
//   //       >
//   //         <path d="M450-450H220v-60h230v-230h60v230h230v60H510v230h-60v-230Z" />
//   //       </svg>
//   //       Add a new supplier
//   //     </button>
//   //   ),
//   // });

//   const customStyles: StylesConfig = {
//     control: (base, state) => ({
//       ...base,
//       outline: "none",
//       padding: "0.25rem",
//       borderWidth: "2px",
//       borderRadius: "0.5rem",
//       backgroundColor: isDisabled ? "#e1e3e8" : "",
//       border: state.isFocused ? "3px solid black" : "2px solid black",
//       boxShadow: "none",
//       "&:hover": {
//         border: state.isFocused ? "3px solid black" : "2px solid black",
//       },
//       minHeight: "52px",
//       height: "50px",
//     }),

//     option: (base, state) => ({
//       ...base,
//       backgroundColor: state.isSelected ? "#e5e7eb" : state.isFocused ? "#f3f3f3" : "white",
//       color: state.isSelected ? "#111827" : "#000000",
//     }),
//     menu: (base) => ({
//       ...base,
//       zIndex: 9999,
//     }),
//     menuPortal: (base) => ({
//       ...base,
//       zIndex: 9999,
//     }),
//     valueContainer: (base) => ({
//       ...base,
//       height: "42px",
//       padding: "0 8px",
//     }),
//     indicatorsContainer: (base) => ({
//       ...base,
//       height: "42px",
//     }),
//   };

//   return (
//     <div>
//       {label && (
//         <label
//           htmlFor="options"
//           className="block mb-2 text-base font-medium text-gray-900"
//         >
//           {label}
//         </label>
//       )}
//       <Select
//         key={defaultValue ? defaultValue.value : "default"}
//         defaultValue={defaultValue}
//         className="basic-single"
//         classNamePrefix="select"
//         name={name}
//         options={options}
//         styles={customStyles}
//         onChange={handleChange}
//         menuPortalTarget={document.body}
//         menuPosition="fixed"
//         required
//         isDisabled={isDisabled}
//       />
//     </div>
//   );
// };

// export default SelectInput;
import React from "react";
import Select, { StylesConfig } from "react-select";

interface DoctypeList {
  id: string;
  group?: string;
  item_name?: string;
}

interface SelectInputProps {
  name: string;
  defaultValue?: { value: string; label: React.ReactNode } | null;
  label?: string;
  doctypeList: DoctypeList[];
  onSelectChange?: (selectedOption: any) => void;
  isDisabled?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, doctypeList, onSelectChange, defaultValue, name, isDisabled = false }) => {

  // Handle the change event
  const handleChange = (selectedOption: any) => {
    if (onSelectChange) {
      onSelectChange(selectedOption);
    }
  };

  const options = doctypeList.map(item => ({
    value: item.id,
    label: (
      <>
        {!item.item_name || !item.group ? <p className="flex flex-col">
          <span className="font-md">{item.id}</span>
        </p>
          :
          <p className="flex flex-col">
            <span className="font-md">{item.id}</span>
            <span className="text-sm">{item.item_name}, {item.group}</span>
          </p>
        }

      </>

    ),
  }));

  // Add a doctype
  // options.push({
  //   value: "add-new",
  //   label: (
  //     <button className="flex items-center text-blue-700">
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         height="24px"
  //         viewBox="0 -960 960 960"
  //         width="24px"
  //         fill="#1c64f2"
  //       >
  //         <path d="M450-450H220v-60h230v-230h60v230h230v60H510v230h-60v-230Z" />
  //       </svg>
  //       Add a new supplier
  //     </button>
  //   ),
  // });

  const customStyles: StylesConfig = {
    control: (base, state) => ({
      ...base,
      outline: "none",
      padding: "0.25rem",
      borderWidth: "1px",
      borderRadius: "0.5rem",
      backgroundColor: isDisabled ? "#e1e3e8" : "",
      border: state.isFocused ? "2px solid black" : "1px solid gray",
      boxShadow: "none",
      "&:hover": {
        border: state.isFocused ? "2px solid black" : "1px solid gray",
      },
      // minHeight: "46px",
      height: "50px",
    }),

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "#e5e7eb" : state.isFocused ? "#f3f3f3" : "white",
      color: state.isSelected ? "#111827" : "#000000",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    valueContainer: (base) => ({
      ...base,
      height: "42px",
      padding: "0 8px",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      height: "42px",
    }),
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-base font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <Select
        key={defaultValue ? defaultValue.value : "default"}
        defaultValue={defaultValue}
        className="basic-single"
        classNamePrefix="select"
        name={name}
        options={options}
        styles={customStyles}
        onChange={handleChange}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        required
        isDisabled={isDisabled}
      />
    </div>
  );
};

export default SelectInput;
