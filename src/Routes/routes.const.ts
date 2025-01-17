// import { Route, Routes } from "react-router-dom";

/**
 * Default routes
 */
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import UITest from "../pages/UITest";

/**
 * Buying routes
 */
import PurchaseOrderPage from "../pages/PurchaseOrderPage";
import PurchaseOrderInfo from "../components/modules/PurchaseOrder/info";
import PurchaseReceiptPage from "../pages/PurchaseReceiptPage";
import PurchaseReceiptInfo from "../components/modules/PurchaseReceipt/info";

/**
 * Selling routes
 */
import SalesOrderPage from "../pages/SalesOrderPage";
import SalesOrderInfo from "../components/modules/SalesOrder/info";
import DeliveryNoteInfo from "../components/modules/DeliveryNote/info";
import DeliveryNotePage from "../pages/DeliveryNotePage";
import DeliveryTripPage from "../pages/DeliveryTripPage";
import InfoDeliveryTrip from "../components/modules/DeliveryTrip/info";

/**
 * Manufacturing routes
 */
import BillOfMaterialsPage from "../pages/BillOfMaterialsPage";
import BillOfMaterialsInfo from "../components/modules/BillOfMaterials/info";
import WorkStationTypePage from "../pages/WorkStationTypePage";
import WorkStationTypeInfo from "../components/modules/WorkStationType/info";
import WorkStationPage from "../pages/WorkStationPage";
import WorkStationInfo from "../components/modules/WorkStation/info";
import WorkOrderPage from "../pages/WorkOrderPage";
import WorkOrderInfo from "../components/modules/WorkOrder/info"; 
import ProductionPage from "../pages/ProductionPage";
import ProductionInfo from "../components/modules/Production/info"; 
import RoutingPage from "../pages/RoutingPage";
import RoutingInfo from "../components/modules/Routing/info";
import OperationPage from "../pages/OperationPage";
import OperationInfo from "../components/modules/Operation/info";




/**
 * Accounting routes
*/
import SalesInvoicePage from "../pages/SalesInvoicePage";
import SalesInvoiceInfo from "../components/modules/Accounting/SalesInvoice/info";

/**
 * Inventory routes
 */
import ItemsPage from "../pages/ItemsPage";
import ItemInfo from "../components/modules/Item/info";
import WarehousePage from "../pages/WarehousePage";
import InfoWarehouse from "../components/modules/Warehouse/info";
import StockLedgerPage from "../pages/StockLedgerPage";
import StockSummaryPage from "../pages/StockSummaryPage";

/**
 * Entities routes
 */
import CustomersPage from "../pages/CustomersPage";
import CustomerInfo from "../components/modules/Customers/info";
import SuppliersPage from "../pages/SuppliersPage";
import SuppliersInfo from "../components/modules/Suppliers/info";
import DriversPage from "../pages/DriversPage";
import InfoDriver from "../components/modules/Driver/info";

/**
 * Support routes
 */

import UsersPage from "../pages/UsersPage";
import UserInfo from "../components/modules/Users/user-info";
 
 
 
export const routes = [
  {
    args: {
      exact: true,
    },
    element: LoginPage,
    path: '/login',
    protected: false
  },
  {
    args: {
      exact: true,
    },
    element: HomePage,
    path: '/',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: UsersPage,
    path: '/users',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: UserInfo,
    path: '/users/:name',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: DriversPage,
    path: '/drivers',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: InfoDriver,
    path: '/drivers/:name',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: SalesOrderPage,
    path: '/sales-order',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: SalesOrderInfo,
    path: '/sales-order/:name',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: SalesInvoicePage,
    path: '/sales-invoice',
    protected: true
  },
  {
    args: {
      exact: true,
    }, 
    element: SalesInvoiceInfo,
    path: '/sales-invoice/:name',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: StockLedgerPage,
    path: '/stock-ledger',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: StockSummaryPage,
    path: '/stock-summary',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: CustomersPage,
    path: '/customers',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: CustomerInfo,
    path: '/customers/:name',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: BillOfMaterialsPage,
    path: '/bill-of-materials',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: BillOfMaterialsInfo,
    path: '/bill-of-materials/:name',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: WorkStationTypePage,
    path: '/workstation-type',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: WorkStationTypeInfo,
    path: '/workstation-type/:name',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: WorkStationPage,
    path: '/workstation',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: WorkStationInfo,
    path: '/workstation/:name',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: WorkOrderPage,
    path: '/work-order',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: WorkOrderInfo,
    path: '/work-order/:name',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: ProductionPage,
    path: '/production',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: ProductionInfo,
    path: '/production/:name',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: RoutingPage,
    path: '/routing',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: RoutingInfo,
    path: '/routing/:name',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: OperationPage,
    path: '/operation',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: OperationInfo,
    path: '/operation/:name',
    protected: true
  },
 
  {
    args: {
      exact: true,
    },
    element: DeliveryNotePage,
    path: '/delivery-note',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: DeliveryNoteInfo,
    path: '/delivery-note/:name',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: UITest,
    path: '/uitest',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: WarehousePage,
    path: '/warehouse',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: InfoWarehouse,
    path: '/warehouse/:name',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: ItemsPage,
    path: '/items',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: ItemInfo,
    path: '/items/:name',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: SuppliersPage,
    path: '/suppliers',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: SuppliersInfo,
    path: '/suppliers/:name',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: PurchaseOrderPage,
    path: '/purchase-order',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: PurchaseOrderInfo,
    path: '/purchase-order/:name',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: PurchaseReceiptPage,
    path: '/purchase-receipt',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: PurchaseReceiptInfo,
    path: '/purchase-receipt/:name',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: DeliveryTripPage,
    path: '/delivery-trip',
    protected: true
  },
  {
    args: {
      exact: true,
    },
    element: InfoDeliveryTrip,
    path: '/delivery-trip/:name',
    protected: true
  },
 
];


 