import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import dashboardIcon from "../assets/icons/dashboard.svg";
import buyingIcon from "../assets/icons/buying.svg";
import sellingIcon from "../assets/icons/selling.svg";
import inventoryIcon from "../assets/icons/inventory.svg";
import usersIcon from "../assets/icons/users.svg";
import userManagementIcon from "../assets/icons/userManagement.svg";
import manufacturingIcon from "../assets/icons/manufacturingIcon.svg";
import arrowIcon from "../assets/icons/double-arrow.svg";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

interface SidebarProps {
  toggleSidebar: boolean;
  onClick: () => void;
}

const Sidebar = ({ toggleSidebar, onClick }: SidebarProps) => {
  const driverObj = driver({
    onNextClick:() => {
      console.log('Next Button Clicked');
      // Implement your own functionality here
      driverObj.moveNext();
    },
    onPrevClick:() => {
      console.log('Previous Button Clicked');
      // Implement your own functionality here
      driverObj.movePrevious();
    },
    onCloseClick:() => {
      console.log('Close Button Clicked');
      // Implement your own functionality here
      driverObj.destroy();
    },
    steps: [
      {
        element: '.items-center',
        popover: {
          title: 'Popover Title',
          description: 'Popover Description',
          side: "bottom",
          align: 'start'
        },
      },
      {
        element: '.items-center',
        popover: {
          title: 'Popover Title',
          description: 'Popover Description',
          side: "bottom",
          align: 'center'
        },
      },
    ]
  });
 
  // driverObj.drive(); Uncomment this for the actual implementation

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const sidebarDropdowns = [
    {
      label: "Buying",
      icon: buyingIcon,
      subItems: [
        { subLabel: "Purchase Order", link: "/purchase-order" },
        { subLabel: "Purchase Receipt", link: "/purchase-receipt" },
      ],
    },
    {
      label: "Selling",
      icon: sellingIcon,
      subItems: [
          { subLabel: "Sales Order", link: "/sales-order" },
          { subLabel: "Delivery Note", link: "/delivery-note" },
          { subLabel: "Delivery Trip", link: "/delivery-trip" }
      ]
    },
    {
      label: "Accounting",
      icon: sellingIcon,
      subItems: [
          { subLabel: "Sales Invoice", link: "/sales-invoice" },
      ]
    },
    {
      label: "Manufacturing",
      icon:manufacturingIcon ,
      subItems: [
        { subLabel: "Bill of Materials", link: "/bill-of-materials" },
        { subLabel: "Workstation Type", link: "/workstation-type" },
        { subLabel: "Workstation", link: "/workstation" },
        { subLabel: "Work Order", link: "/work-order" },
        { subLabel: "Operations", link: "/operation" },
        { subLabel: "Routing", link: "/routing" },
      ],
    },
    {
      label: "Inventory",
      icon: inventoryIcon,
      subItems: [
        { subLabel: "Items", link: "/items" },
        { subLabel: "Warehouse", link: "/warehouse" },
        { subLabel: "Stock Ledger", link: "/stock-ledger" },
        { subLabel: "Stock Summary", link: "/stock-summary" },
      ],
    },
    {
      label: "Entities",
      icon: usersIcon,
      subItems: [
        { subLabel: "Customers", link: "/customers" },
        { subLabel: "Suppliers", link: "/suppliers" },
        { subLabel: "Drivers", link: "/drivers" },
      ],
    },
  ];

  const mainLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 text-small font-small transition-colors p-3 w-full rounded-lg ${
      isActive
        ? "bg-black text-white [&>img]:brightness-200"
        : " hover:bg-gray-200 hover:text-gray-800 rounded-lg"
    }`;

  const subLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-md font-medium hover:bg-gray-200 before:content-['•'] before:invisible hover:text-gray-800 p-3 transition-colors flex gap-3 ${
      isActive ? "before:!visible text-black bg-gray-200 font-semibold" : ""
    }`;

  return (
    <nav
      className={`fixed cursor-default top-0 left-0 h-full w-80 lg:w-64 bg-white text-zinc-500 border-r border-gray-300 p-4 pt-5 lg:pt-28 flex flex-col hidden lg:block z-[41] lg:z-0 ${
        toggleSidebar && "!block"
      }`}
    >
      <div className="flex justify-end mb-4 block lg:hidden">
        <button
          className="border border-gray-300 rounded-lg p-2"
          onClick={onClick}
          aria-label="Toggle sidebar"
        >
          <img
            className="rotate-180"
            src={arrowIcon}
            alt=""
            width={24}
            height={24}
          />
        </button>
      </div>

      <ul className="flex flex-col gap-6 text-zinc-500">
        <div className="flex flex-col gap-3 text-zinc-500">
          <p>MENU</p>
          <NavLink to="/" className={mainLinkClass}>
            <img src={dashboardIcon} alt="" /> Dashboard
          </NavLink>

          {sidebarDropdowns.map((dropdown, index) => (
            <li
              key={index}
              className={`w-full ${
                openDropdown === dropdown.label && "border rounded-lg"
              }`}
            >
              <button
                className={`w-full text-left p-3 flex items-center focus:outline-none ${
                  openDropdown === dropdown.label
                    ? "border bg-black text-white  [&>img]:brightness-200 rounded-t-lg"
                    : "hover:bg-gray-200 hover:text-gray-800 rounded-lg"
                }`}
                onClick={() => toggleDropdown(dropdown.label)}
              >
                <img
                  src={dropdown.icon}
                  alt={`${dropdown.label} icon`}
                  className="inline-block mr-2"
                />
                {dropdown.label}
                <svg
                  className={`w-4 h-4 ml-auto transform transition-transform duration-200 ${
                    openDropdown === dropdown.label ? "rotate-180" : "rotate-0"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <ul
                className={`transition-all duration-300  ${
                  openDropdown === dropdown.label
                    ? ""
                    : "max-h-0 overflow-hidden"
                }`}
              >
                {dropdown.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <NavLink to={subItem.link} className={subLinkClass}>
                      {subItem.subLabel}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}

          <p>SUPPORT</p>
          <NavLink to="/users" className={mainLinkClass}>
            <img src={userManagementIcon} alt="" /> User Management
          </NavLink>
        </div>
      </ul>
    </nav>
  );
};

export default Sidebar;
